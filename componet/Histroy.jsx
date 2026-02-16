

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { FaArrowDown, FaArrowUp, FaExchangeAlt } from "react-icons/fa";
import "./dash.css";

const History = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://bank-bankend-w4oo.onrender.com/me/history", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message);

      setTransactions((result.transactions || []).reverse());
    } catch (err) {
      toast.error(err.message || "Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();

   
    const interval = setInterval(fetchHistory, 2000);

    return () => clearInterval(interval); 
  }, []);

  const formatMoney = (num) =>
    `$${Number(num).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

  return (
    <div className="history-section">
      <h3 className="history-title">Transaction History</h3>

      {loading && <p className="loading">Loading...</p>}
      {!loading && transactions.length === 0 && <p className="no-history">No transactions yet</p>}

      <div className="transaction-list">
        {transactions.map((tx) => {
          let icon, label, sign, amountClass;

          if (tx.type === "deposit" || tx.type === "transfer-in") {
            icon = <FaArrowDown />;
            label = tx.type === "deposit" ? "Deposit" : "Received";
            sign = "+";
            amountClass = "credit";
          } else if (tx.type === "withdraw" || tx.type === "transfer-out") {
            icon = <FaArrowUp />;
            label = tx.type === "withdraw" ? "Withdraw" : "Sent";
            sign = "-";
            amountClass = "debit";
          } else {
            icon = <FaExchangeAlt />;
            label = "Transaction";
            sign = "-";
            amountClass = "debit";
          }

          return (
            <div key={tx._id} className="transaction-item">
              <div className="transaction-info">
                <span className="transaction-name">
                  {icon} {label}
                </span>
                <span className="transaction-date">{new Date(tx.createdAt).toLocaleString()}</span>
              </div>
              <span className={`transaction-amount ${amountClass}`}>
                {sign}
                {formatMoney(tx.amount)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default History;



import React, { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaPaperPlane, FaMoneyBillWave, FaHandHoldingUsd, FaHistory } from "react-icons/fa";

import Transfer from "./Transfer";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import History from "./Histroy";
import "./dash.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [showBalance, setShowBalance] = useState(true);
  const [showTransfer, setShowTransfer] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showHistory, setShowHistory] = useState(true);

 
  const fetchUserProfile = async () => {
    try {
      const res = await fetch("https://bank-bankend-w4oo.onrender.com/me/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      if (data.transactions) setHistory(data.transactions.reverse());
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
    }
  };


  useEffect(() => {
    fetchUserProfile();
  }, []);


  useEffect(() => {
    const interval = setInterval(fetchUserProfile, 5000); 
    return () => clearInterval(interval);
  }, []);


  const updateBalance = (newBalance, transaction = null) => {
    setUser(prev => {
      const updatedUser = { ...prev, balance: Number(newBalance) };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });

    if (transaction) setHistory(prev => [transaction, ...prev]);
  };

  if (!user) return <p>Loading user...</p>;

  return (
    <div className="dashboard">
      <h2 className="welcome">Welcome, {user.name}</h2>


   
      <div className="balance-card">
        <h1>
          {showBalance
            ? `$${Number(user.balance || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`
            : user.accountNumber}
        </h1>
        <span className="toggle-icon" onClick={() => setShowBalance(prev => !prev)}>
          {showBalance ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
        </span>
      </div>

  
      <div className="actions-grid">
        <div className="action-card" onClick={() => setShowTransfer(true)}>
          <FaPaperPlane /><h4>Send Money</h4><p>Transfer funds</p>
        </div>
        <div className="action-card" onClick={() => setShowDeposit(true)}>
          <FaMoneyBillWave /><h4>Deposit</h4><p>Add money</p>
        </div>
        <div className="action-card" onClick={() => setShowWithdraw(true)}>
          <FaHandHoldingUsd /><h4>Withdraw</h4><p>Take money out</p>
        </div>
        <div className="action-card" onClick={() => setShowHistory(prev => !prev)}>
          <FaHistory /><h4>History</h4><p>View transactions</p>
        </div>
      </div>

   
      {showHistory && <History transactions={history} />}

  
      {showTransfer && (
        <Transfer
          user={user}
          onClose={() => setShowTransfer(false)}
          onTransferSuccess={updateBalance}
        />
      )}
      {showDeposit && (
        <Deposit
          user={user}
          onClose={() => setShowDeposit(false)}
          onTransferSuccess={updateBalance}
        />
      )}
      {showWithdraw && (
        <Withdraw
          user={user}
          onClose={() => setShowWithdraw(false)}
          onTransferSuccess={updateBalance}
        />
      )}
    </div>
  );
};

export default Dashboard;

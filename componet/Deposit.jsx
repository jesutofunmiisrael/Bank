import React, { useState } from "react";
import { toast } from 'sonner';




const Deposit = ({ user, onClose, onTransferSuccess }) => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDeposit = async (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      return toast.error("Enter valid amount");
    }

    setLoading(true);

    try {
      const res = await fetch("https://bank-bankend-w4oo.onrender.com/me/deposit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ amount: Number(amount) }),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Deposit successful");
        onTransferSuccess(result.newBalance);
        onClose();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Deposit Money</h2>
        <form onSubmit={handleDeposit}>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button disabled={loading}>
            {loading ? "Processing..." : "Deposit"}
          </button>

          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};


export default Deposit
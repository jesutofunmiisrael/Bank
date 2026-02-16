
import React, { useState } from "react";
import { toast } from "sonner";
import "./transfer.css";

const Transfer = ({ user, onClose, onTransferSuccess }) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recipient || !amount) return toast.error("Please enter recipient and amount");
    if (Number(amount) <= 0) return toast.error("Amount must be greater than 0");
    if (Number(amount) > user.balance) return toast.error("Insufficient balance");

    setLoading(true);

    try {
      const res = await fetch("https://bank-bankend-w4oo.onrender.com/me/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ receiverAccountNumber: recipient, amount: Number(amount) }),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Transfer successful!");
        onTransferSuccess(result.newBalance);
        onClose();
      } else {
        toast.error(result.message || "Transfer failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Transfer Money</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Recipient Account Number" value={recipient} onChange={e => setRecipient(e.target.value)} />
          <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
          <button type="submit" disabled={loading}>{loading ? "Sending..." : "Send"}</button>
          <button type="button" onClick={onClose} className="cancel-btn" disabled={loading}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default Transfer;

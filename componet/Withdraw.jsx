import React, { useState } from "react";
import { toast } from "sonner";
import "./transfer.css"; 

const Withdraw = ({ onClose, onTransferSuccess }) => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      return toast.error("Enter valid amount");
    }

    setLoading(true);

    try {
      const res = await fetch("https://bank-bankend-w4oo.onrender.com/me/withdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ amount: Number(amount) }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      toast.success("Withdraw successful");

      onTransferSuccess(result.newBalance);
      onClose();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Withdraw Money</h2>

        <form onSubmit={handleWithdraw}>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Withdraw"}
          </button>

          <button type="button" onClick={onClose} disabled={loading}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default Withdraw;

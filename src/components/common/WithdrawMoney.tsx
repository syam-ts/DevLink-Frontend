import React, { useState } from "react";
import axios from "axios";


interface WithdrawMoneyProps {
    userId: string | undefined;
}

export const WithdrawMoney: React.FC<WithdrawMoneyProps> = ({ userId }) => {

    const [showForm, setShowForm] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [routingNumber, setRoutingNumber] = useState<string>("");
  const [currency, setCurrency] = useState<string>("inr");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleWithdraw = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:3000/user/wallet/withdraw", {
        userId,
        amount,
        accountNumber,
        routingNumber,
        currency,
      });

      setMessage(response.data.message);
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
      setShowForm(false);
    }
  };

  return (
    <div>
      <button onClick={() => setShowForm(true)}>Withdraw</button>

      {showForm && (
        <form onSubmit={handleWithdraw}>
          <input
            type="number"
            placeholder="Enter amount (INR)"
            value={amount}
            className='text-black'
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Bank Account Number"
              className='text-black'
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Routing Number"
              className='text-black'
            value={routingNumber}
            onChange={(e) => setRoutingNumber(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Confirm Withdrawal"}
          </button>
        </form>
      )}

      {message && <p>{message}</p>}
    </div>
  );
};
 

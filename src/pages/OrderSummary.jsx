import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function OrderSummary() {
  const { orderId } = useParams();
  const [data, setData] = useState(null);
  const [err,  setErr]  = useState("");

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`http://localhost:8080/order/summary/${orderId}`);

        if (!r.ok) throw new Error("Unable to fetch order");
        const json = await r.json();
        if (json.error) throw new Error("Order not found");
        setData(json);
      } catch (e) { setErr(e.message); }
    })();
  }, [orderId]);

  if (err)   return <p className="text-center mt-6 text-danger">{err}</p>;
  if (!data) return <p className="text-center mt-6">Loading…</p>;

  return (
    <div className="container mt-6">
      <h2>✅ Payment Successful!</h2>
      <p><b>Order&nbsp;ID:</b> {data.orderId}</p>
      <p><b>Status:</b> {data.status}</p>

      <h4 className="mt-4">Items</h4>
      <table className="table">
        <thead>
          <tr><th>Name</th><th>Qty</th><th>Price</th><th>Subtotal</th></tr>
        </thead>
        <tbody>
          {data.items.map((it, idx) => (
            <tr key={idx}>
              <td>{it.name}</td>
              <td>{it.qty}</td>
              <td>₹{it.price}</td>
              <td>₹{it.qty * it.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="text-right">Total Paid: ₹{data.total}</h3>

      <Link to="/" className="btn btn-primary mt-3">Continue Shopping</Link>
    </div>
  );
}

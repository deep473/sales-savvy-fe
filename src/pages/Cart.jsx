import React, { useEffect, useState } from "react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");

  const username = localStorage.getItem("username");

  useEffect(() => {
    if (!username) return;

    (async () => {
      try {
        const res = await fetch(`http://localhost:8080/getCart/${username}`);
        if (!res.ok) throw new Error("Failed to fetch cart");
        const data = await res.json();
        setCartItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [username]);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="container mt-6 cart-view">
      <h2 className="text-center mb-4">🛒 Your Shopping Cart</h2>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-danger">{error}</p>}

      {!loading && !error && cartItems.length === 0 && (
        <p className="text-center">Your cart is empty.</p>
      )}

      {!loading && !error && cartItems.length > 0 && (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price (₹)</th>
                <th>Subtotal (₹)</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.product.name}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.product.price}</td>
                  <td>₹{item.quantity * item.product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-summary text-right mt-4">
            <h3>Total: ₹{totalAmount}</h3>
            <button className="btn btn-primary mt-2">Proceed to Pay</button>
          </div>
        </>
      )}
    </div>
  );
}

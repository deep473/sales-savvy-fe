import React, { useEffect, useState } from "react";

export default function Cart() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const username = localStorage.getItem("username");
    fetch(`http://localhost:8080/getCart/${username}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        const grandTotal = data.reduce((sum, item) => {
          return sum + item.product.price * item.quantity;
        }, 0);
        setTotal(grandTotal);
      });
  }, []);

  return (
    <div className="container cart-page">
      <h2 className="text-center mb-4">🛒 Your Cart</h2>

      {items.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx}>
                <td>{item.product.name}</td>
                <td>₹{item.product.price}</td>
                <td>{item.quantity}</td>
                <td>₹{item.product.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {items.length > 0 && (
        <>
          <h3 className="text-right mt-4">Total: ₹{total}</h3>
          <div className="text-center mt-4">
            <button className="btn btn-success">
              Proceed to Payment 💳
            </button>
          </div>
        </>
      )}
    </div>
  );
}

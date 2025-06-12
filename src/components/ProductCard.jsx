import React, { useState } from "react";

export default function ProductCard({ product, onAddToCart }) {
  const [qty, setQty] = useState(1);

  return (
    <div className="product-card">
      <img
        src={product.photo}
        alt={product.name}
        onError={(e) => { e.target.src = "/default.png"; }}
        className="product-img"
      />
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <div className="qty-control">
        <button onClick={() => setQty(q => Math.max(1, q - 1))}>
          -
        </button>
        <span>{qty}</span>
        <button onClick={() => setQty(q => q + 1)}>+</button>
      </div>
      <button onClick={() => onAddToCart(product, qty)}>
        Add to Cart
      </button>
    </div>
  );
}
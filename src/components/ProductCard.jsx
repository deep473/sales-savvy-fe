import React from "react";

/**
 * Horizontal product card.
 * Expects a `product` object with:
 * { id, name, price, category, description, imageUrl }
 */
export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <div className="product-img-wrap">
        {/* Fallback image if none provided */}
        <img
          src={product.imageUrl || "/placeholder.png"}
          alt={product.name}
          loading="lazy"
        />
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-price">₹{product.price}</p>
        <p className="product-desc">{product.description}</p>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => onAddToCart(product)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

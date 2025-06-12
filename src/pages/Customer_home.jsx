import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

export default function Customer_home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:8080/getAllProducts");
        if (!res.ok) throw new Error("Failed to fetch products");
        setProducts(await res.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleAddToCart(product, qty) {
    const username = localStorage.getItem("username");
    if (!username) {
      alert("Please sign in first");
      return;
    }

    try {
      const resp = await fetch("http://localhost:8080/addToCart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          username,
          quantity: qty
        })
      });

      if (resp.ok) alert(`Added \"${product.name}\" (x${qty}) to cart`);
      else alert("Could not add to cart");
    } catch (err) {
      console.error(err);
      alert("Could not add to cart");
    }
  }

  return (
    <div className="customer-home container mt-6">
      <h1 className="text-center mb-4">Welcome to Sales-Savvy</h1>
      <h2 className="text-center mb-6">Available Products</h2>

      {loading && <p className="text-center">Loading…</p>}
      {error && <p className="text-center">{error}</p>}

      {!loading && !error && (
        products.length ? (
          <div className="products-grid">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : <p className="text-center">No products available</p>
      )}
    </div>
  );
}

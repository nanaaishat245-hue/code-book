import React, { useState } from "react";
import { ProductCard } from "../Components/Elements/ProductCard";

const sampleProducts = [
  {
    id: "p1",
    name: "Wireless Headphones",
    overview: "Comfortable over-ear headphones with noise cancellation.",
    poster: "https://via.placeholder.com/400x300.png?text=Headphones",
    price: 99.99,
    rating: 4.5,
    best_seller: true,
    inStock: true
  },
  {
    id: "p2",
    name: "Smart Speaker",
    overview: "Voice-controlled smart speaker with rich sound.",
    poster: "https://via.placeholder.com/400x300.png?text=Smart+Speaker",
    price: 59.99,
    rating: 4.2,
    best_seller: false,
    inStock: true
  },
  {
    id: "p3",
    name: "Fitness Tracker",
    overview: "Track steps, heart rate and sleep patterns.",
    poster: "https://via.placeholder.com/400x300.png?text=Fitness+Tracker",
    price: 39.99,
    rating: 4.0,
    best_seller: false,
    inStock: false
  }
];

export default function ProductsDemo() {
  const [cartList, setCartList] = useState([]);

  const addToCart = (p) => setCartList(prev => prev.find(item => item.id === p.id) ? prev : [...prev, p]);
  const removeFromCart = (p) => setCartList(prev => prev.filter(item => item.id !== p.id));

  return (
    <div className="p-6">
      <h2 className="text-3xl mb-4">Products Demo</h2>
      <div className="flex flex-wrap">
        {sampleProducts.map(prod => (
          <ProductCard
            key={prod.id}
            product={prod}
            cartList={cartList}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-xl">Cart (demo)</h3>
        <ul>
          {cartList.length === 0 && <li>No items</li>}
          {cartList.map(i => <li key={i.id}>{i.name} — ${i.price}</li>)}
        </ul>
      </div>
    </div>
  );
}
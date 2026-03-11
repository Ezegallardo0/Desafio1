import React from "react";
import { Link } from "react-router";
import ProductCard from "./ProductCard";

function Selection({productos}) {
  const reponer = productos.filter((p) => p.stock > 0 && p.stock <= 5);


  return (
    <>
      <div className="vuelta">
        <Link className="casa" to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-move-left-icon lucide-move-left"
          >
            <path d="M6 8L2 12L6 16" />
            <path d="M2 12H22" />
          </svg>
          <h3>Inicio</h3>
        </Link>
      </div>
      {reponer.map((producto) => (
        <ProductCard key={producto.id} producto={producto} />
      ))}
      
    </>
  );
};
export default Selection
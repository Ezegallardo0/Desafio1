import React from "react";
import "../styles/card.css"
function ProductCard({ producto }) {
    return (
        <div className="card">
            <div className="cardProducto">
                <h3>{producto.nombre}</h3>
                <p>SKU: {producto.sku}</p>
                <p>Stock: {producto.stock}</p>
                <p>Precio: ${producto.precio}</p>
            </div>
        </div>
    )
}
export default ProductCard
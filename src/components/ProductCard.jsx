import React from "react";
import { Link } from "react-router-dom";
import "../styles/card.css"
function ProductCard({ producto, onDelete }) {
    return (
        <div className="card">
            <h3 className="card-price">{producto.nombre}</h3>
            <h3 className="card-title">${producto.precio}</h3>
            <h3 className="card-title">stock: {producto.stock}</h3>
            <p className="card-description">Sku: {producto.sku}</p>

            <div className="card-actions">
                <div className="action edit">
                    <Link to={`/editar/${producto.id}`}>
                        <svg
                            className="icon edit-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                        <button>Editar</button>
                    </Link>
                </div>

                <div className="action delete">
                    <svg
                        className="icon delete-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                        <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                    <button
                        onClick={() => {
                            if (window.confirm("¿Eliminar producto?")) {
                                onDelete(producto.id);
                            }
                        }}
                    >
                        Eliminar
                    </button>
                </div>
                <div className="detalle">
                    <Link to={`/producto/${producto.id}`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-scan-eye-icon lucide-scan-eye"
                    >
                        <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                        <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                        <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                        <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                        <circle cx="12" cy="12" r="1" />
                        <path d="M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0" />
                    </svg>
                    <button>Detalle</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default ProductCard
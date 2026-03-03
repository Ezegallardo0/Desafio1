import { Link } from "react-router-dom";

function Card({ producto, onDelete }) {
    return (
        <div className="plan">
            <div className="inner">

                <span className="pricing">
                    <span>
                        {/* always show two decimals and use US style separators */}
                        ${producto.precio
                            ? Number(producto.precio).toLocaleString("en-US", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                              })
                            : "0.00"}
                    </span>
                </span>

                <p className="title">
                    {producto.nombre ?? "(sin nombre)"}
                </p>

                <p className="info">
                    SKU: {producto.sku ?? "(sin sku)"}
                </p>

                <ul className="features">
                    <li>
                        <strong>Stock:</strong> {producto.stock ?? 0}
                    </li>
                </ul>

                <div className="action">
                    <button
                        className="delete"
                        onClick={() => onDelete(producto)}
                    >
                        Eliminar
                    </button>
                    <Link
                        className="edit"
                        to={`/editar/${producto.id}`}
                    >
                        Editar
                    </Link>
                    <Link
                        className="detalle"
                        to={`/producto/${producto.id}`}
                    >Ver Detalle</Link>
                </div>
            </div>

        </div>

    )
}
export default Card

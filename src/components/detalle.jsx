import { useNavigate, useParams } from "react-router-dom";
import "../styles/detalle.css";
import StockMovementForm from "./StockMovementForm";
import Historial from "./historial";

function DetalleProducto({ productos, historial, moverStock }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const producto = productos.find((p) => p.id === id);

  if (!producto) return <p>Producto no encontrado.</p>;

  return (
    <div className="detalle-container">
      <div className="detalle-card">
        <h2 className="detalle-title">{producto.nombre}</h2>
        <p className="detalle-sku">SKU: {producto.sku}</p>

        <p className="detalle-stock">
          Stock actual: <strong>{producto.stock}</strong>
        </p>

        <p className="detalle-precio">
          Precio: $
          {Number(producto.precio).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>

        <StockMovementForm producto={producto} moverStock={moverStock} />

        <Historial
          historial={historial}
          productos={productos}
          productoId={producto.id}
        />
        <button className="volver-btn" onClick={() => navigate("/")}>
          Volver
        </button>
      </div>
    </div>
  );
}

export default DetalleProducto;

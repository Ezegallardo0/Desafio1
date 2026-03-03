import { useNavigate, useParams } from "react-router";
import '../styles/detalle.css'
import StockMovementForm from "../components/StockMovementForm";

function DetalleProducto({productos, moverStock}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const producto = productos.find((p) => p.id === id);

  if(!producto) return <p>Producto no encontrado.</p>

  return (
    <div className="detalle-container">
      <div className="detalle-card">
        <h2 className="detalle-title">{producto.nombre}</h2>
        <p className="detalle-sku">SKU: {producto.sku}</p>

        <p className="detalle-stock">
          Stock actual: <strong>{producto.stock}</strong>
        </p>

        <p className="detalle-precio">
          Precio: ${producto.precio}
        </p>

        <StockMovementForm
          producto={producto}
          moverStock={moverStock} />
        <button
          className="volver-btn"
          onClick={() => navigate("/")}
        >
          Volver
        </button>
      </div>
    </div>
  );
}

export default DetalleProducto;
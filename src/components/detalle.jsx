import { useNavigate, useParams } from "react-router-dom";
import '../styles/detalle.css'
import StockMovementForm from "./StockMovementForm";

function DetalleProducto({productos, historial, moverStock}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const producto = productos.find((p) => p.id === id);
  
  const movimientosProducto = historial.filter(mov => mov.productoId === id);

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
          Precio: $
          {Number(producto.precio).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>

        <StockMovementForm
          producto={producto}
          moverStock={moverStock} />

        {/* Historial de movimientos */}
        <div className="historial-section">
          <h3>Historial de Movimientos</h3>
          {movimientosProducto.length === 0 ? (
            <p className="sin-movimientos">Sin movimientos registrados</p>
          ) : (
            <ul className="historial-list">
              {movimientosProducto.map((mov) => (
                <li key={mov.id} className={`movimiento ${mov.tipo}`}>
                  <span className="tipo-badge">{mov.tipo.toUpperCase()}</span>
                  <span className="cantidad">Cantidad: {mov.cantidad}</span>
                  <span className="fecha">
                    {new Date(mov.fecha).toLocaleString('es-AR')}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

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
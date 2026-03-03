import { useState } from "react";
import "../styles/movimiento.css"

function StockMovementForm({ producto, moverStock }) {
    const [cantidad, setCantidad] = useState("");
    const [tipo, setTipo] = useState("entrada");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefaul();
        const num = Number(cantidad);
        if (!num || num <= 0) {
            setError("la cantidad debe ser mayor a 0.");
            return;
        }
        if (tipo === "salida" && num > producto.stock) {
            setError("No hay stock suficiente");
            return;
        }
        moverStock(producto.id, tipo, num);
        setCantidad("");
        setError("");
    }
    return (
        <div className="stock-container">
            <h3>Movimiento de Stock</h3>

            {error && <p className="stock-error">{error}</p>}

            <form className="stock-form" onSubmit={handleSubmit}>
                <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                    <option value="entrada">Entrada</option>
                    <option value="salida">Salida</option>
                </select>

                <input
                    type="number"
                    min="1"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                    placeholder="Cantidad"
                />

                <button type="submit">Registrar</button>
            </form>
        </div>
    );
}
export default StockMovementForm;
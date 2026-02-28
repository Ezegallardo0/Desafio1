import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../styles/editar.css'

function EditarProducto() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [producto, setProducto] = useState(null);
    const [cantidad, setCantidad] = useState("");
    const [loading, setLoading] = useState(true);

    const API = 'https://699c9cb4110b5b738cc33411.mockapi.io/products';

    useEffect(() => {
        fetch(`${API}/${id}`)
            .then(res => res.json())
            .then(data => {
                if (!data.historial) {
                    data.historial = [];
                }
                setProducto(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);
    const actualizarProducto = async (productoActualizado) => {
        try {
            const res = await fetch(`${API}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productoActualizado),
            });

            if (!res.ok) throw new Error("Error actualizando");

            const data = await res.json();

            if (!data.historial) {
                data.historial = [];
            }

            setProducto(data);

        } catch (error) {
            console.error("Error:", error);
            alert("Hubo un error al actualizar");
        }
    };

    const handleEntrada = () => {
        const cant = parseInt(cantidad);
        if (!cant || cant <= 0) {
            alert("Ingresa una cantidad valida.");
            return;
        }
        const nuevoStock = Number(producto.stock) + cant;
        const movimiento = {
            tipo: "entrada",
            cantidad: cant,
            fecha: new Date().toLocaleString(),
        };
        const productoActualizado = {
            ...producto,
            stock: nuevoStock,
            historial: [...producto.historial, movimiento],
        };
        actualizarProducto(productoActualizado);
        setCantidad("");
    };

    const handleSalida = () => {
        const cant = parseInt(cantidad);
        if (!cant || cant <= 0) {
            alert("Ingresa una cantidad valida.");
            return;
        }
        if (cant > Number(producto.stock)) {
            alert("No puede sacar mas de lo que hay en stock.");
            return;
        }
        const nuevoStock = Number(producto.stock) - cant;
        const movimiento = {
            tipo: "salida",
            cantidad: cant,
            fecha: new Date().toLocaleString(),
        };
        const productoActualizado = {
            ...producto,
            stock: nuevoStock,
            historial: [...producto.historial, movimiento],
        };
        actualizarProducto(productoActualizado);
        setCantidad("");
    };

    if (loading) return (
        <div className="typing-wrapper">
            <div className="typing-indicator">
                <div className="typing-circle"></div>
                <div className="typing-circle"></div>
                <div className="typing-circle"></div>

                <div className="typing-shadow"></div>
                <div className="typing-shadow"></div>
                <div className="typing-shadow"></div>
            </div>
        </div>)
    if (!producto) return <p>producto no encontrado</p>

    return (
        <div className="editar-container">
            <div className="editar-card">

                <h2>{producto.nombre}</h2>
                <p><strong>SKU:</strong> {producto.sku}</p>
                <p>
                    <strong>Stock actual:</strong>{" "}
                    <span style={{ color: producto.stock === 0 ? "#ef4444" : "#22c55e" }}>
                        {producto.stock}
                    </span>
                </p>

                <hr />

                <h3>Movimientos de stock</h3>

                <input
                    className="stock-input"
                    type="number"
                    placeholder="Cantidad"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                    min="1"
                />

                <div className="stock-buttons">
                    <button className="btn-entrada" onClick={handleEntrada}>
                        Entrada
                    </button>

                    <button className="btn-salida" onClick={handleSalida}>
                        Salida
                    </button>
                </div>

                <hr />

                <h3>Historial</h3>

                {producto.historial.length === 0 ? (
                    <p>No hay movimientos todavía</p>
                ) : (
                    <ul className="historial">
                        {producto.historial.map((mov, index) => (
                            <li key={index}>
                                <strong
                                    style={{
                                        color: mov.tipo === "entrada" ? "#22c55e" : "#ef4444",
                                    }}
                                >
                                    {mov.tipo.toUpperCase()}
                                </strong>{" "}
                                - {mov.cantidad} unidades - {mov.fecha}
                            </li>
                        ))}
                    </ul>
                )}

                <button className="btn-volver" onClick={() => navigate("/")}>
                    Volver
                </button>

            </div>
        </div>
    );
}

export default EditarProducto;

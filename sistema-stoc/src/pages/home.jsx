import React, { useEffect, useState, useCallback } from "react";
import Card from "../components/productcard";
import { Link } from "react-router-dom";
import "../styles/home.css"

function Home({ productos, setProductos, search }) {
  const API = "https://699c9cb4110b5b738cc33411.mockapi.io/products";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre?.toLowerCase().includes(search.toLowerCase())
  );
  const fetchProductos = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error(`Status ${res.status}`);

      const data = await res.json();
      setProductos(data);
    } catch (err) {
      console.error("Error cargando los productos:", err);
      setError("No se pudieron cargar los productos.");
    } finally {
      setLoading(false);
    }
  }, [API, setProductos]);

  useEffect(() => {
    fetchProductos();
  }, [fetchProductos]);
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Error al eliminar.");

      setProductos((prev) =>
        prev.filter((producto) => producto.id !== id)
      );
    } catch (error) {
      console.error("Error eliminando el producto:", error);
    }
  };

  if (loading) {
    return (
      <div className="typing-wrapper">
        <div className="typing-indicator">
          <div className="typing-circle"></div>
          <div className="typing-circle"></div>
          <div className="typing-circle"></div>

          <div className="typing-shadow"></div>
          <div className="typing-shadow"></div>
          <div className="typing-shadow"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">Productos Cargados</h1>

        <div className="home-buttons">
          <button
            onClick={fetchProductos}
            className="reload"
            aria-label="Recargar productos"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rotate-cw-icon lucide-rotate-cw"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /></svg>
          </button>

          <Link to="/cargarProducto" className="btn btn2">
            <span className="btn__text">Cargar</span>

            <span className="btn__icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
                className="svg"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </span>
          </Link>

        </div>
      </header>

      {error && <div className="error-message">{error}</div>}
      {productos.length === 0 && !loading && (
        <div className="empty-state">
          <h2>No hay productos todavía 📦</h2>
          <p>Agregá tu primer producto para comenzar</p>
        </div>
      )}
      {productos.length > 0 && (
        <div className="container-plan">
          {productosFiltrados.map((producto) => (
            <Card
              key={producto.id}
              producto={producto}
              onDelete={(producto) => setProductoAEliminar(producto)} />
          ))}
        </div>
      )}
      {productoAEliminar && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>¿Eliminar producto?</h3>
            <p>
              Vas a eliminar{" "}
              <strong>{productoAEliminar.nombre}</strong>
            </p>

            <div className="modal-buttons">
              <button
                className="cancel-btn"
                onClick={() => setProductoAEliminar(null)}
              >
                Cancelar
              </button>

              <button
                className="confirm-btn"
                onClick={() => {
                  handleDelete(productoAEliminar.id);
                  setProductoAEliminar(null);
                }}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
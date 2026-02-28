import React, { useState } from "react";
import Card from "../components/productcard";
import { Link } from "react-router-dom";
import "../styles/home.css"

function Home({ productos, setProductos, search }) {


  const [productoAEliminar, setProductoAEliminar] = useState(null);

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    setProductos(prev =>
      prev.filter(producto => producto.id !== id)
    );
  }
  console.log("Productos en Home:", productos);
  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">Productos Cargados</h1>

        <div className="home-buttons">

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
      {productosFiltrados.length === 0 ? (
        <div className="empty-state">
          <h2>No se encontraron productos 🔍</h2>
        </div>
      ) : (
        <div className="container-plan">
          {productosFiltrados.map((producto) => (
            <Card
              key={producto.id}
              producto={producto}
              onDelete={() => setProductoAEliminar(producto)}
            />
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
import React, { useState, useRef, useEffect } from "react";
import "../styles/nav.css";
import { Link } from "react-router";

function Menu({ search, setSearch }) {
  const [mostrarBuscador, setMostrarBuscador] = useState(false);
const buscadorRef = useRef(null);

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      buscadorRef.current &&
      !buscadorRef.current.contains(event.target)
    ) {
      setMostrarBuscador(false);
    }
  };

  if (mostrarBuscador) {
    document.addEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [mostrarBuscador]);

  return (
    <>
      <h1 className="titulo">Inventario360</h1>
      <div className="button-container">
        <button className="button">
          <Link to="/">
            <svg
              className="icon"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 1024 1024"
              height="3em"
              width="3em"
            >
              <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z" />
            </svg>
          </Link>
        </button>

        <div ref={buscadorRef} className={`group ${mostrarBuscador ? "active" : ""}`}>
          <input
            className="input"
            type="search"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          className="button search-btn"
          onClick={() => setMostrarBuscador(!mostrarBuscador)}
        >
          <svg
            className="icon"
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            height="3em"
            width="3em"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <button className="button">
          <Link to="/cargarproducto">
            <svg
              className="icon"
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              height="3em"
              width="3em"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </Link>
        </button>
      </div>
    </>
  );
}

export default Menu;
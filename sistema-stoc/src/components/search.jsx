import React, { useState } from "react";
import Card from "../components/productcard";
import '../styles/search.css'

function Buscador({ productos }) {

    const [search, setSearch] = useState("");

    const productosFiltrados = productos.filter((producto) => {
        if (!search.trim())
            return false;
        return (
            producto.nombre?.toLowerCase().includes(search.toLowerCase()) ||
            producto.sku?.toLowerCase().includes(search.toLowerCase())
        )
    });
    return (
        <div>
      {/* From Uiverse.io by LightAndy1 */}
      <div className="group">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="search-icon"
        >
          <g>
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
          </g>
        </svg>

        <input
          id="query"
          className="input"
          type="search"
          placeholder="Search..."
          name="searchbar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {productosFiltrados.map((producto) => (
        <Card key={producto.id} producto={producto} />
      ))}

      {search.trim() && productosFiltrados.length === 0 && (
        <p>No se encontraron productos.</p>
      )}
    </div>

    )
}
export default Buscador
import { useState, useEffect } from "react";
import DetalleProducto from "./components/detalle";
import Menu from "./components/nav";
import CargarProductos from "./components/cargar";
import ProductEditForm from "./components/editar";
import Home from "./components/home";
import "./styles/App.css";
import { Route, Routes } from "react-router-dom";

function App() {

  const [search, setSearch] = useState("");
  const [filterLowStock, setFilterLowStock] = useState(false);
  const [sortOption, setSortOption] = useState("none");
  const [historial, setHistorial] = useState(() => {
    const data = localStorage.getItem("historial");
    return data ? JSON.parse(data) : [];
  })
  const [productos, setProductos] = useState(() => {
    const data = localStorage.getItem("productos");
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);
  useEffect(() => {
    localStorage.setItem("historial", JSON.stringify(historial));
  }, [historial])

  const moverStock = (productoId, tipo, cantidad) => {
    setProductos(prev =>
      prev.map(p => {
        if(p.id !== productoId) return p;
        if(tipo === "salida" && cantidad > p.stock){
          return p;
        }
        return {
          ...p,
          stock: tipo === "entrada"
          ? p.stock + cantidad
          : p.stock - cantidad
        };
      })
    );
    setHistorial(prev =>[
      ...prev,
      {
        id: crypto.randomUUID(),
        productoId,
        tipo,
        cantidad,
        fecha: new Date().toISOString()
      }
    ])
  }

  return (
    <main>
      <Menu
        search={search}
        setSearch={setSearch}
        filterLowStock={filterLowStock}
        setFilterLowStock={setFilterLowStock}
        sortOption={sortOption}
        setSortOption={setSortOption}
        productos={productos}
        setProductos={setProductos}
      />
      <Routes>
        <Route path="/" element={
          <Home
            productos={productos}
            setProductos={setProductos}
            search={search}
            filterLowStock={filterLowStock}
            sortOption={sortOption}
          />
        } />
        <Route path="/cargarproducto" element={<CargarProductos productos={productos} setProductos={setProductos} />} />
        <Route path="/editar/:id" element={<ProductEditForm  productos={productos} setProductos={setProductos} />} />
        <Route path="/producto/:id" element={
          <DetalleProducto
            productos={productos}
            historial={historial}
            moverStock={moverStock} />} />
      </Routes>
    </main>
  );
}

export default App;
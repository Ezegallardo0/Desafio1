import { useState, useEffect } from "react";
import DetalleProducto from "./components/detalle";
import Menu from "./components/nav";
import CargarProductos from "./pages/cargar";
import EditarProducto from "./pages/editar";
import Home from "./pages/home";
import "./styles/App.css";
import { Route, Routes } from "react-router-dom";

function App() {

  const [search, setSearch] = useState("");
  const [productos, setProductos] = useState(() => {
    const data = localStorage.getItem("productos");
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);


  return (
    <main>
      <Menu search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={
          <Home
            productos={productos}
            setProductos={setProductos}
            search={search} />
        } />
        <Route path="/cargarproducto" element={<CargarProductos productos={productos} setProductos={setProductos} />} />
        <Route path="/editarproducto/:id" element={<EditarProducto productos={productos} setProductos={setProductos} />} />
        <Route path="/producto/:id" element={<DetalleProducto productos={productos} />} />
      </Routes>
    </main>
  );
}

export default App;
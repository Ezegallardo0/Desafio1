import { useState, useEffect } from "react";
import DetalleProducto from "./components/detalle";
import Menu from "./components/nav";
import Buscador from "./components/search";
import CargarProductos from "./pages/cargar";
import EditarProducto from "./pages/editar";
import Home from "./pages/home";
import "./styles/App.css";
import { Route, Routes } from "react-router-dom";

function App() {

  const [productos, setProductos] = useState([]);
  const [search, setSearch] = useState("");
  const API = "https://699c9cb4110b5b738cc33411.mockapi.io/products";


  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch(API);
        const data = await res.json();
        setProductos(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductos();
  }, []);

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
import { useState, useEffect } from "react";
import DetalleProducto from "./components/detalle.jsx";
import Menu from "./components/Nav.jsx";
import CargarProductos from "./components/cargar.jsx";
import ProductEditForm from "./components/editar.jsx";
import Home from "./components/home.jsx";
import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import ProduHome from "./components/productos.jsx";

function App() {
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
        productos={productos}
        setProductos={setProductos}
      />
      <Routes>
        <Route path="/" element={<Home /> } />
        <Route path="/cargarproducto" element={<CargarProductos productos={productos} setProductos={setProductos} />} />
        <Route path="/editar/:id" element={<ProductEditForm  productos={productos} setProductos={setProductos} />} />
        <Route path="/producto/:id" element={
          <DetalleProducto
            productos={productos}
            historial={historial}
            moverStock={moverStock} />} />
        <Route path="/producto" element={<ProduHome productos={productos}/>} />
      </Routes>
    </main>
  );
}

export default App;
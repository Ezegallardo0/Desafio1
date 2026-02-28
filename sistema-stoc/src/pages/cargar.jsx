import React, { useState } from "react";
import '../styles/cargar.css'

function CargarProductos({ productos, setProductos }) {

  const [nombre, setNombre] = useState('');
  const [sku, setSku] = useState('');
  const [stock, setStock] = useState('');
  const [precio, setPrecio] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!nombre.trim() || !sku.trim() || !stock || !precio) {
      setError('Deberás completar todos los campos.');
      setSuccess("");
      return;
    }

    if (Number(stock) < 0 || Number(precio) < 0) {
      setError("El Stock y el Precio no pueden ser negativos.");
      setSuccess("");
      return;
    }

    const existe = productos.some(
      (producto) =>
        producto.sku.trim().toLowerCase() === sku.trim().toLowerCase()
    );
    if (existe) {
      setError("El Sku ya existe. Debe ser unico.")
      setSuccess("");
      return;
    }
    const nuevoProducto = {
      id: crypto.randomUUID(),
      nombre: nombre.trim(),
      sku: sku.trim(),
      stock: Number(stock),
      precio: Number(precio),
    };
    setProductos((prev) => [...prev, nuevoProducto]);

    setNombre("")
    setSku("");
    setStock("");
    setPrecio("");
    setError("");
    setSuccess("Producto agregado correctamente ✅");
  }
  return (
    <div className="Container">
      <h1 className="text-center">Cargar Producto</h1>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form className="formulario" onSubmit={handleSubmit}>
        <div>
          <input
            className="input"
            placeholder="Nombre del producto"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <input
            className="input"
            placeholder="SKU"
            type="text"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
          />
        </div>
        <div>
          <input
            className="input"
            placeholder="Stock"
            type="number"
            min="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        <div>
          <input
            className="input"
            placeholder="Precio"
            type="number"
            min="0"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
        </div>
        <button className="boton" type="submit">Cargar</button>
      </form>
    </div>
  );
}

export default CargarProductos;
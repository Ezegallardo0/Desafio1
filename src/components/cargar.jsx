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

    if (!nombre.trim() || !sku.trim() || !stock) {
      setError('Nombre, SKU y Stock son obligatorios.');
      setSuccess("");
      return;
    }

    if (Number(stock) < 0 || !Number.isInteger(Number(stock))) {
      setError("El Stock debe ser un número entero positivo.");
      setSuccess("");
      return;
    }

    const cleaned = precio.toString().replace(/,/g, '');
    const precioNum = parseFloat(cleaned);

    if (isNaN(precioNum)) {
      setError("El Precio debe ser un número válido.");
      setSuccess("");
      return;
    }
    if (precioNum < 0) {
      setError("El Precio no puede ser negativo.");
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
      precio: precioNum, 
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
            type="text"                  
            value={precio}
            onChange={(e) => {
              const val = e.target.value;
              if (/^[0-9.,]*$/.test(val)) {
                setPrecio(val);
              }
            }}
          />
        </div>
        <button className="boton" type="submit">Cargar</button>
      </form>
    </div>
  );
}

export default CargarProductos;
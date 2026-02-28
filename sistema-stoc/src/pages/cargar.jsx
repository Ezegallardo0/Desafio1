import React, { useState } from "react";
import '../styles/cargar.css'

function CargarProductos({setProductos}) {
  const API = 'https://699c9cb4110b5b738cc33411.mockapi.io/products';

  const [nombre, setNombre] = useState('');
  const [sku, setSku] = useState('');
  const [stock, setStock] = useState('');
  const [precio, setPrecio] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!nombre.trim() || !sku.trim() || !stock || !precio) {
      setError('Deberás completar todos los campos.');
      return;
    }

    if (Number(stock) < 0 || Number(precio) < 0) {
      setError("El Stock y el Precio no pueden ser negativos.");
      return;
    }

    try {
      const check = await fetch(API);
      const data = await check.json();

      const existe = data.some(
        (producto) => producto.sku.trim().toLowerCase () === sku.trim().toLocaleLowerCase()
      )
      if (existe) {
        setError("El SKU ya existe. Debe ser único.");
        return;
      }

      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: nombre.trim(),
          sku: sku.trim(),
          stock: Number(stock),
          precio: Number(precio),
        }),
      });
      const nuevoProducto =await response.json();
      setProductos((prev) => [...prev, nuevoProducto])

      if (!response.ok) throw new Error("Error al crear producto.");

      setNombre('');
      setSku('');
      setStock('');
      setPrecio('');
      setError('');

    } catch (error) {
      console.error(error);
      setError("Error al guardar producto.");
    }
    setSuccess("Producto agregado correctamente ✅");
    setError("");
  };

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
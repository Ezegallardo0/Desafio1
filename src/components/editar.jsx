import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/editar.css";

function ProductEditForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const hasInitialized = useRef(false);

  const [producto, setProducto] = useState({
    nombre: "",
    sku: "",
    precio: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const encontrado = productos.find((p) => String(p.id) === String(id));
    console.log("ID de la URL:", id);
    console.log("Productos:", productos);
    if (!encontrado) {
      navigate("/producto");
      return;
    }

    setProducto({
      nombre: encontrado.nombre || "",
      sku: encontrado.sku || "",
      precio: encontrado.precio ?? "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const productos = JSON.parse(localStorage.getItem("productos")) || [];

    if (!producto.nombre.trim()) {
      setError("El nombre es obligatorio.");
      return;
    }

    if (!producto.sku.trim()) {
      setError("El SKU es obligatorio.");
      return;
    }

    if (producto.precio !== "" && Number(producto.precio) < 0) {
      setError("El precio no puede ser negativo.");
      return;
    }
    const skuExiste = productos.some(
      (p) => p.sku === producto.sku && p.id !== id,
    );

    if (skuExiste) {
      setError("El SKU ya existe.");
      return;
    }

    const productosActualizados = productos.map((p) =>
      String(p.id) === String(id)
        ? {
            ...p,
            nombre: producto.nombre.trim(),
            sku: producto.sku.trim(),
            precio: producto.precio === "" ? 0 : Number(producto.precio),
          }
        : p,
    );

    localStorage.setItem("productos", JSON.stringify(productosActualizados));

    navigate("/producto");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <h2 className="h2">Editar Producto</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={producto.nombre}
          onChange={(e) => setProducto({ ...producto, nombre: e.target.value })}
        />

        <input
          type="text"
          placeholder="SKU"
          value={producto.sku}
          onChange={(e) => setProducto({ ...producto, sku: e.target.value })}
        />

        <input
          type="number"
          placeholder="Precio"
          value={producto.precio}
          onChange={(e) => setProducto({ ...producto, precio: e.target.value })}
          min="0"
        />

        <button type="submit">Guardar Cambios</button>
        <button
          type="cancel"
          className="cancel"
          onClick={() => navigate("/producto")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default ProductEditForm;

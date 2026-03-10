import ProductCard from "./ProductCard.jsx"
import "../styles/produhome.css"
import { Link } from "react-router"
function ProduHome({ productos, setProductos }) {

    const handleDelete = (id) =>{
        setProductos((prev) =>{
            const nuevos = prev.filter((p) => p.id !==id)
            localStorage.setItem("productos", JSON.stringify(nuevos))
            return nuevos
        })
        console.log("Borrando:", id);
    }
    return (
        <>
            <div className="navegacion">
                <div className="vuelta">
                    <Link className="casa" to="/">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-move-left-icon lucide-move-left"><path d="M6 8L2 12L6 16" /><path d="M2 12H22" /></svg>
                        <h3>Inicio</h3>
                    </Link>
                </div>
                    <Link className="cargar" to="/cargarproducto"> 
                        <h3>Cargar</h3>
                </Link>
            </div>
            <div className="contenedorProductos">
                {productos.map((producto) => (
                    <ProductCard
                        key={producto.id}
                        producto={producto}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </>
    )
}
export default ProduHome
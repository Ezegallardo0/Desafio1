import { useState, useEffect } from "react"
import "../styles/admin.css"

export default function CuentaAdmin() {
  const [open, setOpen] = useState(true)
  const [_isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [setIsMobile])

  const toggleSidebar = () => setOpen(!open)

  return (
    <div className="layout">
      <aside className={`sidebar ${open ? "open" : "closed"}`}>
        <button className="toggle-btn" onClick={toggleSidebar}>
          ☰
        </button>

        <ul className="menu">
          <li>👤 {open && "Perfil"}</li>
          <li>🔐 {open && "Seguridad"}</li>
          <li>🔗 {open && "Integraciones"}</li>
          <li>📊 {open && "Estadísticas"}</li>
        </ul>
      </aside>

      <main className="content">
        <h1>Panel</h1>
        <p>Acá iría tu contenido (gráficos, stock, etc).</p>
      </main>
    </div>
  )
}
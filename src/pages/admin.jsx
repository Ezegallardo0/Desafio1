import { useState, useEffect } from "react";
import "../styles/admin.css";
import MiPerfil from "../components/perfil";
import Seguridad from "../components/seguridad";
import Integraciones from "../components/integraciones";
import Estadisticas from "../components/estadisticas";

const secciones = {
  perfil: <MiPerfil />,
  seguridad: <Seguridad />,
  integraciones: <Integraciones />,
  estadisticas: <Estadisticas />
};
const Item = ({ label, value, section, setSection, open }) => (
  <li
    onClick={() => setSection(value)}
    className={section === value ? "active" : ""}
  >
    {open ? label : label.split(' ')[0]}
  </li>
);

export default function CuentaAdmin() {
  const [open, setOpen] = useState(true);
  const [_isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [section, setSection] = useState("perfil");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsMobile]);

  const toggleSidebar = () => setOpen(!open);

  return (
    <div className="layout">
      <aside className={`sidebar ${open ? "open" : "closed"}`}>
        <button className="toggle-btn" onClick={toggleSidebar}>
          ☰
        </button>

        <ul className="menu">
          <Item
            label="👤 Mi Perfil"
            value="perfil"
            section={section}
            setSection={setSection}
            open={open}
          />
          <Item
            label="🔐 Seguridad"
            value="seguridad"
            section={section}
            setSection={setSection}
            open={open}
          />
          <Item
            label="🔗 Integraciones"
            value="integraciones"
            section={section}
            setSection={setSection}
            open={open}
          />
          <Item
            label="📊 Estadísticas"
            value="estadisticas"
            section={section}
            setSection={setSection}
            open={open}
          />
        </ul>
      </aside>
      <main className="content">{secciones[section]}</main>
    </div>
  );
}

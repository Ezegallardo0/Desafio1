# ��� Sistema Stock - Gestión de Inventario

Un sistema moderno y eficiente para gestionar tu inventario de productos. Crea, edita, elimina y monitorea el stock en tiempo real con historial completo de movimientos.

## ✨ Características

- ✅ **CRUD Completo** - Crear, leer, actualizar y eliminar productos
- ��� **Búsqueda Inteligente** - Busca por nombre o SKU al instante
- ��� **Filtrado y Ordenamiento** - Filtra stock bajo (≤5 unidades) y ordena por nombre o cantidad
- ��� **Movimientos de Stock** - Registra entradas y salidas de productos con historial detallado
- ��� **Persistencia Local** - Todos los datos se guardan en localStorage automáticamente
- ��� **Export/Import JSON** - Descarga tu inventario o importa datos desde archivo
- ��� **Interfaz Intuitiva** - Diseño limpio con tema oscuro y animaciones suaves
- ⚡ **Validaciones Integradas** - SKU único, stock entero, manejo de errores robusto

## ��� Instalación

```bash
# 1. Clona o descarga el proyecto
cd sistema-stoc

# 2. Instala las dependencias
npm install

# 3. Inicia el servidor de desarrollo
npm run dev
```

El proyecto estará disponible en `http://localhost:5173`

## ��� Cómo Usar

### Cargar un Producto
1. Haz clic en el botón **"Cargar Producto"**
2. Completa nombre, SKU y stock (precio opcional)
3. El sistema valida que el SKU sea único
4. Tu producto aparecerá en la lista principal

### Buscar Productos
- Usa la barra de búsqueda en la navegación
- Busca por nombre o SKU del producto

### Filtrar y Ordenar
- **Stock Bajo**: Activa el filtro para ver solo productos con ≤5 unidades
- **Ordenar**: Elige ordenamiento por nombre (A-Z) o por stock (mayor/menor)

### Editar un Producto
1. Haz clic en el producto que quieres modificar
2. Accede a "Editar" en la vista de detalles
3. Actualiza nombre, SKU o precio
4. Los cambios se guardan automáticamente

### Registrar Movimientos
En la vista de detalles del producto:
- **Entrada**: Registra compras o devoluciones
- **Salida**: Registra ventas o uso de inventario
- Cada movimiento se fecha automáticamente

### Descargar/Importar Datos
- **Exportar**: Haz clic en "Más" → "Exportar JSON" para descargar tu inventario
- **Importar**: Carga un archivo JSON para restaurar datos anteriores

## ���️ Estructura del Proyecto

```
sistema-stoc/
├── src/
│   ├── components/
│   │   ├── home.jsx              # Vista principal con lista de productos
│   │   ├── Nav.jsx               # Barra de navegación
│   │   ├── cargar.jsx            # Formulario crear producto
│   │   ├── editar.jsx            # Formulario editar producto
│   │   ├── detalle.jsx           # Vista detallada con historial
│   │   ├── StockMovementForm.jsx # Registrar entrada/salida
│   │   ├── productcard.jsx       # Card individual del producto
│   │   └── search.jsx            # Lógica de búsqueda
│   ├── styles/
│   │   ├── index.css             # Estilos globales
│   │   ├── nav.css               # Estilos navegación
│   │   ├── home.css              # Estilos lista productos
│   │   ├── cargar.css            # Estilos formulario crear
│   │   ├── editar.css            # Estilos formulario editar
│   │   ├── detalle.css           # Estilos vista detalle
│   │   ├── search.css            # Estilos búsqueda
│   │   └── movimiento.css        # Estilos movimientos
│   ├── App.jsx                   # Componente raíz
│   └── main.jsx                  # Punto de entrada
├── package.json
├── vite.config.js
└── index.html
```

## ���️ Stack Tecnológico

- **React 18** - Framework UI con hooks
- **React Router DOM** - Navegación SPA
- **Vite** - Build tool ultrarrápido
- **CSS3** - Estilos con flexbox y animaciones
- **localStorage API** - Persistencia de datos

## ��� Estructura de Datos

### Producto
```javascript
{
  id: "uuid-generado",
  nombre: "Nombre del Producto",
  sku: "SKU-UNICO",
  precio: 100.50,
  stock: 25,
  fechaCreacion: "2024-12-01T10:30:00"
}
```

### Movimiento de Stock
```javascript
{
  id: "uuid-generado",
  productoId: "id-del-producto",
  tipo: "entrada" | "salida",
  cantidad: 10,
  motivo: "Compra" | "Venta" | "Ajuste",
  fecha: "2024-12-01T10:30:00"
}
```

## ⚙️ Validaciones

- ✔️ **Nombre**: Requerido, máx 100 caracteres
- ✔️ **SKU**: Requerido, único en el sistema, máx 50 caracteres
- ✔️ **Stock**: Requerido, número entero ≥ 0
- ✔️ **Precio**: Opcional, número ≥ 0 si se proporciona
- ✔️ **Movimientos**: Cantidad positiva, no permite salida mayor al stock disponible

## ��� Decisiones de Diseño

1. **localStorage en lugar de DB**: Simplifica el proyecto pero permite persistencia sin backend
2. **UUIDs para IDs**: Asegura unicidad incluso offline
3. **Context/Props Drilling**: Gestión de estado simple y clara sin librerías adicionales
4. **CSS puro**: Sin dependencias de frameworks CSS, máximo control visual
5. **Componentes funcionales**: Aprovecha React hooks para código más limpio

## ��� Consideraciones Importantes

- Los datos se guardan localmente en el navegador (localStorage)
- Borrar datos del navegador eliminará todo el inventario
- Para proyectos grandes, migra a una base de datos real
- Soporta navegadores modernos (Chrome, Firefox, Safari, Edge)

## ��� Mejoras Futuras

- ��� Versión mobile optimizada
- ��� Gráficos y reportes de movimientos
- ��� Sistema de usuarios y roles
- ��� Autenticación y seguridad
- ☁️ Sincronización en la nube
- ��� Notificaciones de stock bajo

## ��� Licencia

Proyecto - Libre para uso personal y educativo.

---

**¿Dudas?** Revisa los formularios y valida que todos los campos requeridos estén completos. El sistema te mostrará mensajes claros de error si algo no es válido.

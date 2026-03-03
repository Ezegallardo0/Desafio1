# Mini Sistema de Stock (Inventario)

Este proyecto es un desafío básico en React para administrar un inventario de productos.

## Cómo iniciar

1. Asegúrate de tener Node.js instalado (versión 16+).
2. Desde la carpeta del proyecto (`sistema-stoc`):
   ```bash
   npm install
   npm run dev
   ```
3. Abre la URL que muestre Vite (generalmente `http://localhost:5173`).

El almacén de datos es `localStorage`, así que los productos y el historial persisten en el navegador.

## Estructura de datos

- **Producto**: `{ id, nombre, sku, stock, precio }`
- **Movimiento** (historial): `{ id, productoId, tipo: 'entrada'|'salida', cantidad, fecha }`

Los estados principales se manejan en el componente `App` y se propagan a través de props.

## Componentes

- `Home` - lista de productos con búsqueda, filtro "stock bajo" y ordenamiento.
- `CargarProductos` - formulario para dar de alta productos.
- `ProductEditForm` - editar nombre, SKU y precio.
- `DetalleProducto` - muestra datos, formulario de movimientos y historial.
- `StockMovementForm` - registrar entradas/salidas.
- `Menu` - barra de navegación con buscador y controles (filtro, orden, export/import).

## Decisiones tomadas

- Se usa React con hooks (`useState`, `useEffect`, `useRef`).
- El buscador está integrado en la barra de navegación para accesibilidad.
- El estado de filtro y orden también se mantiene en `App` y se pasa a `Home`.
- Exportar/importar JSON se realiza mediante `window.prompt` para simplificar la UI.
- Los estilos utilizan CSS clásico, con colores oscuros y acentos azules/verde.

## Pendientes / Mejoras posibles

- Refinar la UI del import/export (modal o archivo).  
- Añadir validación al editar SKU para que siga siendo único.  
- Eliminar el archivo `search.jsx` o reutilizarlo como componente separado.  
- Implementar tests unitarios.  
- Agregar filtro por precio u otros criterios.

¡Listo para entregar! Si deseas una versión desplegada, se puede publicar en Netlify/Vercel usando el mismo repositorio.


# Café Aurora — Simulador de Pedidos (Proyecto Final JavaScript)

Aplicación web que simula el circuito completo de compra de una cafetería en línea:
el usuario arma su pedido, lo revisa, lo confirma y queda registrado en un historial.

Es la evolución de las pre-entregas del curso, ahora con la carta cargada desde un
archivo JSON externo mediante `fetch`, código dividido en módulos y notificaciones con
una librería de terceros.

---

## Cómo ejecutar el proyecto

> **Importante:** la carta se carga con `fetch` desde `data/productos.json`. Por seguridad,
> los navegadores **no permiten leer archivos locales** cuando se abre el `index.html`
> haciendo doble clic (protocolo `file://`). Para que el simulador funcione, ábrelo con un
> servidor local. Cualquiera de estas opciones sirve:

**Opción A — Live Server (VS Code, la más simple)**

1. Abre la carpeta del proyecto en Visual Studio Code.
2. Instala la extensión **Live Server** (si no la tienes).
3. Clic derecho sobre `index.html` → **Open with Live Server**.

**Opción B — Servidor por línea de comandos**

```bash
# Con Python (viene preinstalado en la mayoría de los sistemas)
python3 -m http.server 8080
# Luego abre: http://localhost:8080
```

**Opción C — GitHub Pages**

Si el proyecto está publicado en GitHub Pages, se sirve por `http`, por lo que el `fetch`
funciona sin pasos adicionales.

Si abres el archivo directamente sin servidor, el simulador lo detecta y muestra un mensaje
guiándote a usar un servidor local (no se rompe la pantalla).

---

## Cómo usar el simulador

1. **Tus datos:** completa nombre y correo, o usa el botón **"Cargar datos de ejemplo"**
   para precargarlos. Elige la modalidad (en el local o para llevar) y presiona **Guardar datos**.
2. **Carta:** explora los productos. Puedes **filtrar por categoría** o **buscar por nombre**.
   Presiona **Agregar al pedido** en los que quieras.
3. **Tu pedido:** ajusta cantidades con los botones **+ / −**, elimina ítems individuales o
   vacía todo el carrito. El resumen (subtotal, recargo, descuento y total) se actualiza en vivo.
4. **Confirmar compra:** presiona **Confirmar compra**. Se pide una confirmación final;
   al aceptar, el pedido se registra, el carrito se vacía y se muestra un agradecimiento.
5. **Historial de compras:** cada pedido confirmado queda guardado y se lista al final.
   Puedes limpiarlo cuando quieras.

El estado (datos del cliente, carrito e historial) se **guarda en el navegador**
(`localStorage`), así que si recargas la página, todo se recupera.

---

## Reglas de negocio

- Recargo de **$200** si la modalidad es "para llevar".
- Descuento del **10%** sobre el subtotal cuando este alcanza o supera los **$5.000**.
- Total = subtotal + recargo − descuento.
- Montos en pesos chilenos (CLP) con formato local.

---

## Estructura del proyecto

```
simulador/
├── index.html              # Estructura HTML (sin código JavaScript)
├── css/
│   └── styles.css          # Estilos (paleta cafetería, responsive)
├── js/
│   ├── datos.js            # Constantes, acceso a datos (fetch) y persistencia
│   ├── ui.js               # Render con template strings y notificaciones (SweetAlert2)
│   └── app.js              # Estado, lógica de negocio, eventos e inicialización
├── data/
│   └── productos.json      # Base de datos simulada (catálogo)
├── assets/
│   └── img/                # Logo e íconos de categoría (SVG)
└── README.md               # Esta guía
```

---

## Tecnologías y conceptos aplicados

- **DOM y eventos:** toda la interfaz se genera dinámicamente desde JavaScript con
  *template strings*; el HTML no contiene productos ni código JS.
- **Fetch + JSON:** el catálogo se lee de `data/productos.json` de forma asíncrona.
- **Librería externa:** [SweetAlert2](https://sweetalert2.github.io/) para notificaciones,
  confirmaciones y modales (reemplaza `alert`, `confirm` y `prompt`).
- **Manejo de errores:** `try / catch / finally` en la carga de datos, con mensajes de
  estilo UX (sin exponer detalles técnicos al usuario).
- **localStorage:** persistencia de cliente, carrito e historial.
- **Sin rastros técnicos:** no se usan `prompt`, `confirm`, `alert` ni mensajes en la
  consola del navegador.

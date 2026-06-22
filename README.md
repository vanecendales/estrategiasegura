# Estrategia Segura - Case Management Dashboard

Sistema frontend para la gestión y seguimiento de casos, diseñado como una interfaz moderna y responsive para equipos de atención, seguimiento y administración.

La aplicación permite visualizar información mediante dashboards, tablas dinámicas y vistas detalladas de casos, utilizando datos simulados cargados desde archivos JSON.

## Preview

Características principales:

* Dashboard de gestión de casos.
* Vista detallada de cada caso.
* Tablas dinámicas con búsqueda, ordenamiento y paginación.
* Sidebar colapsable.
* Interfaz responsive.
* Componentes reutilizables.
* Consumo de datos desde JSON.
* Navegación entre vistas sin backend.

Adicionales:
* creacion de sumario: index.html
* Sidebar colapsado en responsive
* En la migracion de tailwind a Bootstrap algunas clases relacionadas con espacios varian ligeramente, igual que los colores pero estos ultimos si fueron importados del css de prueba para mayor identidad con la anterior version.

Adicionales:
* creacion de sumario: index.html
* Sidebar colapsado en responsive
* En la migracion de tailwind a Bootstrap algunas clases relacionadas con espacios varian ligeramente, igual que los colores pero estos ultimos si fueron importados del css de la prueba para mayor identidad con la anterior version.
---

## Tecnologías Utilizadas

* HTML5
* CSS3
* JavaScript (ES6+)
* jQuery
* Bootstrap 5.3
* JSON

---

## Estructura del Proyecto

```text
ESTRATEGIASEGURA
│
├── assets/
│   ├── css/
│   │   ├── pages/
│   │   │   ├── case-detail.css
│   │   │   ├── dashboard.css
│   │   │   ├── fpqr.css
│   │   │   └── login.css
│   │   ├── colors.css
│   │   └── style.css
│   │
│   ├── images/
│   │   └── logo.webp
│   │
│   └── js/
│       ├── pages/
│       │   ├── case-detail.js
│       │   ├── dashboard.js
│       │   └── login.js
│       ├── data.json
│       └── main.js
│
├── components/
│   ├── tabs/
│   └── sidebar.html
│
├── pages/
│   ├── case-detail.html
│   ├── dashboard.html
│   ├── fpqr.html
│   ├── login.html
│
└── README.md
└── index.html
```
---

## Fuente de Datos

La aplicación consume información desde:

```text
assets/js/.data.json
```

Este archivo funciona como una base de datos simulada para el entorno de desarrollo y contiene la información utilizada por:

* Casos
* Clientes
* Estados
* Actividades
* Historiales
* Métricas mostradas en el dashboard
* Filtros y botones expandibles funcionales

---

## Flujo de Datos

```text
.data.json
      ↓
JavaScript / jQuery
      ↓
Procesamiento de datos
      ↓
DataTables
      ↓
Dashboard y Case Detail
```

---

## Instalación

Para que las tablas dinámicas y los scripts funcionen correctamente, el proyecto debe ejecutarse desde un servidor web local.

### Visual Studio Code + Live Server

1. Instalar la extensión Live Server.
2. Abrir el proyecto en Visual Studio Code.
3. Clic derecho sobre `dashboard.html`.
4. Seleccionar **Open with Live Server**.

### Node.js

```bash
npx http-server
```

o

```bash
npx serve .
```

### Python

```bash
python -m http.server 8000
```

Abrir en el navegador:

```text
http://localhost:8000
```

---

## Ejecución

1. Iniciar un servidor local.
2. Abrir la URL generada por el servidor.
3. Acceder al Dashboard.
4. Navegar entre las diferentes vistas.
5. Explorar los datos cargados dinámicamente desde `.data.json`.

---

## Consideraciones

* Proyecto desarrollado únicamente en frontend.
* No requiere backend para su funcionamiento.
* Los datos son cargados desde archivos JSON locales.
* Abrir los archivos mediante `file:///` puede bloquear la carga de datos por políticas de seguridad del navegador (CORS).
* Se recomienda utilizar siempre un servidor local durante el desarrollo.

---

## Autor

### Vanessa Cendales
UI/UX Designer & Front-End Developer

Website:
https://vanecendales.github.io/vanecendales.io/#/

LinkedIn:
https://www.linkedin.com/in/vanessa-cendales/

# Sigillo di Gatto - Blog di Viaggi

## Descripción

Sigillo di Gatto es una plataforma dinámica de blog centrada en la narrativa de viajes y en el análisis lingüístico educativo. El proyecto combina contenido editorial con una arquitectura web mantenible para facilitar iteraciones funcionales y despliegues continuos.

La documentación técnica y el código interno están redactados en español. La interfaz de usuario y el contenido visible para el visitante se presentan en italiano.

## Tecnologías

| Tecnología  | Rol en el proyecto                 |
| ------------ | ---------------------------------- |
| Node.js      | Entorno de ejecución del servidor |
| Express      | Framework HTTP para rutas y vistas |
| EJS          | Motor de plantillas del frontend   |
| Tailwind CSS | Sistema de estilos utilitarios     |
| Docker       | Empaquetado y ejecución portable  |

## Estructura del Proyecto

```text
.
├── Dockerfile
├── Procfile
├── docker-compose.yml
├── package.json
├── server.js
├── src
│   ├── controllers
│   │   └── pages.controller.js
│   ├── routes
│   │   └── pages.routes.js
│   ├── services
│   │   └── content.service.js
│   ├── styles
│   │   └── tailwind.css
│   └── server.js
├── public
│   ├── css
│   │   └── styles.css
│   ├── js
│   │   └── interactions.js
│   └── images
│       ├── logo.png
│       ├── carlos-rodriguez.jpg
│       ├── gabriel-ocampo.jpg
│       ├── emily-villalva.jpg
│       ├── quito-streets.jpg
│       └── backpack.jpg
└── views
    ├── partials
    │   ├── header.ejs
    │   └── footer.ejs
    ├── home.ejs
    ├── about.ejs
    ├── contact.ejs
    ├── not-found.ejs
    └── server-error.ejs
```

## Ejecución Local

1. Instalar dependencias:

```bash
npm install
```

1. Ejecutar entorno de desarrollo:

```bash
npm run dev
```

1. Ejecutar en modo estándar:

```bash
npm start
```

### Consideración operativa

El registro de contactos se guarda en contacts.log. En entornos de nube con sistema de archivos efímero, se recomienda migrar esta persistencia a una base de datos o servicio externo de almacenamiento/logging.

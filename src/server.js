const express = require("express");
const path = require("path");
const enrutadorPaginas = require("./routes/pages.routes");

const aplicacion = express();
const puerto = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";
const rutaPublica = path.join(__dirname, "..", "public");
const rutaVistas = path.join(__dirname, "..", "views");

aplicacion.set("view engine", "ejs");
aplicacion.set("views", rutaVistas);

aplicacion.use(express.urlencoded({ extended: true }));
aplicacion.use(express.json());
aplicacion.use(express.static(rutaPublica));

aplicacion.use("/", enrutadorPaginas);

aplicacion.use((solicitud, respuesta) => {
  respuesta.status(404).render("not-found", {
    tituloPagina: "Pagina non trovata",
    rutaActiva: ""
  });
});

aplicacion.use((error, solicitud, respuesta, siguiente) => {
  console.error("[ERROR] Error interno del servidor:", error);

  if (respuesta.headersSent) {
    return siguiente(error);
  }

  return respuesta.status(500).render("server-error", {
    tituloPagina: "Errore interno",
    rutaActiva: ""
  });
});

aplicacion.listen(puerto, host, () => {
  const hostVisible = host === "0.0.0.0" ? "localhost" : host;
  console.log(`[SERVIDOR] Aplicacion disponible en http://${hostVisible}:${puerto}`);
});

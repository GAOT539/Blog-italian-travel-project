const express = require("express");
const {
  renderizarInicio,
  renderizarEquipo,
  renderizarContacto,
  procesarFormularioContacto
} = require("../controllers/pages.controller");

const enrutadorPaginas = express.Router();

enrutadorPaginas.get("/", renderizarInicio);
enrutadorPaginas.get("/chi-siamo", renderizarEquipo);
enrutadorPaginas.get("/contatto", renderizarContacto);
enrutadorPaginas.post("/contatto", procesarFormularioContacto);

module.exports = enrutadorPaginas;

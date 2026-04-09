const fs = require("fs");
const path = require("path");

const {
  obtenerIntegrantesEquipo,
  guardarMensajeContacto
} = require("../services/content.service");

const rutaArchivoContactos = path.join(__dirname, "..", "..", "contacts.log");

const expresionCorreoValido = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const crearValoresFormularioVacios = () => {
  return {
    nombre: "",
    correo: "",
    mensaje: ""
  };
};

const normalizarValoresFormulario = (cuerpoSolicitud = {}) => {
  return {
    nombre:
      typeof cuerpoSolicitud.nome === "string" ? cuerpoSolicitud.nome.trim() : "",
    correo:
      typeof cuerpoSolicitud.email === "string"
        ? cuerpoSolicitud.email.trim().toLowerCase()
        : "",
    mensaje:
      typeof cuerpoSolicitud.messaggio === "string"
        ? cuerpoSolicitud.messaggio.trim()
        : ""
  };
};

// Registra cada formulario en un archivo local para simular el envio por correo.
const registrarMensajeEnArchivo = (datosFormulario) => {
  const marcaTiempo = new Date().toISOString();
  const bloqueRegistro = [
    "----------------------------------------",
    `Fecha: ${marcaTiempo}`,
    `Nombre: ${datosFormulario.nombre}`,
    `Email: ${datosFormulario.correo}`,
    `Mensaje: ${datosFormulario.mensaje}`,
    ""
  ].join("\n");

  fs.appendFileSync(rutaArchivoContactos, `${bloqueRegistro}\n`, "utf8");
};

// Valida las reglas minimas de negocio antes de almacenar el formulario.
const validarDatosContacto = (datosFormulario) => {
  const erroresDetectados = [];

  if (!datosFormulario.nombre) {
    erroresDetectados.push("Falta el nombre del remitente.");
  } else if (datosFormulario.nombre.length < 2) {
    erroresDetectados.push("El nombre tiene menos de 2 caracteres.");
  }

  if (!datosFormulario.correo) {
    erroresDetectados.push("Falta el correo electronico.");
  } else if (!expresionCorreoValido.test(datosFormulario.correo)) {
    erroresDetectados.push("El correo electronico no tiene un formato valido.");
  }

  if (!datosFormulario.mensaje) {
    erroresDetectados.push("Falta el mensaje del formulario.");
  } else if (datosFormulario.mensaje.length < 15) {
    erroresDetectados.push("El mensaje tiene menos de 15 caracteres.");
  }

  return erroresDetectados;
};

const resolverEstadoContacto = (codigoEstado) => {
  if (codigoEstado === "ok") {
    return {
      tipo: "ok",
      texto: "Grazie! Il tuo messaggio e stato inviato con successo."
    };
  }

  if (codigoEstado === "errore") {
    return {
      tipo: "errore",
      texto: "Si e verificato un problema durante l invio. Riprova tra poco."
    };
  }

  return null;
};

const renderizarInicio = (solicitud, respuesta) => {
  respuesta.render("home", {
    tituloPagina: "Home",
    rutaActiva: "home"
  });
};

const renderizarEquipo = (solicitud, respuesta) => {
  const integrantes = obtenerIntegrantesEquipo();

  respuesta.render("about", {
    tituloPagina: "Chi Siamo",
    rutaActiva: "chi-siamo",
    integrantes
  });
};

const renderizarContacto = (solicitud, respuesta) => {
  const estadoEnvio = resolverEstadoContacto(solicitud.query.esito);

  respuesta.render("contact", {
    tituloPagina: "Contatto",
    rutaActiva: "contatto",
    estadoEnvio,
    valoresFormulario: crearValoresFormularioVacios()
  });
};

const procesarFormularioContacto = (solicitud, respuesta) => {
  const datosFormulario = normalizarValoresFormulario(solicitud.body);
  const erroresValidacion = validarDatosContacto(datosFormulario);

  if (erroresValidacion.length > 0) {
    console.warn(`[CONTACTO] Validacion fallida: ${erroresValidacion.join(" | ")}`);

    return respuesta.status(400).render("contact", {
      tituloPagina: "Contatto",
      rutaActiva: "contatto",
      estadoEnvio: {
        tipo: "errore",
        texto: "Controlla i dati inseriti e riprova."
      },
      valoresFormulario: datosFormulario
    });
  }

  guardarMensajeContacto({
    nombre: datosFormulario.nombre,
    correo: datosFormulario.correo,
    mensaje: datosFormulario.mensaje
  });

  try {
    registrarMensajeEnArchivo(datosFormulario);
  } catch (errorRegistro) {
    console.error("[CONTACTO] No se pudo registrar el mensaje en contacts.log:", errorRegistro);

    return respuesta.status(500).render("contact", {
      tituloPagina: "Contatto",
      rutaActiva: "contatto",
      estadoEnvio: {
        tipo: "errore",
        texto: "Si e verificato un problema durante l invio. Riprova tra poco."
      },
      valoresFormulario: datosFormulario
    });
  }

  console.log("[Simulación de Email] Mensaje recibido. Debería ser enviado a: gaot@gostorebuy.com.");
  return respuesta.redirect("/contatto?esito=ok");
};

module.exports = {
  renderizarInicio,
  renderizarEquipo,
  renderizarContacto,
  procesarFormularioContacto
};

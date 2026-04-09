const integrantesEquipo = [
  {
    id: 1,
    nombre: "RODRIGUEZ HURTADO CARLOS PATRICIO",
    rol: "Professore dell'Università Tecnica di Ambato",
    foto: "/images/carlos-rodriguez.jpg"
  },
  {
    id: 2,
    nombre: "Gabriel Alejandro Ocampo Tixi",
    rol: "Studente dell'Università Tecnica di Ambato",
    foto: "/images/gabriel-ocampo.jpg"
  },
  {
    id: 3,
    nombre: "Emily Alanis Villalva Ibarra",
    rol: "Studente dell'Università Tecnica di Ambato",
    foto: "/images/emily-villalva.jpg"
  }
];

const bandejaMensajes = [];

const obtenerIntegrantesEquipo = () => {
  return integrantesEquipo;
};

const guardarMensajeContacto = (datosMensaje) => {
  const mensajeRegistrado = {
    ...datosMensaje,
    identificador: bandejaMensajes.length + 1,
    fechaRegistro: new Date().toISOString()
  };

  bandejaMensajes.push(mensajeRegistrado);
  return mensajeRegistrado;
};

module.exports = {
  obtenerIntegrantesEquipo,
  guardarMensajeContacto
};

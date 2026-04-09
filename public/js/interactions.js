const configurarAnimacionesRevelado = () => {
  const elementosRevelables = document.querySelectorAll(".gruppo-rivelazione");

  if (!elementosRevelables.length) {
    return;
  }

  const observador = new IntersectionObserver(
    (entradas, observadorInterno) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) {
          return;
        }

        entrada.target.classList.add("visibile");
        observadorInterno.unobserve(entrada.target);
      });
    },
    {
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.2
    }
  );

  elementosRevelables.forEach((elemento) => {
    observador.observe(elemento);
  });
};

// Gestiona el estado del menu hamburguesa en vista movil.
const configurarMenuMovil = () => {
  const botonMenu = document.querySelector("[data-menu-boton]");
  const panelMenu = document.querySelector("[data-menu-panel]");

  if (!botonMenu || !panelMenu) {
    return;
  }

  const lineaSuperior = botonMenu.querySelector('[data-menu-linea="superior"]');
  const lineaMedia = botonMenu.querySelector('[data-menu-linea="media"]');
  const lineaInferior = botonMenu.querySelector('[data-menu-linea="inferior"]');
  const enlacesMenu = panelMenu.querySelectorAll("a");

  const actualizarIconoMenu = (menuAbierto) => {
    if (!lineaSuperior || !lineaMedia || !lineaInferior) {
      return;
    }

    if (menuAbierto) {
      lineaSuperior.classList.add("translate-y-[7px]", "rotate-45");
      lineaMedia.classList.add("opacity-0");
      lineaInferior.classList.add("-translate-y-[7px]", "-rotate-45");
      return;
    }

    lineaSuperior.classList.remove("translate-y-[7px]", "rotate-45");
    lineaMedia.classList.remove("opacity-0");
    lineaInferior.classList.remove("-translate-y-[7px]", "-rotate-45");
  };

  const abrirMenu = () => {
    botonMenu.setAttribute("aria-expanded", "true");
    panelMenu.classList.remove("max-h-0", "opacity-0", "pointer-events-none");
    panelMenu.classList.add("max-h-72", "opacity-100", "pointer-events-auto");
    actualizarIconoMenu(true);
  };

  const cerrarMenu = () => {
    botonMenu.setAttribute("aria-expanded", "false");
    panelMenu.classList.remove("max-h-72", "opacity-100", "pointer-events-auto");
    panelMenu.classList.add("max-h-0", "opacity-0", "pointer-events-none");
    actualizarIconoMenu(false);
  };

  botonMenu.addEventListener("click", () => {
    const menuAbierto = botonMenu.getAttribute("aria-expanded") === "true";

    if (menuAbierto) {
      cerrarMenu();
      return;
    }

    abrirMenu();
  });

  enlacesMenu.forEach((enlace) => {
    enlace.addEventListener("click", cerrarMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      cerrarMenu();
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  configurarAnimacionesRevelado();
  configurarMenuMovil();
});

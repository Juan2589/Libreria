document.addEventListener("DOMContentLoaded", () => {
  const loginSection = document.getElementById("loginSection");
  const menuSection = document.getElementById("menuSection");
  const leidosSection = document.getElementById("leidosSection");
  const bibliotecaSection = document.getElementById("bibliotecaSection");
  const porLeerSection = document.getElementById("porLeerSection");
  const comprarSection = document.getElementById("comprarSection");

  const btnLogin = document.getElementById("btnLogin");
  const btnSalir = document.getElementById("btnSalir");
  const msgError = document.getElementById("msgError");

  const btnLeidos = document.getElementById("btnLeidos");
  const btnBiblioteca = document.getElementById("btnBiblioteca");
  const btnPorLeer = document.getElementById("btnPorLeer");
  const btnComprar = document.getElementById("btnComprar");

  const listaLibros = document.getElementById("listaLibros");
  const listaLeidos = document.getElementById("listaLeidos");
  const listaPorLeer = document.getElementById("listaPorLeer");

  const tituloInput = document.getElementById("tituloInput");
  const btnAgregar = document.getElementById("btnAgregar");

  const tienda = document.getElementById("tienda");

  btnLogin.addEventListener("click", () => {
    const user = document.getElementById("user").value.trim();
    const pass = document.getElementById("pass").value.trim();

    if (user === "Juan" && pass === "Juan123") {
      loginSection.classList.add("hidden");
      menuSection.classList.remove("hidden");
      msgError.textContent = "";
    } else {
      msgError.textContent = "Usuario o contraseña incorrectos";
    }
  });

  btnLeidos.addEventListener("click", () => mostrarSeccion(leidosSection));
  btnBiblioteca.addEventListener("click", () => mostrarSeccion(bibliotecaSection));
  btnPorLeer.addEventListener("click", () => mostrarSeccion(porLeerSection));
  btnComprar.addEventListener("click", () => mostrarSeccion(comprarSection));

  function mostrarSeccion(seccion) {
    menuSection.classList.add("hidden");
    seccion.classList.remove("hidden");
  }

  document.querySelectorAll(".volver").forEach(btn => {
    btn.addEventListener("click", () => {
      [leidosSection, bibliotecaSection, porLeerSection, comprarSection].forEach(s => s.classList.add("hidden"));
      menuSection.classList.remove("hidden");
    });
  });

  btnAgregar.addEventListener("click", () => {
    const titulo = tituloInput.value.trim();
    if (titulo === "") return alert("Escribe el título del libro");

    const libro = { 
      titulo: titulo, 
      img: "Imagenes/default.jpg", 
      precio: "", 
      pdf: "Pdfs/default.pdf"
    };

    agregarLibroBiblioteca(libro);
    tituloInput.value = "";
  });

  function agregarLibroBiblioteca(libro) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${libro.img}" alt="${libro.titulo}" class="libro-img" style="cursor:pointer;">
      <h3 class="libro-titulo" style="cursor:pointer;">${libro.titulo}</h3>
      <p>${libro.precio || ""}</p>
    `;

    const abrirPDF = () => {
      if (libro.pdf) window.open(libro.pdf, "_blank");
      else alert("Este libro no tiene PDF asignado 📘");
    };
    card.querySelector(".libro-img").addEventListener("click", abrirPDF);
    card.querySelector(".libro-titulo").addEventListener("click", abrirPDF);

    const btnLeido = document.createElement("button");
    btnLeido.textContent = "✔ Leído";
    btnLeido.addEventListener("click", () => {
      agregarLibroLeido(libro);
      card.remove();
    });

    const btnPendiente = document.createElement("button");
    btnPendiente.textContent = "📖 Por leer";
    btnPendiente.addEventListener("click", () => {
      agregarLibroPorLeer(libro);
      card.remove();
    });

    card.appendChild(btnLeido);
    card.appendChild(btnPendiente);
    listaLibros.appendChild(card);
  }

  function agregarLibroLeido(libro) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${libro.img}" alt="${libro.titulo}">
      <h3>${libro.titulo}</h3>
      <p>${libro.precio || ""}</p>
    `;
    listaLeidos.appendChild(card);
  }

  function agregarLibroPorLeer(libro) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${libro.img}" alt="${libro.titulo}">
      <h3>${libro.titulo}</h3>
      <p>${libro.precio}</p>
    `;

    const btnLeido = document.createElement("button");
    btnLeido.textContent = "✔ Leído";
    btnLeido.addEventListener("click", () => {
      agregarLibroLeido(libro);
      card.remove();
    });

    card.appendChild(btnLeido);
    listaPorLeer.appendChild(card);
  }

  const librosTienda = [
    { titulo: "El Rap De Aca", precio: "$57.000", img: "Imagenes/rapdpg.jpg", pdf: "Pdf/elrap.pdf" },
    { titulo: "La Divina Comedia", precio: "$59.000", img: "Imagenes/divina.jpg", pdf: "Pdf/divinacomedia.pdf" },
    { titulo: "Tupac Shakur", precio: "$80.000", img: "Imagenes/tupac.jpg", pdf: "Pdf/Tupac.pdf" },
    { titulo: "El caballero de la armadura oxidada", precio: "$89.000", img: "Imagenes/caballero.jpg", pdf: "Pdf/Elcaballero.pdf" },
    { titulo: "Satanas", precio: "$90.000", img: "Imagenes/satanas.jpg", pdf: "Pdf/cienanos.pdf" },
    { titulo: "El Principito", precio: "$45.000", img: "Imagenes/principito.jpg", pdf: "Pdf/principito.pdf" },
    { titulo: "Cien Años de Soledad", precio: "$90.000", img: "Imagenes/cien.jpg", pdf: "Pdf/cienanos.pdf" },
    { titulo: "Don Quijote de la Mancha", precio: "$78.000", img: "Imagenes/donquijote.jpg", pdf: "Pdf/quijote.pdf" }
  ];

  const librosPorPagina = 4;
  let paginaActual = 1;

  function mostrarTienda() {
    tienda.innerHTML = "";

    const inicio = (paginaActual - 1) * librosPorPagina;
    const fin = inicio + librosPorPagina;
    const librosPagina = librosTienda.slice(inicio, fin);

    librosPagina.forEach(libro => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${libro.img}" alt="${libro.titulo}">
        <h3>${libro.titulo}</h3>
        <p>${libro.precio}</p>
      `;

      const btnComprarLibro = document.createElement("button");
      btnComprarLibro.textContent = "🛒 Comprar";
      btnComprarLibro.addEventListener("click", () => {
        const yaExiste =
          Array.from(listaPorLeer.children).some(card => card.querySelector("h3")?.textContent === libro.titulo) ||
          Array.from(listaLibros.children).some(card => card.querySelector("h3")?.textContent === libro.titulo);

        if (yaExiste) {
          alert(`El libro "${libro.titulo}" ya lo compraste, mi H 🔁`);
        } else {
          alert(`Compraste "${libro.titulo}" con éxito 🛒🔥`);
          agregarLibroPorLeer(libro);
          agregarLibroBiblioteca(libro);
        }
      });

      card.appendChild(btnComprarLibro);
      tienda.appendChild(card);
    });

    mostrarControlesPaginacion();
  }

  function mostrarControlesPaginacion() {
    const contenedorPaginas = document.createElement("div");
    contenedorPaginas.classList.add("paginacion");

    const totalPaginas = Math.ceil(librosTienda.length / librosPorPagina);

    const btnAnterior = document.createElement("button");
    btnAnterior.textContent = "⬅️ Anterior";
    btnAnterior.disabled = paginaActual === 1;
    btnAnterior.addEventListener("click", () => {
      if (paginaActual > 1) {
        paginaActual--;
        mostrarTienda();
      }
    });

    const btnSiguiente = document.createElement("button");
    btnSiguiente.textContent = "Siguiente ➡️";
    btnSiguiente.disabled = paginaActual === totalPaginas;
    btnSiguiente.addEventListener("click", () => {
      if (paginaActual < totalPaginas) {
        paginaActual++;
        mostrarTienda();
      }
    });

    contenedorPaginas.appendChild(btnAnterior);
    contenedorPaginas.appendChild(btnSiguiente);
    tienda.appendChild(contenedorPaginas);
  }

  mostrarTienda();

  btnSalir.addEventListener("click", () => {
    menuSection.classList.add("hidden");
    loginSection.classList.remove("hidden");
  });
});


const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");

btnPrev.addEventListener("click", () => {
  tienda.scrollBy({ left: -300, behavior: "smooth" });
});

btnNext.addEventListener("click", () => {
  tienda.scrollBy({ left: 300, behavior: "smooth" });
});

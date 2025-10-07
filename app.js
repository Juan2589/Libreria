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

  // --- LOGIN ---
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

  // --- MENÚ PRINCIPAL ---
  btnLeidos.addEventListener("click", () => mostrarSeccion(leidosSection));
  btnBiblioteca.addEventListener("click", () => mostrarSeccion(bibliotecaSection));
  btnPorLeer.addEventListener("click", () => mostrarSeccion(porLeerSection));
  btnComprar.addEventListener("click", () => mostrarSeccion(comprarSection));

  function mostrarSeccion(seccion) {
    menuSection.classList.add("hidden");
    seccion.classList.remove("hidden");
  }

  // --- VOLVER ---
  document.querySelectorAll(".volver").forEach(btn => {
    btn.addEventListener("click", () => {
      [leidosSection, bibliotecaSection, porLeerSection, comprarSection].forEach(s => s.classList.add("hidden"));
      menuSection.classList.remove("hidden");
    });
  });

  // --- AGREGAR LIBROS MANUALMENTE ---
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

  // --- AGREGAR A BIBLIOTECA ---
  function agregarLibroBiblioteca(libro) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${libro.img}" alt="${libro.titulo}" class="libro-img" style="cursor:pointer;">
      <h3 class="libro-titulo" style="cursor:pointer;">${libro.titulo}</h3>
      <p>${libro.precio || ""}</p>
    `;

    // 👉 Abrir el PDF al hacer clic en imagen o título
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
    btnPendiente.textContent = "⏳ Por leer";
    btnPendiente.addEventListener("click", () => {
      agregarLibroPorLeer(libro);
      card.remove();
    });

    card.appendChild(btnLeido);
    card.appendChild(btnPendiente);
    listaLibros.appendChild(card);
  }

  // --- AGREGAR A LEÍDOS ---
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

  // --- AGREGAR A POR LEER ---
  function agregarLibroPorLeer(libro) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${libro.img}" alt="${libro.titulo}">
      <h3>${libro.titulo}</h3>
      <p>${libro.precio}</p>
    `;

    const btnLeido = document.createElement("button");
    btnLeido.textContent = "✅ Leído";
    btnLeido.addEventListener("click", () => {
      agregarLibroLeido(libro);
      card.remove();
    });

    card.appendChild(btnLeido);
    listaPorLeer.appendChild(card);
  }

  // --- TIENDA ---
  const librosTienda = [
    { titulo: "El Rap De Aca", precio: "$45.000", img: "Imagenes/rapdpg.jpg", pdf: "Pdf/elrap.pdf" },
    { titulo: "La Divina Comedia", precio: "$55.000", img: "Imagenes/divina.jpg", pdf: "Pdf/divinacomedia.pdf" },
    { titulo: "Tupac Shakur", precio: "$80.000", img: "Imagenes/tupac.jpg", pdf: "Pdf/Tupac.pdf" },
    { titulo: "El caballero de la armadura oxidada", precio: "$40.000", img: "Imagenes/caballero.jpg", pdf: "Pdf/Elcaballero.pdf" }
  ];

  librosTienda.forEach(libro => {
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
      alert(`Compraste "${libro.titulo}"`);
      agregarLibroPorLeer(libro);
      agregarLibroBiblioteca(libro);
    });

    card.appendChild(btnComprarLibro);
    tienda.appendChild(card);
  });

  // --- CERRAR SESIÓN ---
  btnSalir.addEventListener("click", () => {
    menuSection.classList.add("hidden");
    loginSection.classList.remove("hidden");
  });
});

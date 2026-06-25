/* ============================================================
   SINNERS CAFÉ — app.js
   Lógica principal del sitio: fetch de productos, carrito
   con localStorage, validación de formulario y feedback visual.
   ============================================================ */


// ---- 1. VARIABLES GLOBALES ----

// Recupero el carrito de localStorage o inicio uno vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


// ---- 2. FUNCIONES UTILITARIAS ----

// Guarda el carrito en localStorage y actualiza el contador del nav
const guardarCarrito = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContador();
};

// Actualiza el número que se muestra en el ícono del carrito
const actualizarContador = () => {
  const contador = document.getElementById("cartCount");
  if (!contador) return;

  // Sumo todas las cantidades del carrito
  const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  contador.textContent = total > 0 ? total : "";
};

// Muestra un toast de feedback visual (sin usar alert nativo)
const mostrarToast = (mensaje) => {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = mensaje;
  toast.classList.add("toast--visible");

  setTimeout(() => {
    toast.classList.remove("toast--visible");
  }, 2500);
};

// Formatea un número como precio argentino: $16.000
const formatearPrecio = (numero) => {
  return "$" + numero.toLocaleString("es-AR");
};


// ---- 3. PRODUCTOS DESTACADOS — JSON local (index.html) ----

// Trae los productos del JSON local y los renderiza en el home
const cargarDestacados = async () => {
  const grid = document.getElementById("productsDestacados");
  if (!grid) return;

  try {
    const respuesta = await fetch("data/productos.json");
    const productos = await respuesta.json();

    productos.forEach((producto) => {
      const card = crearCardCafe(producto);
      grid.appendChild(card);
    });

  } catch (error) {
    console.error("Error al cargar los destacados:", error);
  }
};

// Crea una card de café (productos propios del JSON local)
const crearCardCafe = ({ id, name, notes, price, tag, tagStyle, image }) => {
  const article = document.createElement("article");
  article.classList.add("product");

  const tagClass = tagStyle === "alt" ? "product__tag product__tag--alt" : "product__tag";

  article.innerHTML = `
    <div class="product__img product__img--cafe">
      <span class="${tagClass}">${tag}</span>
      <img src="${image}" alt="${name}" />
    </div>
    <div class="product__info">
      <div>
        <div class="product__name">${name}</div>
        <div class="product__meta">${notes}</div>
      </div>
      <div class="product__price">${formatearPrecio(price)}</div>
    </div>
    <button class="product__add" data-id="${id}" data-name="${name}" data-price="${price}">
      Agregar al pedido +
    </button>
  `;

  const boton = article.querySelector(".product__add");
  boton.addEventListener("click", () => {
    agregarAlCarrito(id, name, price, image);
  });

  return article;
};


// ---- 4. PRODUCTOS API — FakeStoreAPI (productos.html) ----

// Trae los productos de la API pública y los renderiza
const cargarProductosAPI = async () => {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  try {
    // Consumo la API pública con fetch + async/await
    const respuesta = await fetch("https://fakestoreapi.com/products?limit=8");
    const productos = await respuesta.json();

    productos.forEach((producto) => {
      const card = crearCardAPI(producto);
      grid.appendChild(card);
    });

  } catch (error) {
    console.error("Error al cargar los productos:", error);
    grid.innerHTML = "<p>No se pudieron cargar los productos. Intentá recargar la página.</p>";
  }
};

// Crea una card de producto de la API
const crearCardAPI = ({ id, title, price, category, image }) => {
  const article = document.createElement("article");
  article.classList.add("product");

  article.innerHTML = `
    <div class="product__img">
      <span class="product__tag">${category}</span>
      <img src="${image}" alt="${title}" />
    </div>
    <div class="product__info">
      <div>
        <div class="product__name">${title}</div>
        <div class="product__meta">${category}</div>
      </div>
      <div class="product__price">${formatearPrecio(price)}</div>
    </div>
    <button class="product__add" data-id="${id}" data-name="${title}" data-price="${price}">
      Agregar al pedido +
    </button>
  `;

  const boton = article.querySelector(".product__add");
  boton.addEventListener("click", () => {
    agregarAlCarrito(id, title, price, image);
  });

  return article;
};


// ---- 5. LÓGICA DEL CARRITO ----

// Agrega un producto al carrito o suma cantidad si ya existe
const agregarAlCarrito = (id, name, price, image) => {
  const existente = carrito.find((item) => item.id === id);

  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ id, name, price, image, cantidad: 1 });
  }

  guardarCarrito();
  renderizarCarrito();
  mostrarToast(`${name} agregado al pedido`);
};

// Elimina un producto del carrito por su id
const eliminarDelCarrito = (id) => {
  carrito = carrito.filter((item) => item.id !== id);
  guardarCarrito();
  renderizarCarrito();
};

// Modifica la cantidad de un producto en el carrito
const modificarCantidad = (id, cambio) => {
  const item = carrito.find((item) => item.id === id);
  if (!item) return;

  item.cantidad += cambio;

  // Si llega a 0, lo elimino
  if (item.cantidad <= 0) {
    eliminarDelCarrito(id);
    return;
  }

  guardarCarrito();
  renderizarCarrito();
};

// Renderiza todos los items del carrito en la página carrito.html
const renderizarCarrito = () => {
  const contenedor = document.getElementById("cartItems");
  const footer = document.getElementById("cartFooter");
  const totalEl = document.getElementById("cartTotal");

  if (!contenedor) return;

  // Limpio el contenedor
  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    const msgVacio = document.createElement("p");
    msgVacio.classList.add("cart-page__empty");
    msgVacio.textContent = "Tu carrito está vacío.";
    contenedor.appendChild(msgVacio);

    if (footer) footer.style.display = "none";
    return;
  }

  // Muestro el footer con el total
  if (footer) footer.style.display = "block";

  // Recorro el carrito y creo cada fila
  carrito.forEach(({ id, name, price, image, cantidad }) => {
    const fila = document.createElement("div");
    fila.classList.add("cart-page__item");

    fila.innerHTML = `
      <img class="cart-page__item-img" src="${image}" alt="${name}" />
      <div class="cart-page__item-info">
        <span class="cart-page__item-name">${name}</span>
        <span class="cart-page__item-price">${formatearPrecio(price * cantidad)}</span>
      </div>
      <div class="cart-page__item-actions">
        <button class="cart-page__item-btn" aria-label="Quitar uno">−</button>
        <span class="cart-page__item-qty">${cantidad}</span>
        <button class="cart-page__item-btn" aria-label="Agregar uno">+</button>
        <button class="cart-page__item-remove" aria-label="Eliminar">✕</button>
      </div>
    `;

    // Eventos de los botones
    const botones = fila.querySelectorAll(".cart-page__item-btn");
    botones[0].addEventListener("click", () => modificarCantidad(id, -1));
    botones[1].addEventListener("click", () => modificarCantidad(id, 1));
    fila.querySelector(".cart-page__item-remove").addEventListener("click", () => eliminarDelCarrito(id));

    contenedor.appendChild(fila);
  });

  // Calculo y muestro el total
  const total = carrito.reduce((acc, item) => acc + item.price * item.cantidad, 0);
  if (totalEl) totalEl.textContent = formatearPrecio(total);
};


// ---- 6. VALIDACIÓN DEL FORMULARIO (contacto.html) ----

const inicializarFormulario = () => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Obtengo los valores de los campos
    const nombre = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("message").value.trim();

    // Limpio errores previos
    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("messageError").textContent = "";

    let formularioValido = true;

    // Valido nombre
    if (!nombre) {
      document.getElementById("nameError").textContent = "El nombre es obligatorio.";
      formularioValido = false;
    }

    // Valido email con formato
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      document.getElementById("emailError").textContent = "El email es obligatorio.";
      formularioValido = false;
    } else if (!regexEmail.test(email)) {
      document.getElementById("emailError").textContent = "El formato del email no es válido.";
      formularioValido = false;
    }

    // Valido mensaje
    if (!mensaje) {
      document.getElementById("messageError").textContent = "El mensaje es obligatorio.";
      formularioValido = false;
    }

    // Si todo esta bien, muestro feedback y limpio
    if (formularioValido) {
      const status = document.getElementById("formStatus");
      status.textContent = "¡Mensaje enviado correctamente!";
      status.style.color = "#2e7d32";
      mostrarToast("Mensaje enviado correctamente");
      form.reset();

      setTimeout(() => {
        status.textContent = "";
      }, 4000);
    }
  });
};


// ---- 7. EJECUCIÓN PRINCIPAL ----

// Cuando el DOM esté listo, ejecuto todo
document.addEventListener("DOMContentLoaded", () => {

  // Actualizo el contador del carrito en todas las páginas
  actualizarContador();

  // Cargo productos destacados en el home (JSON local)
  cargarDestacados();

  // Cargo productos de la API (productos.html)
  cargarProductosAPI();

  // Renderizo el carrito (carrito.html)
  renderizarCarrito();

  // Inicializo validación del formulario (contacto.html)
  inicializarFormulario();

  // Menú hamburguesa (mobile)
  const btnHamburger = document.getElementById("navHamburger");
  const navLinks = document.getElementById("navLinks");

  if (btnHamburger && navLinks) {
    btnHamburger.addEventListener("click", () => {
      navLinks.classList.toggle("nav__links--mobile-open");
    });
  }
});

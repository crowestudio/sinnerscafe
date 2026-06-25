# Sinners Café

Sitio web realizado para el curso de Desarrollo Web (Comisión 26125 - Matias Quinteros). Es una tienda online para una marca de cafés, molienda y granos seleccionados, inventada para poder realizar el proyecto.

El enfoque es para una marca minimalista, con un estilo sobrio y sin recargar en lo visual con muchos colores o fotografías. Esta centrada sobre la experiencia del café, la calidad y que sea una marca sencilla.

---

## Cómo está hecho

Para este proyecto no se utilizaron librerías externas, salvo las de Google Fonts para las tipografías que fueron utilizadas. Todo el sitio esta construido con código nativo:

- **HTML5:** para la estructura de las páginas.
- **CSS:** para el diseño y el uso de los Flexbox y Grids. Aplicado también para responsive y las variables de textos, colores, y jerarquías de los elementos.
- **JavaScript:** para la lógica, el funcionamiento del carrito y la carga de los datos.

---

## Páginas del sitio

- **Inicio (index.html):** Hero del sitio más productos destacados. Una sección que simula las reviews de clientes y la invitación a un newsletter.
- **Tienda (productos.html):** Es el catálogo de productos vinculados con una Api externa.
- **Carrito (carrito.html):** Espacio para mostrar los productos agregados y gestionar la compra.
- **Contacto (contacto.html):** Formulario de contacto y los datos de contacto de la empresa.

---

## Características principales

- **Carga dinámica de productos:** Se utilizan dos tipos de cargas dinámicas para los productos.
  - *Cafés destacados (Home):* Con data local (`data/productos.json`), para mostrar los inventados para el proyecto.
  - *Catálogo general:* API externa de [FakeStoreAPI](https://fakestoreapi.com/) para mostrar un stock más amplio y dinamico.
- **Carrito:** Funciona para poder agregar productos, tanto los locales como los de la API. Dentro del carrito se pueden sumar unidades del producto y borrarlos. Muestra automáticamente los cambios en los valores según las cantidades. Tambien permite mantener en memoria el contenido, por si el usuario sale de la página o la cierra.
- **Formulario de contacto:** Posee una validación para comprobar que los campos estan completos y que el mail tenga un formato correcto.
- **Alertas:** Cuando el usuario agrega productos tiene alertas para que sepa que esta sucediendo.

---

## Cómo ver el proyecto

### Online

El proyecto está publicado en GitHub Pages y se puede probar directamente en este enlace:

🔗 **https://crowestudio.github.io/sinnerscafe/pre-entrega/**

### Local

1. Clonar el repositorio: `git clone https://github.com/crowestudio/sinnerscafe.git`
2. Descargar los archivos completos a la computadora.
3. Abrir el archivo `index.html` usando un Live Server (puede ser el de VS Code). Para obtener una vista real del sitio.

> **Nota:** La computadora debe tener conexión para traer la información de la API externa (el catálogo).

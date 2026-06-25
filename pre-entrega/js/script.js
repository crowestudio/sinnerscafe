
// Comentario en una sola linea


// Esto esta mostrando el texto solo si abrimos la consola
console.log("HOLA! Si esta leyendo este mensaje es porque querias hacer algo con la consola... No se te ocurra!")


/* Las variables pueden comenzar
con una letra, guion bajo (_) o singo dolar ($)


var nombre = "Matias";
var edad = 37;

console.log (nombre + ", Edad: " + edad)

*/

// Declaración de objetos

// Objeto literal

/*
const usuario = {
    nombre: "Matias",
    edad: 38,
    esDesarrolladora: true,
    ciudad: "Buenos Aires"

}

console.log(usuario["nombre"], usuario["edad"]);


// Objetos dentro de objetos

const persona = {
    nombre: "Lucas",
    edad: 25,
    // Aca se define otro objeto, que esta dentro de persona
    direccion: {
        calle: "Av. Siempre viva",
        numero: 742
    },
    hobbies: ["Programar", "Leer", "Correr"]
};

console.log(persona.direccion.calle);
console.log(persona.hobbies[2]);
console.log(persona.edad)


// Arrays, funcioanan como las bibliotecas o listas en Phyton

const diasSemana = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];

// Se acceden por indice, tomando el primero como 0

console.log("La semana comienza en " + diasSemana[0])


/* Practica:
El prompt genera ventanas flontes


let num1 = prompt("Ingresá el primer número: ");
let num2 = prompt("Ingresá el segundo número: ");


num1 = parseFloat(num1);
num2 = parseFloat(num2);

console.log("Suma " + (num1 + num2));
console.log("Multiplica " + (num1 * num2));
console.log("División " + (num1 / num2));
console.log("Módulo " + (num1 % num2));

*/

// PRACTICA 2

/*

let $nombre = prompt("Ingresá tu nombre:");
let $edad = parseInt(prompt("Ingresá tu edad: "));

console.log(isNaN(edad));
console.log("Hola " + $nombre + "!" + " Tu edad es: " + $edad);
console.log($edad > 18);

*/

// CATALOGO


/*
const producto1 = {
    nombre: "Huila",
    precio: 16000,
    stock: 100,
}


console.log("Nombre: " + producto1["nombre"]);
console.log("Precio: " + producto1["precio"]);
console.log("Stock disponible: " + producto1["stock"])


const catalogo = [
    {nombre: "Huila" , precio: 16000 , stock: 100},
    {nombre: "Yirgacheffe" , precio: 18000 , stock: 50},
    {nombre: "Nyeri" , precio: 22000 , stock: 610},
    
]

// Muestra el array completo como table (sirve para cuando comparten estructuras iguales)
console.table(catalogo)
console.log("Producto destacado: " + catalogo[1].nombre)

*/

/* CLASE 10 -------

let $nombre_test = "Matias";
let $correo_test = "estudiocrow@gmail.com";
let $mensaje_test = "Hola! Esto es un test";

if ($nombre_test && $correo_test && $mensaje_test) {
    console.log ("Formulario completo. Listo para enviar.")
} else {
    console.log ("Faltan completar campos obligatorios.");
}

const productos = [ 'Remera', 'Pantalon', 'Gorra', 'Zapatillas', 'Campera' ]

for (const producto of productos) {console.log(producto); 
    alert("Producto disponibie: producto " + producto);
}
console.log ("Lista de productos mostrada correctamente.")

*/

/* CLASE 11 - Funciones */


/* Función tradiocional
let $largo = 5;
let $ancho = 3;

function calcularArea ($largo, $ancho) {
    return $largo * $ancho;
}

console.log (calcularArea ($largo, $ancho));
 */

/* Nueva forma, flecha 

const calcularAreas = ($largo, $ancho) => $largo * $ancho;
console.log(calcularAreas($largo, $ancho));

*/

/* La declaracion de funciones debe estar ordenada. Cuando use
funciones flecha, el contenido de las variables, debe estar definido al inicio y luego las funciones.
En cambio si son function puedo cargar todo todo junto.
Lo ideal es mantener la siguiente estructura: */

// 1. VARIABLES GLOBALES (Las que usa todo el programa)
let $largo = 3;
let $ancho = 3;

// 2. FUNCIONES (Flecha o tradicionales, todas juntas acá arriba)
const calcularArea = ($largo, $ancho) => $largo * $ancho;

const mostrarResultado = (area) => {
    console.log(`El área calculada es: ${area}`);
};

// 3. EJECUCIÓN O LÓGICA PRINCIPAL (Donde pasa la acción)
let areaFinal = calcularArea($largo, $ancho);
mostrarResultado(areaFinal);

// Scope Global = son las declaraciones que podemos usar en cualquier lugar del programa

/*
let nombre = "Pedro";
let apodo = "Pedrito";

function saludar () {
    return "Hola " + nombre +".";
}

function motivar () {
    return "Vamos que vos podes " + apodo + " :)";
}

console.log(saludar(), motivar());

*/


// Scope Local = Son las que solo existen dentro de una funcion. No sirven para utilizar en otras funciones.
// Es buena practica mantener las globales limitadas para evitar que sean afectadas sin querer

/*
function saludar (){
    let nombre_b = "Maria";
    console.log("Hola " + nombre_b);
}
saludar();
console.log(nombre_b);

*/

// Desestructuracion = Hace que el código sea más limpio, permite desempacar las propiedades de un elemento.
// Las constantes siempre van con dos puntos, ej NOMBRE: "Matias" / EDAD: 37.

const product = {
    name: "Tv smart",
    price: 250,
    stock: 30

}

function showName ({name}) {
    return "Product: " + name;
}

function showPrice ({price}) {
    return "Price: $" + price;
}

function showStock ({stock}) {
    return "Stock: " + stock;
}

console.log(showName(product), "|", showPrice(product), "|", showStock(product));


// Spread operator (...) = Permite tomar elementos de los array originales para conformar nuevos arrays sin alterar el original
/* Pensalo con esta metáfora: imaginate que tenés una caja con herramientas (un array) y querés sacar todas las herramientas sueltas de esa caja para meterlas adentro de una caja nueva más grande. Eso es exactamente lo que hacen los tres puntos. */

const cafeSuaves = ["Huila", "Nyeri"];
const cafeFuertes = ["Yirgacheffe", "Santos"];
const cafesMedios = ["Nicaragua"];

// Creo un catálogo que muestre ambos arrays. Los (...) toma el array sin alterar el original, es como "moverlo"
const catalogoFull = [...cafeSuaves, ...cafeFuertes, ...cafesMedios];

console.log("Nuestro catálogo: ", catalogoFull);

// El SPREAD también permite clonar objetos, siempre sin alterar el original, sin apuntar al mismo elemento para mantenerlo inalterable.
/* Es útil por ejemplo para mostrar variables nuevas de ese producto por un momento o tiempo limitado, como los descuentos. */

const originalProduct = {
    name: "Tv smart",
    price: 250,
    stock: 30
}

//Clono el producto

const saleProduct = {
    ...originalProduct,
    discount: true,
    price: 200,
}

function showsaleProduct (original, sale) {
    const { price: originalPrice } = original;
    const { price: salePrice } = sale;
    const discountPercentage = ((originalPrice - salePrice) / originalPrice) * 100;
    
    return `Discount: $${salePrice} (-${discountPercentage}% OFF)`;
}

console.log(showName(originalProduct), "|", showsaleProduct(originalProduct, saleProduct), "|", showStock(originalProduct));

//================================
//Ejercicio #1 - Clase 11

/*

//1. Obtengo valores
let num1 = prompt("Ingresá el primer número: ");
let num2 = prompt("Ingresá el segundo número: ");

//2. Los almaceno
num1 = parseFloat(num1);
num2 = parseFloat(num2);

//3. Valido que el 2do numero sea distinto a 0 antes de seguir
if (num2 === 0) {
    console.warn("Atención! El segundo número no puede ser 0");
    alert("Error! El segundo numero ingresado fue 0");
}
    else{

    //4. Defino funciones
    const calcularSuma = (num1, num2) => num1 + num2;
    const calcularResta = (num1, num2) => num1 - num2;
    const calcularMultiplo = (num1, num2) => num1 * num2;
    const calcularDivision = (num1, num2) => num1 / num2;

    //5. Defino mostrar los resultados y validaciones de numeros
    const mostrarResultados = ([suma, resta, multiplicacion, division]) => {
        console.log(`El total de la suma es: ${suma}`);
        console.log(`El total de la resta es: ${resta}`);
        console.log(`El total de la multiplicación es: ${multiplicacion}`);
        console.log(`El total de la división es: ${division}`);
    }

    //6. Ejecuto la lógica, guardando en un Array para mostrar todo junto
    let resultadoCalculos = [
        calcularSuma(num1, num2),
        calcularResta(num1, num2),
        calcularMultiplo(num1, num2),
        calcularDivision(num1, num2),
    ];

    //7. Muestro los resultados
    mostrarResultados(resultadoCalculos);
}

*/
//================================

// Ejercicio #2 - Clase 11


//1. Creo el catalogo, puntos 1 a 3
const generarProductos = () => {
    let productos = [
        {id: 154, name: "Huila", description: "Café colombiano con notas de Chococolate y Caramelo", price: 16000},
        {id: 155, name: "Yirgacheffe", description: "Café de Etiopía, con notas de florales y cítricos", price: 18000},
        {id: 156, name: "Nyeri AA", description: "De origen keniano es un café con notas de vino y grosellas. Sabor intenso", price: 22000},
        {id: 130, name: "Antigua", description: "Café de Guatemala, especiado y ahumado. Una edición oscura y fuerte", price: 19000},
        {id: 180, name: "Colombia", description: "Café colombiano tradicional, suave", price: 16000},
    ];
    return productos;
};

//2. Punto 4. Almaceno para crear un array que se recorra por completo
const catalogo = generarProductos();

catalogo.forEach(({id, name, price, description}) => {
    console.log(`ID: ${id}\nCafe: ${name}\nPrecio: $${price}\nDescripcion: ${description}`);
});

//3. Punto 5, creando un producto oferta
let productoOferta = {
        id: 260, name: "Brasil", description: "Café de origen brasileño. Buen sabor intenso, de color rubí", price: 10000,
}

//4. Muestro los productos sumando la oferta
const catalogoActualizado = [
    productoOferta,
    ...catalogo   
];


console.log("\n=========================================");
console.log("🔥 ¡CATÁLOGO ACTUALIZADO CON OFERTAS! 🔥");
catalogoActualizado.forEach(({id, name, price, description}) => {
    console.log(`ID: ${id} | Cafe: ${name}\nDescripcion: ${description}\nPrecio: $${price}`);
});
console.log("=========================================\n");
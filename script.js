
const track = document.querySelector('.carousel-track');
let index = 0;
const totalSlides = 3;

function moverCarrusel() {
    index++;
    track.style.transition = "transform 0.8s ease-in-out";
    track.style.transform = `translateX(-${index * 25}%)`;

    if (index === totalSlides) {
        setTimeout(() => {
            track.style.transition = "none";
            index = 0;
            track.style.transform = `translateX(0%)`;
        }, 800); 
    }
}

setInterval(moverCarrusel, 6000);

cargarCarrito();

const botones = document.querySelectorAll('.items button')

botones .forEach((boton) => {
    boton.addEventListener ("click", addToCarrito)
})

function addToCarrito (event){
    var prod = {
        id: event.target.getAttribute('data-id'),
        nombre: event.target.getAttribute('data-nombre'),
        precio: event.target.getAttribute('data-precio')
    };

    var carrito = JSON.parse(localStorage.getItem('carrito'))|| [];
    carrito.push(prod);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    cargarCarrito();
}

function cargarCarrito (){
    let carrito = JSON.parse(localStorage.getItem('carrito')) ||[];

    let contador = document.getElementById('contador-carrito');
    contador.innerText = `Carrito (${carrito.length})`;
}

const botonVaciar = document.getElementById('vaciar-carrito');

botonVaciar.addEventListener('click', vaciarTodo);

function vaciarTodo(){
    localStorage.removeItem('carrito');
    cargarCarrito();
}

const contacto = document.querySelector('form');
const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const consulta = document.getElementById('consulta');

const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

contacto.addEventListener('submit', function(event){
    event.preventDefault();
    if (nombre.value == 0 || email.value == 0 || consulta.value== 0){
        alert("¡Uno de los campos no está lleno! Por favor verificar");
        return;
    }else if (!regexEmail.test(email.value)){
        alert("Por favor ingresar un mail válido!");
    }else{
        event.target.submit();
        alert("Consulta enviada!");
    }
})

async function obtenerProducto() {
    try { 
        const respuesta = await fetch("/./productos.json");
        const productos = await respuesta.json();
        renderizarProductos(productos);
    }catch(error){
        console.error("Error cargando los productos",error);
    }
} 

function renderizarProductos(productos){
    const contenedor = document.getElementById('contenedor-productos')
    if(!contenedor) return;

    contenedor.innerHTML = "";

    productos.forEach(producto =>{
        const div = document.createElement('div')
        div.classList.add('items');
        div.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button data-id="${producto.id}" data-nombre="${producto.nombre}" data-precio="${producto.precio}">
                Agregar al carrito
            </button>
        `;
        contenedor.appendChild(div);
    });

    asignarEventosBotones();
}

function asignarEventosBotones() {
    const botones = document.querySelectorAll('.items button');
    botones.forEach((boton) => {
        // Eliminamos listeners previos para no duplicar clicks por las dudas
        boton.removeEventListener("click", addToCarrito); 
        boton.addEventListener("click", addToCarrito);
    });
}

obtenerProducto();
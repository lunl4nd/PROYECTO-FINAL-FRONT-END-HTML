const track = document.querySelector('.carousel-track');

if(track){

    let index = 0;
    const totalSlides = 3;

    function moverCarrusel(){

        index++;

        track.style.transition =
            "transform 0.8s ease-in-out";

        track.style.transform =
            `translateX(-${index * 25}%)`;

        if(index === totalSlides){

            setTimeout(() => {

                track.style.transition = "none";
                index = 0;

                track.style.transform =
                    "translateX(0%)";

            },800);
        }
    }

    setInterval(moverCarrusel,6000);
}


function cargarCarrito(){

    const carrito =
        JSON.parse(
            localStorage.getItem("carrito")
        ) || [];

    let cantidadTotal = 0;

    carrito.forEach(producto => {
        cantidadTotal += producto.cantidad;
    });

    const contador =
        document.getElementById(
            "contador-carrito"
        );

    if(contador){

        contador.innerText =
            `Carrito (${cantidadTotal})`;

    }
}

function addToCarrito(event){

    const id =
        event.target.dataset.id;

    const carrito =
        JSON.parse(
            localStorage.getItem("carrito")
        ) || [];

    const existente =
        carrito.find(
            producto => producto.id === id
        );

    if(existente){

        existente.cantidad++;

    }else{

      carrito.push({
        id:id,
        nombre:event.target.dataset.nombre,
        precio:Number(
         event.target.dataset.precio
        ),
        imagen:event.target.dataset.imagen,
        cantidad:1
    });
    }

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    cargarCarrito();
}

function asignarEventosBotones(){

    const botones =
        document.querySelectorAll(
            ".items button"
        );

    botones.forEach(boton => {

        boton.addEventListener(
            "click",
            addToCarrito
        );

    });
}

function mostrarCarrito(){

    const contenedor =
        document.getElementById(
            "productos-carrito"
        );

    if(!contenedor) return;

    const carrito =
        JSON.parse(
            localStorage.getItem("carrito")
        ) || [];

    contenedor.innerHTML = "";

    let total = 0;

    carrito.forEach(producto => {

        total +=
            producto.precio *
            producto.cantidad;

        const div =
            document.createElement("div");

        div.classList.add(
            "item-carrito"
        );

        div.innerHTML = `
              <img
        src="${producto.imagen}"
        alt="${producto.nombre}"
        class="img-carrito">

    <h3>${producto.nombre}</h3>

    <p>
        Precio: $${producto.precio}
    </p>
            <button
                onclick="sumarCantidad('${producto.id}')">
                +
            </button>

            <button
                onclick="restarCantidad('${producto.id}')">
                -
            </button>

            <button
                onclick="eliminarProducto('${producto.id}')">
                Eliminar
            </button>
        `;

        contenedor.appendChild(div);
    });

    const totalCarrito =
        document.getElementById(
            "total-carrito"
        );

    if(totalCarrito){

        totalCarrito.innerText =
            `Total: $${total}`;

    }
}

function sumarCantidad(id){

    const carrito =
        JSON.parse(
            localStorage.getItem("carrito")
        ) || [];

    const producto =
        carrito.find(
            p => p.id === id
        );

    if(producto){

        producto.cantidad++;

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );

        mostrarCarrito();
        cargarCarrito();
    }
}

function restarCantidad(id){

    const carrito =
        JSON.parse(
            localStorage.getItem("carrito")
        ) || [];

    const producto =
        carrito.find(
            p => p.id === id
        );

    if(!producto) return;

    producto.cantidad--;

    if(producto.cantidad <= 0){

        eliminarProducto(id);
        return;
    }

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    mostrarCarrito();
    cargarCarrito();
}

function eliminarProducto(id){

    const carrito =
        JSON.parse(
            localStorage.getItem("carrito")
        ) || [];

    const nuevoCarrito =
        carrito.filter(
            producto =>
                producto.id !== id
        );

    localStorage.setItem(
        "carrito",
        JSON.stringify(
            nuevoCarrito
        )
    );

    mostrarCarrito();
    cargarCarrito();
}

function vaciarTodo(){

    localStorage.removeItem(
        "carrito"
    );

    mostrarCarrito();
    cargarCarrito();
}

const botonVaciar =
    document.getElementById(
        "vaciar-carrito"
    );

if(botonVaciar){

    botonVaciar.addEventListener(
        "click",
        vaciarTodo
    );
}


const contacto =
    document.querySelector("form");

if(contacto){

    const nombre =
        document.getElementById(
            "nombre"
        );

    const email =
        document.getElementById(
            "email"
        );

    const consulta =
        document.getElementById(
            "consulta"
        );

    const regexEmail =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    contacto.addEventListener(
        "submit",
        function(event){

            event.preventDefault();

            if(
                nombre.value.trim() === "" ||
                email.value.trim() === "" ||
                consulta.value.trim() === ""
            ){

                alert(
                    "¡Uno de los campos no está lleno!"
                );

                return;
            }

            if(
                !regexEmail.test(
                    email.value
                )
            ){

                alert(
                    "Por favor ingresar un mail válido"
                );

                return;
            }

            alert(
                "Consulta enviada"
            );

            event.target.submit();
        }
    );
}

asignarEventosBotones();
cargarCarrito();
mostrarCarrito();
Para el comienzo del proyecto y para organización propia,
decidí crear todos los .html importantes, incluso si ahora
están vacíos; esto me da una idea general de cuáles 
van a ser las páginas principales.

Estas páginas son:
-index.html (la principal, con el nombre aprendido en clase)
-acercade.html 
-contacto.html
-tienda.html

Si es necesario, se crearán más páginas en la entrega final,
pero para la pre-entrega creería que estas 4 son suficientes. 

Por otro lado, hay un style.css para apartar la decoración de
las páginas de las mismas con tal de mantener el orden. Para
lo mismo hay un script.js. 

En el script.js hay algo que no se vio hasta el momento, 
procedo a explicarlo para demostrar que, si bien lo prompteé en
la IA Gemini porque no tengo conocimiento suficiente del 
lenguaje, si tengo conocimiento de la lógica que está aplicando:

 

const track = document.querySelector('.carousel-track'); 
//selecciono qué clase de css va a llamarse "track" en mi script

let index = 0;
const totalSlides = 3;
//declaro cuántas imágenes hay y un índice


function moverCarrusel()
//declaro la función para mover las imágenes
{
    index++;
//sumo +1 al index, que me va a ayudar a saber en qué imagen estoy
    track.style.transition = "transform 0.8s ease-in-out";
    track.style.transform = `translateX(-${index * 25}%)`;

//transition es para una trancisión suave, que no quede tosco. 
//transform es el movimiento hacia la izquierda que hace. translateX significa
que se mueve en el eje x, el "-" se mueve para la izquierda, {index*25%} hace
que mueva correctamente de una imagen a otra, ya que en css están en un flexbox 
con overflow hidden.

    if (index === totalSlides) {
        setTimeout(() => {
            track.style.transition = "none";
            index = 0;
            track.style.transform = `translateX(0%)`;
        }, 800); 

//en esta parte creé la ilusión de una 4ta imagen, pero simplemente es 
la primera imagen que se presenta por un lapso de tiempo diminuto mientras
resetea sus valores para luego presentar la primera imagen real.
    }
}

setInterval(moverCarrusel, 6000);

//el tiempo de intervalo entre los movimientos de imagen.

Las reseñas fueron hechas por mis amigas y por mi mamá,
quería involucrarlas de alguna manera.
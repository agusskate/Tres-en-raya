$(document).ready(function () {
    //creamos un array de 9 posiciones y que empiece vacío
    let posiciones = Array(9).fill("");
    //posicion actual
    let jugadorActual = "p1";
    //nombre de los jugadores
    let jugador1Nombre = "";
    let jugador2Nombre = "";

    //funcioón de evento para comenzar el juego, recogiendo el valor de los jugadores al pulsar el botón
    $(".start").click(function(){
        jugador1Nombre = $(".inputPlayer1").val();
        jugador2Nombre = $(".inputPlayer2").val();
        jugadorActual = jugador1Nombre !== "" ? "p1" : "p2";
    });

    //función para revisar el ganador
    function revisarGanador() {
        let combinaciones = [
            [0,1,2],[3,4,5],[6,7,8], //filas
            [0,3,6],[1,4,7],[2,5,8], //columnas
            [0,4,8],[2,4,6] //diagonales
        ];
        
        for (let i = 0; i < combinaciones.length; i++) {
            const combinacion = combinaciones[i];
            const a = combinacion[0];
            const b = combinacion[1];
            const c = combinacion[2];
    
            if (posiciones[a] === jugadorActual && posiciones[b] === jugadorActual && posiciones[c] === jugadorActual) {
                return true;
            }
        }
        return false;
    }

    //reiniciar el array y los colores de las casillas
    function reiniciarJuego() {
        posiciones = Array(9).fill("");
        $(".cuadrado").css("background-color", "");
    }
    
    const cuadrados = document.querySelectorAll(".cuadrado");

    cuadrados.forEach((cuadrado, i) => {
        cuadrado.addEventListener("click", () => {
            if (posiciones[i] === "") {
                posiciones[i] = jugadorActual;
                cuadrado.style.backgroundColor = jugadorActual === "p1" ? "rgb(77, 137, 228)" : "rgb(235, 204, 33)";
                
                if(revisarGanador()){
                    setTimeout(function(){
                        alert(`¡El ganador es ${jugadorActual === "p1" ? jugador1Nombre : jugador2Nombre}!`);
                        reiniciarJuego();
                    }, 100);
                } else {
                    jugadorActual = jugadorActual === "p1" ? "p2" : "p1";
                }
            }
        })
    });

    //reiniciar el juego pulsando el botón
    $(".boton").click(function(){
        reiniciarJuego();
    })
});
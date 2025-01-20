"use strict";

function crearRespuestas(array, correcta) {
  const listaBotones = document.getElementById("answers");

  const arrayRespuestas = [...array];

  arrayRespuestas.forEach((texto, index) => {
    //Crear elemento li
    const li = document.createElement("li");

    //Crear botón

    const boton = document.createElement("button");
    boton.textContent = texto;

    //Funcion que comparara respuestas correctas e incorrectas
    boton.addEventListener("click", () => {
      if (texto === correcta) {
        console.log("Respuesta Correcta!");
      } else {
        console.log("Respuesta Incorrecta!");
      }
    });

    //Añadimos boton al li yy despues el bloque completo a answers
    li.appendChild(boton);
    listaBotones.appendChild(li);
  });
}

crearRespuestas(
  ["Respuesta 1", "Respuesta 2", "Respuesta 3", "Respuesta 4"],
  "Respuesta 2"
);

// function isRespuestaCorrecta(texto, correcta) {

// }

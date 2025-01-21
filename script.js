"use strict";

let contadorPaginas = 0;
let datosGeneral = [];

function refrescarPagina(pregunta, respuestas, correcta) {
  const questionSection = document.getElementById("question-section");
  //Limpiamos contenido
  questionSection.innerHTML = `<h2 id="question"></h2>
        <ul id="answers"> </ul>`;

  const listaBotones = document.getElementById("answers");
  const question = document.getElementById("question");

  //cambio texto pregunta
  question.textContent = pregunta;

  for (const respuesta of respuestas) {
    const li = document.createElement("li");

    //Crear botónes respuestas
    const boton = document.createElement("button");
    boton.textContent = respuesta;
    //Funcion que comparara respuestas correctas e incorrectas
    boton.addEventListener("click", () => {
      if (respuesta === correcta) {
        console.log("Respuesta Correcta!");
      } else {
        console.log("Respuesta Incorrecta!");
      }
    });

    //Añadimos boton al li yy despues el bloque completo a answers
    li.appendChild(boton);
    listaBotones.appendChild(li);
  }

  //Crear boton next
  const botonNext = document.createElement("button");
  botonNext.textContent = "siguente";
  botonNext.addEventListener("click", () => {
    contadorPaginas++;
    recorrerDatos(datosGeneral, contadorPaginas);
  });
  question.appendChild(botonNext);
}

let resultado = 0;

function cargarDatos() {
  fetch("quiz.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error al cargar el archivo: ${response.status}`);
      }
      return response.json(); // Convierte la respuesta en JSON
    })
    .then((datos) => {
      datosGeneral = [...datos];
      recorrerDatos(datos, contadorPaginas);
      //console.log(datos);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function recorrerDatos(datos, pagina) {
  //let arrayTotal =  [];
  //for (const clave in datos) {
  let data = datos[pagina];
  let pregunta = data.question;
  let respuestas = [...data.answers];

  let respuestaCorrecta = data.correct;
  refrescarPagina(pregunta, respuestas, respuestaCorrecta);
  //console.log(respuestas);
  //}
}

cargarDatos();

function comprobarRespuesta(respuestaCorrecta) {
  let opcionSeleccionada;
  if (respuestaCorrecta === opcionSeleccionada) {
    console.log("Correcto");
    resultado++;
  }
}

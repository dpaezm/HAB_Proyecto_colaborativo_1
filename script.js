"use strict";

let result = 0;
let index = 0;
let questions = [];
const barra1 = document.querySelector(".progress");
let resultadoFinal = document.getElementById("resultado");
const listaBotones = document.querySelector(".answers");
const pregunta = document.getElementById("question");
const barra = document.querySelector(".progress-bar");

import { frasesFinales } from "./helpers.js";

let frases = frasesFinales;

function loadData() {
  fetch("quiz.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error al cargar el archivo: ${response.status}`);
      }
      return response.json();
    })
    .then((datos) => {
      questions = datos;
      showQuestion();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function showQuestion() {
  if (index < questions.length) {
    const listaBotones = document.querySelector(".answers");
    const pregunta = document.getElementById("question");

    let questionData = questions[index];

    pregunta.textContent = questionData.question;

    listaBotones.innerHTML = "";

    questionData.answers.forEach((answer) => {
      const li = document.createElement("li");
      const boton = document.createElement("button");

      boton.textContent = answer;

      li.appendChild(boton);
      listaBotones.appendChild(li);

      boton.addEventListener("click", () => {
        const botones = listaBotones.querySelectorAll("button");
        boton.classList.add("seleccionado");

        botones.forEach((boton) => {
          boton.disabled = true;
        });
        checkAnswer(answer, questionData.correct);
      });

      boton.addEventListener("mouseenter", () => {
        boton.style.backgroundColor = "#c1b7ff";
      });
      boton.addEventListener("mouseleave", () => {
        boton.style.backgroundColor = "white";
      });
    });

    index++;
  } else {
    finalResult();
  }
}

function checkAnswer(answer, correct) {
  if (answer === correct) {
    console.log("Respuesta Correcta!");
    result++;
    updateProgressBar();
  } else {
    console.log("Respuesta Incorrecta!");
    updateProgressBar();
  }
  setTimeout(() => {
    showQuestion();
  }, 500);
}

function updateProgressBar() {
  let parte = 100 / questions.length;
  let width = index * parte + "%";

  barra.style.width = width;
  barra.textContent = width;
  console.log(barra);
}

function finalResult() {
  const seccionPreguntas = document.querySelector("section.question-section");
  const seccionFinJuego = document.querySelector("#section-FinJuego");

  const fraseFinal = document.querySelector("#frase-resultado");

  resultadoFinal.textContent = `You scored ${result} off ${questions.length}`;

  fraseFinal.textContent = obtenerFraseFinal();

  seccionFinJuego.style.opacity = 1;
  seccionFinJuego.style.zIndex = 2;
  seccionPreguntas.style.opacity = 1;
  seccionPreguntas.style.zIndex = -2;

  pregunta.style.opacity = 0;
  listaBotones.style.opacity = 0;
  barra.style.opacity = 0;
  barra1.style.opacity = 0;

  playAgain();
}

function obtenerFraseFinal() {
  const numeroRandom = Math.floor(Math.random() * 4);

  if (result < 13) {
    return `${frases.veryBad[numeroRandom]}`;
  } else if (result > 12 && result < 25) {
    return `${frases.bad[numeroRandom]}`;
  } else if (result > 24 && result < 38) {
    return `${frases.good[numeroRandom]}`;
  } else {
    return `${frases.veryGood[numeroRandom]}`;
  }
}

function playAgain() {
  const playAgainButton = document.getElementById("juego-nuevo");
  playAgainButton.addEventListener("click", () => {
    setTimeout(() => {
      location.reload();
    }, 500);
  });
}

loadData();

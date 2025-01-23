"use strict";

let result = 0;
let index = 0;
let questions = [];
const barra1 = document.querySelector(".progress");
let resultadoFinal = document.getElementById("resultado");
const listaBotones = document.querySelector(".answers");
const pregunta = document.getElementById("question");
const barra = document.querySelector(".progress-bar");

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

  resultadoFinal.textContent = `You scored ${result} off ${questions.length}`;

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

function playAgain() {
  const playAgainButton = document.getElementById("juego-nuevo");
  playAgainButton.addEventListener("click", () => {
    setTimeout(() => {
      location.reload();
    }, 500);
  });
}

loadData();

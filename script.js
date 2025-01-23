"use strict";

let result = 0;
let index = 0;
let questions = [];
const barra1 = document.querySelector(".progress");
let puntuacionId = document.getElementById("contador");

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
  const listaBotones = document.querySelector(".answers");
  const pregunta = document.getElementById("question");

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
    pregunta.textContent = "";
    listaBotones.innerHTML = "";

    contador.textContent = `Has obtenido una puntuación de ${result} sobre ${questions.length}`;
  }
}

function checkAnswer(answer, correct) {
  if (answer === correct) {
    console.log("Respuesta Correcta!");
    result++;
    showCurrentResult();
  } else {
    console.log("Respuesta Incorrecta!");
    showCurrentResult();
  }
  setTimeout(() => {
    showQuestion();
  }, 500);
}

function showCurrentResult() {
  const barra = document.querySelector(".progress-bar");
  let parte = 100 / questions.length;
  let width = index * parte + "%";
  barra.style.width = width;

  barra.textContent = width;
}

loadData();

//Para el modo dia - noche

const botonModoDia = document.getElementById("boton-modo-dia");
const textModoDia = document.getElementById("text-modo-dia");
const html = document.documentElement;

botonModoDia.addEventListener("click", () => {
  html.classList.toggle("dark");
  if (html.classList.contains("dark")) {
    textModoDia.textContent = "NIGHT MODE";
  } else {
    textModoDia.textContent = "DAY MODE";
  }
});

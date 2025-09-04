// Clase Question con métodos
class Question {
    constructor(question, options, userAnswer = null) {
        this.question = question;
        this.options = options;
        this.userAnswer = userAnswer;
    }

    mostrarPregunta() {
        return `${this.question}\n` + this.options.map((opt, i) => `${i + 1}) ${opt}`).join("\n");
    }

    responder(opcion) {
        if (opcion >= 1 && opcion <= this.options.length) {
            this.userAnswer = opcion;
            return true;
        }
        return false;
    }

    mostrarRespuesta() {
        if (this.userAnswer === null) {
            return `"${this.question}" aún no ha sido respondida.`;
        }
        return `"${this.question}" → Respuesta: ${this.options[this.userAnswer - 1]}`;
    }
}

// Clase Quiz con métodos
class Quiz {
    constructor(questions = []) {
        this.questions = questions;
    }

    agregarPregunta(pregunta) {
        this.questions.push(pregunta);
    }

    tienePreguntas() {
        return this.questions.length > 0;
    }

    todasRespondidas() {
        return this.questions.every(q => q.userAnswer !== null);
    }

    mostrarResultados() {
        return this.questions.map(q => q.mostrarRespuesta()).join("\n");
    }
}

// Instancia principal
const encuestaActual = new Quiz([]);

// Menú principal
let salir = false;
while (!salir) {
    const menu = [
        "1) Crear nueva encuesta",
        "2) Votar en encuesta",
        "3) Ver resultados de una encuesta",
        "4) Salir"
    ].join("\n");

    let opcion = prompt("Ingresa el número de la opción del menú\n\n" + menu);
    if (opcion === null) break;
    opcion = +opcion;

    switch (opcion) {
        case 1:
            let numSurvey;
            do {
                numSurvey = Number(prompt("¿Cuántas preguntas deseas crear? Ingresa un número"));
                if (numSurvey < 8) {
                    console.log("La cantidad mínima de preguntas es 8");
                }
            } while (numSurvey < 8);

            let numOptions;
            do {
                numOptions = Number(prompt("¿Cuántas opciones deseas agregar a cada pregunta? Ingresa un número"));
                if (numOptions < 2) {
                    console.log("La cantidad mínima de opciones es 2");
                }
            } while (numOptions < 2);

            for (let q = 1; q <= numSurvey; q++) {
                let questionText = prompt(`Ingresa la pregunta ${q}`);
                let options = [];

                for (let o = 1; o <= numOptions; o++) {
                    let optionText = prompt(`Ingresa la opción ${o} para la pregunta "${questionText}"`);
                    options.push(optionText);
                }

                const nuevaPregunta = new Question(questionText, options);
                encuestaActual.agregarPregunta(nuevaPregunta);
                console.log(`Pregunta agregada: "${questionText}" con opciones: ${options.join(", ")}`);
            }
            break;

        case 2:
            if (!encuestaActual.tienePreguntas()) {
                console.log("No has creado las preguntas para votar");
                break;
            }

            encuestaActual.questions.forEach((pregunta, index) => {
                let respuesta;
                do {
                    respuesta = prompt(`Pregunta ${index + 1}:\n${pregunta.mostrarPregunta()}`);
                    if (respuesta === null) return;
                    respuesta = +respuesta;
                } while (!pregunta.responder(respuesta));
            });
            break;

        case 3:
            if (!encuestaActual.tienePreguntas()) {
                console.log("No has creado las preguntas para votar");
                break;
            }

            console.log(encuestaActual.mostrarResultados());
            break;

        case 4:
            console.log("Elegiste salir. ¡Hasta luego!");
            salir = true;
            break;

        default:
            console.log("Elige una opción válida");
    }
}

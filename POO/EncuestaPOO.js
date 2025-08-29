// declaracion de constantes
const numSurvey = 2; // cantidad de preguntas de las encuesta
const numOptions = 3; // cantidad de opciones para cada encuesta

// creacion de clase y objeto
class Question {
    constructor(question, options, userAnswer) {
        this.question = question;
        this.options = options;
        this.userAnswer = userAnswer;
    }
}

class Quiz {
    constructor(questions) {
        this.questions = questions;
    }
}

const encuestaActual = new Quiz([]);

// Inicio de ciclo para que usuario use las opciones del menu
let salir = false;
while (!salir){
    const menu = [
        "1) Crear nueva encuesta",
        "2) Votar en encuesta",
        "3) Ver resultados de una encuesta",
        "4) Salir"
    ].join("\n");

    // Muestra recuadro solicitando al usuario que ingrese una de las opciones disponibles.
    let input = prompt("Ingresa el numero de la opcion del Menu\n\n" + menu);

    // valida si el usuario presiona boton cancelar y termina el ciclo en caso de hacer clic
    if (input === null) {
        console.log("Operación cancelada por el usuario.");
        break;
    }

    //convertir la opcion ingresada a numero
    let opcion = Number(input);

    // validar que la opcion cumple son los parametros indicados
    if (isNaN(opcion) || opcion < 1 || opcion > 4){
        console.log("Ingresa una opcion valida");
    };

    // control de opciones del menu
    switch (opcion){
        // case 1:
        //     console.log("elegiste 1");
        //     // datos a usar id, question, options, userAnswer(vacia)
        //     for (let q = 1; q <= numSurvey; q++){
        //         let question = prompt(`Ingresa la pregunta ${q}`);
        //         console.log(`Ingresaste la pregunta ${q}`);
        //         for (let o = 1; o <= numOptions; o++){
        //             let options = prompt(`Ingresa la opcion ${o}`)
        //             console.log("ingresaste la opcion " + o)
        //         }
        //     }
        //     break;
        case 1:
            console.log("Elegiste crear una nueva encuesta");
            for (let q = 1; q <= numSurvey; q++) {
            let questionText = prompt(`Ingresa la pregunta ${q}`);

            let options = [];
            for (let o = 1; o <= numOptions; o++) {
            let optionText = prompt(`Ingresa la opción ${o} para la pregunta "${questionText}"`);
            options.push(optionText);
            }

            const nuevaPregunta = new Question(questionText, options, null);
            encuestaActual.questions.push(nuevaPregunta);

            console.log(`Pregunta agregada: "${questionText}" con opciones: ${options.join(", ")}`);
            }
            break;
        case 2:
            console.log("elegiste 2");
            //2. Votar las encuestas creadas
            //2.1 - Validar que existan encuestas creadas
            //2.2 - Recorrer e imprimir question con options, permitir que el usuario responda ingresando el numero de la opcion y guardarla en useAnswer
            break;
        case 3:
            console.log("elegiste 3");
            //3. Ver resultados de la votacion
            //3.1 Validar que se hayan respondiendo encuentas antes de mostrar resultado
            //3.2 Mostrar question y userAnswer
            break;
        case 4:
            // opcion salir del menu
            console.log("Elegiste salir. ¡Hasta luego!");
            salir = true;
            break;
        }
}


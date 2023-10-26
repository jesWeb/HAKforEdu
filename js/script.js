document.addEventListener("DOMContentLoaded", function() {

    // Elementos del DOM
    const chatbox = document.querySelector('.chatbox');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');

    let storedMessages = [];
    const preguntas = [
        "¿Qué te gustaría aprender hoy?",
        "¿De qué crees que estamos hablando hoy en clase?",
        "¿Te recuerda esto a algo que ya sepas?",
        "¿Hubo algo de lo que hablamos que te pareció difícil?",
        "¿Hay algo más que quisieras saber sobre lo que aprendimos hoy?",
        "¿Dónde crees que podrías usar lo que aprendiste hoy en tu día a día?",
        "¿Hay algo que no entiendas de lo que vimos hoy?",
        "¿Y si pensamos en esto de una manera diferente, qué crees que cambiaría?",
        "¿Te recuerda esto a algo más que hayas aprendido antes?",
        "¿Qué crees que podrías practicar para entender mejor esto?",
        "¿Hay algún libro o juego que te ayude a entender esto mejor?",
        "¿Cómo crees que lo que aprendiste hoy te ayudará en el futuro?",
        "¿Cómo le explicarías a un amigo lo que aprendiste hoy?",
        "¿Qué actividad o juego te gustaría hacer para aprender más sobre esto?",
        "¿Puedes decirme tres palabras que te gustaría que busque?",
        "¿Me cuentas en una oración lo que ya sabes sobre eso?",
        "¿Cómo usarías lo que descubras?",
        "¿Qué más crees que podríamos aprender sobre esto?",
        "¿Para qué quieres saber más sobre este tema?",
    ];

    let respuestas = [];
    let preguntaActual = 0;

    async function askOpenAI(question) {
        const response = await fetch('http://localhost:3000/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: question,
            }),
        });
        return response.json();
    }

    function addMessage(content, isUser = false) {
        const messageType = isUser ? 'user' : 'bot';
        storedMessages.push({
            content: content,
            type: messageType
        });
    }

    function generarRecomendaciones() {
        if (respuestas[3]) {
            return "Parece que tuviste problemas con este tema. Te sugiero revisar estos recursos adicionales...\n";
        }
        return "";
    }

    function showInNewWindow() {
        const newWindow = window.open('', '_blank');
        let content = '<html><head><title>Chat Resumen</title></head><body>';

        storedMessages.forEach(message => {
            content += `<div class="${message.type}-message">${message.content}</div>`;
        });

        content += '</body></html>';
        newWindow.document.write(content);
    }

    sendButton.addEventListener('click', async () => {
        const userAnswer = userInput.value.trim();

        if (!userAnswer) return;

        addMessage(userAnswer, true);
        respuestas.push(userAnswer);

        preguntaActual++;

        if (preguntaActual < preguntas.length) {
            addMessage(preguntas[preguntaActual]);
        } else {
            const recomendacionesBase = generarRecomendaciones();
            const { answer: recomendacionesAmpliadas } = await askOpenAI(recomendacionesBase);
            addMessage(recomendacionesAmpliadas);
            showInNewWindow();
        }

        userInput.value = '';
    });

    addMessage(preguntas[preguntaActual]);

});

 //key de gpt
 const API_KEY = "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";
 // //esto se basara en una funcion asincrona 
 async function GPTview(prompt) {

     //respuesta asincrona 
     const resp = await fetch('https://api.openai.com/v1/chat/completions', {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
             'Authorization': 'Bearer ' + API_KEY
         },
         body: JSON.stringify({
             model: 'gpt-3.5-turbo',
             //es la zona de preguntas  usamos el prompt para centear 
             messages: [{
                 "role": "user",
                 "content": prompt
             }],
             //max_tokens  esto nos da el numero de lineas que va asalir                 
             max_tokens: 100,
         })
     });
     return await resp.json();
 }

 //eventos js 
 const prompt = document.querySelector('#promt')
 const sendButton = document.querySelector('#sendButton')
 const output = document.querySelector('#output')
//evento de botton 
 sendButton.addEventListener('click', async () => {
     //si esta cetiada 
     if (!prompt.value) return

     const response = await GPTview(prompt.value)
     output.innerHTML = response.choices[0].message .content
 })
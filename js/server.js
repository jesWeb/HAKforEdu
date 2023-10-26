const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const OPENAI_API_URL = 'https://api.openai.com/v1/engines/davinci/completions';
const OPENAI_API_KEY = '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';

app.post('/ask', async (req, res) => {
    const { prompt } = req.body;
    const payload = {
        prompt: prompt,
        max_tokens: 350 // puedes ajustar esto según tus necesidades
    };

    try {
        const response = await axios.post(OPENAI_API_URL, payload, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const data = response.data;
        res.json({ answer: data.choices[0].text.trim() });
    } catch (error) {
        res.status(500).json({ error: "Error al comunicarse con OpenAI." });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

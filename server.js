// server.js (ES Module version)
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/generate', async (req, res) => {
  const prompt = req.body.prompt;

  const response = await fetch('https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ inputs: prompt })
  });

  const buffer = await response.arrayBuffer();
  const base64 = Buffer.from(buffer).toString('base64');
  const image_url = `data:image/png;base64,${base64}`;

  res.json({ image_url });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

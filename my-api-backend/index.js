const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Allow frontend to access backend (CORS)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // allow all for now
  next();
});

app.get('/weather', async (req, res) => {
  const { city } = req.query;

  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        units: 'metric',
        appid: process.env.API_KEY
      }
    });

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:` + PORT);
});

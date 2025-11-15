const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

app.use(cors());

app.get('/weather', async (req, res) => {
  const { city } = req.query;

  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        units: 'metric',
        appid: API_KEY
      }
    });

    res.json(response.data);

  } catch (err) {
    if (err.response) {
      res.status(err.response.status).json(err.response.data);  
    } else {
      res.status(500).json({ error: 'Server error' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});

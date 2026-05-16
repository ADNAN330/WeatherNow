import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, ".//public")));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});


app.get("/weather", async (req, res) => {
  try {
    const city = req.query.city;

    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: city,
          appid: process.env.OPENWEATHER_API_KEY,
          units: "metric",
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch weather" });
  }
});

app.listen(3000, () => {
  console.log("Running on http://localhost:3000");
});
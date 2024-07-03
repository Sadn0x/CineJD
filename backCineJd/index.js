const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());

const BASE_URL = 'https://api-content.ingresso.com';

app.get('/api/movies', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/v0/carousel/36/partnership/home`, {
      params: { carousels: 'em-cartaz' }
    });
    res.json(response.data[0].events);
  } catch (error) {
    console.error('Erro ao buscar os filmes:', error);
    res.status(500).send('Erro ao buscar os filmes');
  }
});

app.get('/api/movies/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}/v0/events/${id}/partnership/home`);
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao buscar os detalhes do filme:', error);
    res.status(500).send('Erro ao buscar os detalhes do filme');
  }
});

app.get('/api/sessions', async (req, res) => {
  const { movieId, date } = req.query;
  try {
    const response = await axios.get(`${BASE_URL}/v0/sessions/city/36/event/${movieId}/partnership/home/groupBy/sessionType`, {
      params: { date }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao buscar as sessões:', error);
    res.status(500).send('Erro ao buscar as sessões');
  }
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});

import axios from 'axios';

const fetchNowPlaying = async () => {
  try {
    const response = await axios.get('https://api-content.ingresso.com/v0/templates/nowplaying/37');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar os filmes em cartaz:', error);
  }
};

export default fetchNowPlaying;

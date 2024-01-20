// webservice/index.js
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());
console.log('In Index')

app.get('/search-movies', async (req, res) => {
  console.log('got to here')
  
  const { title } = req.query;

  try {
    const tmdbResponse = await axios.get(
      `https://api.themoviedb.org/3/search/movie?include_adult=false&api_key=40966c3be15d8afb4a5a9af9565b9314&query=${title}`
    );

    const filteredResults = tmdbResponse.data.results.slice(0, 10).map(movie => ({
      id: movie.id,
      title: movie.title,
      imageurl:'https://image.tmdb.org/t/p/w500/'.concat(movie.poster_image_url),
      pop:movie.popularity_summary
    }));

    res.json(filteredResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'server error in index.js' });
  }
});

module.exports = {
  path: '/webservice',
  handler: app,
};

<!-- pages/search-results.vue -->
<template>
  <div>
    <h1>Search Results</h1>
    
    <div v-if="loading">
      Loading...
    </div>

    <div v-else>
      <p>Displaying results for: {{ title }}</p>

      <ul>
        <li v-for="movie in movies" :key="movie.id">
          <a>Title: {{ movie.title }}</a> <br>
          <img :src="movie.url">
          <a>Popularity Rating: {{movie.pop}}</a>
        </li>
      </ul>
      <a>{{error}}</a>
    </div>
  </div>
</template>

<script>
export default {
    data() {
    return {
      title: '',
      movies: [{title:"TESTtitle",
                pop:"score"},
                {title:"TESTtitle2",
                pop:"score2"},],
      loading: true,
      error:''
    };
  },

  created() {
    
    // Retrieve the movie title from the query parameters
    this.title = this.$route.query.title;

    try{
    // Make an API request to your backend with the search query
    const response = this.$axios.get("/webservice/search-movies?title=${this.title}");

    // Update the movies and set loading to false
    this.movies = response.data;
    this.loading = false;
    this.error = "none"
    }
    catch (error) {
      console.error('Error fetching search results:', error);
      console.log("Error Thrown Accessing AP")
      this.error = "API Call didn't work"
      this.loading = false;
    }
  },
};
</script>

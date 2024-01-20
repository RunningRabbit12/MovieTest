<!-- components/MovieSearch.vue -->
<template>
  <div>
    <input v-model="searchInput" placeholder="Enter movie title">
    <nuxt-link :to="{ path: '/search-results', query: { title: searchInput } }">
      <button @click="searchMovies">Search</button>
    </nuxt-link>
    <div v-if="results.length > 0">
      <div v-for="movie in results" :key="movie.id">
        <h3>{{ movie.title }} ({{ movie.release_date }})</h3>
        <p>{{ movie.overview }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchInput: '',
      results: [],
    };
  },
  methods: {
    async searchMovies() {
      try {
        const response = await this.$axios.get(`/api/search-movies?title=${this.searchInput}`);
        this.results = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>


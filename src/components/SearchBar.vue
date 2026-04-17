<template>
  <form class="search-form panel panel--strong" @submit.prevent="submitSearch">
    <div class="search-copy">
      <h2 class="panel-title">Search by location</h2>
      <p class="panel-subtitle">Search any city, then save it to your quick-access list.</p>
    </div>

    <div class="search-controls">
      <label class="sr-only" for="city-search">Search city</label>
      <input
        id="city-search"
        v-model="city"
        type="text"
        placeholder="Search city, state, or country"
        autocomplete="off"
      >
      <button type="submit" :disabled="loading">{{ loading ? 'Loading...' : 'Search' }}</button>
    </div>

    <p v-if="error" class="error-text" role="alert">{{ error }}</p>
  </form>
</template>

<script>
import { useWeatherStore } from '../store/weatherStore'

export default {
  name: 'SearchBar',
  data() {
    return {
      city: ''
    }
  },
  computed: {
    loading() {
      return useWeatherStore().state.loading
    },
    error() {
      return useWeatherStore().state.error
    }
  },
  methods: {
    async submitSearch() {
      const { searchWeather } = useWeatherStore()
      await searchWeather(this.city, 5)
    }
  }
}
</script>

<style scoped>
.search-form {
  padding: 1.25rem;
}

.search-copy {
  margin-bottom: 1rem;
}

.search-controls {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

input {
  flex: 1;
  min-width: 240px;
  padding: 0.95rem 1rem;
  border-radius: 14px;
  border: 1px solid rgba(21, 32, 51, 0.15);
}

button {
  border: 0;
  border-radius: 14px;
  padding: 0.95rem 1.2rem;
  background: var(--accent);
  color: white;
  font-weight: 700;
  cursor: pointer;
}

button:disabled {
  opacity: 0.7;
  cursor: wait;
}

.error-text {
  margin: 0.85rem 0 0;
  color: #b42318;
  font-weight: 700;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>

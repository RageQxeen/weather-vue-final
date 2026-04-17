<template>
  <div class="section-stack">
    <SearchBar />

    <div class="two-column-grid">
      <CurrentWeather />
      <SavedLocations />
    </div>

    <HourlyChart />
    <HourlyList />
  </div>
</template>

<script>
import SearchBar from '../components/SearchBar.vue'
import CurrentWeather from '../components/CurrentWeather.vue'
import SavedLocations from '../components/SavedLocations.vue'
import HourlyChart from '../components/HourlyChart.vue'
import HourlyList from '../components/HourlyList.vue'
import { useWeatherStore } from '../store/weatherStore'

export default {
  name: 'HourlyView',
  components: {
    SearchBar,
    CurrentWeather,
    SavedLocations,
    HourlyChart,
    HourlyList
  },
  async mounted() {
    const { state, searchWeather } = useWeatherStore()
    if (!state.weather && !state.loading) {
      await searchWeather(state.city || 'Goldsboro', 5)
    }
  }
}
</script>

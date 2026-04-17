<template>
  <div class="section-stack">
    <SearchBar />

    <div class="two-column-grid">
      <CurrentWeather />
      <SavedLocations />
    </div>

    <ForecastTable />
    <DailyChart />
  </div>
</template>

<script>
import SearchBar from '../components/SearchBar.vue'
import CurrentWeather from '../components/CurrentWeather.vue'
import SavedLocations from '../components/SavedLocations.vue'
import ForecastTable from '../components/ForecastTable.vue'
import DailyChart from '../components/DailyChart.vue'
import { useWeatherStore } from '../store/weatherStore'

export default {
  name: 'ForecastView',
  components: {
    SearchBar,
    CurrentWeather,
    SavedLocations,
    ForecastTable,
    DailyChart
  },
  async mounted() {
    const { state, searchWeather } = useWeatherStore()
    if (!state.weather && !state.loading) {
      await searchWeather(state.city || 'Goldsboro', 5)
    }
  }
}
</script>

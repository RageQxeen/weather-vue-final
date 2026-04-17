<template>
  <section class="panel forecast-table-panel">
    <div>
      <h2 class="panel-title">5 day forecast table</h2>
      <p class="panel-subtitle">Weather conditions and high/low temperatures for the selected location.</p>
    </div>

    <div v-if="forecastDays.length" class="forecast-table-wrap">
      <table>
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Condition</th>
            <th scope="col">High</th>
            <th scope="col">Low</th>
            <th scope="col">Rain</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="day in forecastDays" :key="day.date">
            <td>{{ formatDate(day.date) }}</td>
            <td>{{ day.day.condition.text }}</td>
            <td>{{ Math.round(day.day.maxtemp_f) }}°F</td>
            <td>{{ Math.round(day.day.mintemp_f) }}°F</td>
            <td>{{ day.day.totalprecip_in.toFixed(2) }} in</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-else class="panel-subtitle">Forecast table will appear here after you search.</p>
  </section>
</template>

<script>
import { useWeatherStore } from '../store/weatherStore'

export default {
  name: 'ForecastTable',
  computed: {
    forecastDays() {
      return useWeatherStore().state.weather?.forecast?.forecastday || []
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      })
    }
  }
}
</script>

<style scoped>
.forecast-table-panel {
  padding: 1.25rem;
}

.forecast-table-wrap {
  overflow-x: auto;
  margin-top: 1rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 0.9rem;
  border-bottom: 1px solid rgba(21, 32, 51, 0.1);
  text-align: left;
}

th {
  background: rgba(109, 74, 255, 0.08);
}
</style>

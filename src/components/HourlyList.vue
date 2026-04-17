<template>
  <section class="panel hourly-list-panel">
    <div>
      <h2 class="panel-title">Hourly details</h2>
      <p class="panel-subtitle">Current day temperatures and rain values by hour.</p>
    </div>

    <div v-if="hourlyHours.length" class="hourly-table-wrap">
      <table>
        <thead>
          <tr>
            <th scope="col">Time</th>
            <th scope="col">Condition</th>
            <th scope="col">Temp</th>
            <th scope="col">Rain</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="hour in hourlyHours" :key="hour.time">
            <td>{{ formatTime(hour.time) }}</td>
            <td>{{ hour.condition.text }}</td>
            <td>{{ Math.round(hour.temp_f) }}°F</td>
            <td>{{ hour.precip_in.toFixed(2) }} in</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-else class="panel-subtitle">Hourly data will appear here after you search.</p>
  </section>
</template>

<script>
import { useWeatherStore } from '../store/weatherStore'

export default {
  name: 'HourlyList',
  computed: {
    hourlyHours() {
      return useWeatherStore().state.weather?.forecast?.forecastday?.[0]?.hour || []
    }
  },
  methods: {
    formatTime(time) {
      return new Date(time).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
      })
    }
  }
}
</script>

<style scoped>
.hourly-list-panel {
  padding: 1.25rem;
}

.hourly-table-wrap {
  overflow-x: auto;
  margin-top: 1rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 0.85rem;
  border-bottom: 1px solid rgba(21, 32, 51, 0.1);
  text-align: left;
}

th {
  background: rgba(109, 74, 255, 0.08);
}
</style>

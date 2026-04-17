<template>
  <section class="panel forecast-panel">
    <div class="forecast-header">
      <div>
        <h2 class="panel-title">5 day forecast</h2>
        <p class="panel-subtitle">Current day plus the next forecasted days for the selected location.</p>
      </div>
    </div>

    <div v-if="forecastDays.length" class="forecast-grid">
      <article v-for="day in forecastDays" :key="day.date" class="forecast-card">
        <p class="forecast-day">{{ formatDay(day.date) }}</p>
        <img :src="day.day.condition.icon" :alt="day.day.condition.text">
        <p class="forecast-condition">{{ day.day.condition.text }}</p>
        <p class="forecast-temp">{{ Math.round(day.day.maxtemp_f) }}° / {{ Math.round(day.day.mintemp_f) }}°</p>
      </article>
    </div>

    <p v-else class="panel-subtitle">Forecast data will appear here after you search.</p>
  </section>
</template>

<script>
import { useWeatherStore } from '../store/weatherStore'

export default {
  name: 'ForecastCards',
  computed: {
    forecastDays() {
      return useWeatherStore().state.weather?.forecast?.forecastday || []
    }
  },
  methods: {
    formatDay(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', { weekday: 'short' })
    }
  }
}
</script>

<style scoped>
.forecast-panel {
  padding: 1.25rem;
}

.forecast-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.9rem;
  margin-top: 1rem;
}

.forecast-card {
  background: rgba(109, 74, 255, 0.08);
  border: 1px solid rgba(109, 74, 255, 0.12);
  border-radius: 18px;
  padding: 1rem;
  text-align: center;
}

.forecast-day,
.forecast-condition,
.forecast-temp {
  margin: 0.35rem 0;
}

.forecast-day {
  font-weight: 700;
}

.forecast-condition {
  min-height: 2.5em;
  color: var(--text-muted);
}

.forecast-temp {
  font-weight: 700;
}
</style>

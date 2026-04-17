<template>
  <section class="panel panel--strong current-weather">
    <div v-if="weather" class="weather-layout">
      <div>
        <p class="location-label">{{ fullLocation }}</p>
        <h2 class="temperature">{{ Math.round(weather.current.temp_f) }}°F</h2>
        <p class="condition">{{ weather.current.condition.text }}</p>
        <p class="updated">Updated: {{ weather.current.last_updated }}</p>
      </div>

      <div class="weather-icon-wrap">
        <img
          class="weather-icon"
          :src="weather.current.condition.icon"
          :alt="weather.current.condition.text"
        >
      </div>
    </div>

    <div v-if="weather" class="info-grid details-grid">
      <div class="metric-card">
        <p class="metric-label">Humidity</p>
        <p class="metric-value">{{ weather.current.humidity }}%</p>
      </div>
      <div class="metric-card">
        <p class="metric-label">Wind</p>
        <p class="metric-value">{{ weather.current.wind_kph }} km/h</p>
      </div>
      <div class="metric-card">
        <p class="metric-label">High / Low</p>
        <p class="metric-value">{{ todayHighLow }}</p>
      </div>
      <div class="metric-card">
        <p class="metric-label">Feels Like</p>
        <p class="metric-value">{{ Math.round(weather.current.feelslike_f) }}°F</p>
      </div>
    </div>

    <div v-else class="empty-state">
      <h2 class="panel-title">Current weather</h2>
      <p class="panel-subtitle">Search for a city to view its weather information.</p>
    </div>
  </section>
</template>

<script>
import { useWeatherStore } from '../store/weatherStore'

export default {
  name: 'CurrentWeather',
  computed: {
    weather() {
      return useWeatherStore().state.weather
    },
    fullLocation() {
      if (!this.weather) return ''
      const { name, region, country } = this.weather.location
      return [name, region, country].filter(Boolean).join(', ')
    },
    todayHighLow() {
      if (!this.weather?.forecast?.forecastday?.length) return '--'
      const today = this.weather.forecast.forecastday[0].day
      return `${Math.round(today.maxtemp_f)}° / ${Math.round(today.mintemp_f)}°`
    }
  }
}
</script>

<style scoped>
.current-weather {
  padding: 1.4rem;
}

.weather-layout {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
}

.location-label {
  margin: 0;
  color: var(--text-muted);
  font-weight: 700;
}

.temperature {
  margin: 0.5rem 0 0.25rem;
  font-size: clamp(2.3rem, 5vw, 4rem);
}

.condition,
.updated {
  margin: 0.25rem 0;
}

.condition {
  font-size: 1.15rem;
  font-weight: 700;
}

.updated {
  color: var(--text-muted);
}

.weather-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 132px;
}

.weather-icon {
  width: 120px;
  height: 120px;
}

.details-grid {
  margin-top: 1rem;
}

.empty-state {
  padding: 0.5rem 0;
}

@media (max-width: 640px) {
  .weather-layout {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>

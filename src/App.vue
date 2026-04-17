<template>
  <div class="app-shell">
    <div
      class="bg-layer bg-current"
      :style="{ backgroundImage: currentBackgroundStyle }"
      aria-hidden="true"
    ></div>

    <div
      class="bg-layer bg-next"
      :style="{ backgroundImage: nextBackgroundStyle }"
      :class="{ 'fade-in': isTransitioning }"
      aria-hidden="true"
    ></div>

    <div
      class="tint-layer"
      :style="{ background: tintGradient }"
      aria-hidden="true"
    ></div>

    <div class="overlay">
      <header class="site-header">
        <div>
          <p class="eyebrow">Responsive Web Frameworks Final Project by Alex Algiere</p>
          <h1>WeatherVue</h1>
          <p class="subtitle">Current weather, hourly trends, and a 5-day forecast powered by WeatherAPI.</p>
        </div>

        <nav class="site-nav" aria-label="Primary navigation">
          <RouterLink
            to="/"
            :style="navButtonStyle"
          >
            Home
          </RouterLink>

          <RouterLink
            to="/hourly"
            :style="navButtonStyle"
          >
            Hourly
          </RouterLink>

          <RouterLink
            to="/forecast"
            :style="navButtonStyle"
          >
            5 Day Forecast
          </RouterLink>
        </nav>
      </header>

      <main class="main-content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import { useWeatherStore } from './store/weatherStore'

export default {
  name: 'App',
  components: {
    RouterLink,
    RouterView
  },
  data() {
    return {
      currentBackground: '',
      nextBackground: '',
      isTransitioning: false,
      transitionTimer: null
    }
  },
  computed: {
    resolvedWeather() {
      const { state } = useWeatherStore()
      return state.weather
    },
    resolvedBackground() {
      const { state, getBackgroundImage } = useWeatherStore()
      return getBackgroundImage(state.weather)
    },
    currentBackgroundStyle() {
      return `url(${this.currentBackground})`
    },
    nextBackgroundStyle() {
      return `url(${this.nextBackground})`
    },
    tintGradient() {
      const weather = this.resolvedWeather

      if (!weather) {
        return 'linear-gradient(rgba(20, 30, 60, 0.35), rgba(20, 30, 60, 0.55))'
      }

      const conditionText = weather.current.condition.text.toLowerCase()
      const tempF = Number(weather.current.temp_f)
      const isDay = weather.current.is_day === 1

      if (!isDay) {
        return 'linear-gradient(rgba(8, 16, 40, 0.45), rgba(18, 30, 70, 0.9))'
      }

      if (
        conditionText.includes('rain') ||
        conditionText.includes('drizzle') ||
        conditionText.includes('storm') ||
        conditionText.includes('shower') ||
        conditionText.includes('thunder')
      ) {
        return 'linear-gradient(rgba(45, 65, 95, 0.40), rgba(30, 45, 75, 0.60))'
      }

      if (
        conditionText.includes('snow') ||
        conditionText.includes('sleet') ||
        conditionText.includes('ice') ||
        tempF <= 45
      ) {
        return 'linear-gradient(rgba(180, 210, 235, 0.30), rgba(120, 155, 190, 0.50))'
      }

      if (
        conditionText.includes('cloud') ||
        conditionText.includes('overcast') ||
        conditionText.includes('mist') ||
        conditionText.includes('fog')
      ) {
        return 'linear-gradient(rgba(90, 105, 125, 0.35), rgba(55, 70, 90, 0.55))'
      }

      if (tempF >= 85) {
        return 'linear-gradient(rgba(255, 170, 80, 0.22), rgba(255, 120, 60, 0.35))'
      }

      return 'linear-gradient(rgba(70, 135, 210, 0.22), rgba(35, 75, 155, 0.38))'
    },
    navButtonStyle() {
      const weather = this.resolvedWeather

      if (!weather) {
        return {
          color: '#ffffff',
          background: 'rgba(18, 30, 60, 0.45)',
          border: '1px solid rgba(255, 255, 255, 0.28)',
          boxShadow: '0 10px 24px rgba(0, 0, 0, 0.12)'
        }
      }

      const conditionText = weather.current.condition.text.toLowerCase()
      const tempF = Number(weather.current.temp_f)
      const isDay = weather.current.is_day === 1

      if (!isDay) {
        return {
          color: '#ffffff',
          background: 'rgba(156, 74, 225, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: '0 10px 24px rgba(5, 10, 30, 0.28)'
        }
      }

      if (
        conditionText.includes('rain') ||
        conditionText.includes('drizzle') ||
        conditionText.includes('storm') ||
        conditionText.includes('shower') ||
        conditionText.includes('thunder')
      ) {
        return {
          color: '#ffffff',
          background: 'rgba(46, 68, 102, 0.78)',
          border: '1px solid rgba(255, 255, 255, 0.20)',
          boxShadow: '0 10px 24px rgba(23, 38, 63, 0.22)'
        }
      }

      if (
        conditionText.includes('snow') ||
        conditionText.includes('sleet') ||
        conditionText.includes('ice') ||
        tempF <= 45
      ) {
        return {
          color: '#ffffff',
          background: 'rgba(0, 0, 0, 0.8)',
          border: '1px solid rgba(20, 48, 79, 0.9)',
          boxShadow: '0 10px 24px rgba(90, 120, 150, 0.16)'
        }
      }

      if (
        conditionText.includes('cloud') ||
        conditionText.includes('overcast') ||
        conditionText.includes('mist') ||
        conditionText.includes('fog')
      ) {
        return {
          color: '#ffffff',
          background: 'rgba(82, 96, 118, 0.76)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: '0 10px 24px rgba(48, 58, 74, 0.18)'
        }
      }

      if (tempF >= 85) {
        return {
          color: '#4b1b00',
          background: 'rgba(255, 220, 170, 0.90)',
          border: '1px solid rgba(140, 74, 16, 0.16)',
          boxShadow: '0 10px 24px rgba(180, 90, 20, 0.16)'
        }
      }

      return {
        color: '#ffffff',
        background: 'rgba(66, 109, 190, 0.78)',
        border: '1px solid rgba(255, 255, 255, 0.20)',
        boxShadow: '0 10px 24px rgba(30, 58, 120, 0.18)'
      }
    }
  },
  watch: {
    resolvedBackground: {
      immediate: true,
      handler(newImage) {
        if (!newImage) return

        if (!this.currentBackground) {
          this.currentBackground = newImage
          this.nextBackground = newImage
          return
        }

        if (newImage === this.currentBackground) {
          return
        }

        this.nextBackground = newImage
        this.isTransitioning = true

        clearTimeout(this.transitionTimer)
        this.transitionTimer = setTimeout(() => {
          this.currentBackground = newImage
          this.isTransitioning = false
        }, 800)
      }
    }
  },
  beforeUnmount() {
    clearTimeout(this.transitionTimer)
  }
}
</script>

<style>
:root {
  --bg-card: rgba(255, 255, 255, .9);
  --bg-card-strong: rgba(255, 255, 255, 0.9);
  --text-main: #152033;
  --text-muted: #51617c;
  --accent: #6d4aff;
  --accent-dark: #5638d7;
  --border: rgba(18, 33, 61, 0.12);
  --shadow: 0 18px 45px rgba(10, 22, 49, 0.16);
}

* {
  box-sizing: border-box;
}

html,
body,
#app {
  margin: 0;
  min-height: 100%;
  font-family: Arial, Helvetica, sans-serif;
  color: var(--text-main);
}

body {
  background: #dce6ff;
}

img {
  max-width: 100%;
}

button,
input {
  font: inherit;
}

.app-shell {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

.bg-layer {
  position: fixed;
  inset: 0;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transition: opacity 0.8s ease-in-out;
  z-index: 0;
}

.bg-current {
  opacity: 1;
}

.bg-next {
  opacity: 0;
}

.bg-next.fade-in {
  opacity: 1;
}

.tint-layer {
  position: fixed;
  inset: 0;
  z-index: 1;
  transition: background 0.8s ease-in-out;
  pointer-events: none;
}

.overlay {
  position: relative;
  z-index: 2;
  min-height: 100vh;
  background: rgba(247, 249, 252, 0);
  backdrop-filter: blur(2px);
}

.site-header,
.main-content {
  width: min(1150px, calc(100% - 2rem));
  margin: 0 auto;
}

.site-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 2rem 0 1rem;
  color: white;
}

.site-header h1 {
  margin: 0.25rem 0 0.35rem;
  font-size: clamp(2rem, 3vw, 2.8rem);
}

.eyebrow {
  margin: 0;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.82rem;
  font-weight: 700;
}

.subtitle {
  margin: 0 auto;
  max-width: 42rem;
  color: rgba(255, 255, 255, 0.92);
}

.site-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.site-nav a {
  text-decoration: none;
  padding: 0.8rem 1rem;
  border-radius: 999px;
  font-weight: 700;
  transition: transform 0.2s ease, background 0.3s ease, color 0.3s ease, border 0.3s ease;
  backdrop-filter: blur(6px);
}

.site-nav a:hover {
  transform: translateY(-1px);
}

.site-nav a.router-link-exact-active {
  outline: 2px solid rgba(255, 255, 255, 0.78);
  outline-offset: 2px;
}

.main-content {
  padding-bottom: 2rem;
}

.panel {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 24px;
  box-shadow: var(--shadow);
}

.panel--strong {
  background: var(--bg-card-strong);
}

.panel-title {
  margin: 0 0 0.35rem;
  font-size: 1.35rem;
}

.panel-subtitle {
  margin: 0;
  color: var(--text-muted);
}

.two-column-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 1rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.85rem;
}

.metric-card {
  background: rgba(109, 74, 255, 0.08);
  border: 1px solid rgba(109, 74, 255, 0.12);
  border-radius: 18px;
  padding: 1rem;
}

.metric-label {
  margin: 0 0 0.35rem;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.metric-value {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
}

.section-stack {
  display: grid;
  gap: 1rem;
}

@media (max-width: 860px) {
  .site-header {
    flex-direction: column;
  }

  .two-column-grid {
    grid-template-columns: 1fr;
  }
}
</style>
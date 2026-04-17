<template>
  <div class="app-shell" :style="appBackgroundStyle">
    <div class="overlay">
      <header class="site-header">
        <div>
          <p class="eyebrow">Responsive Web Frameworks Final Project</p>
          <h1>WeatherVue</h1>
          <p class="subtitle">Current weather, hourly trends, and a 5-day forecast powered by WeatherAPI.</p>
        </div>

        <nav class="site-nav" aria-label="Primary navigation">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/hourly">Hourly</RouterLink>
          <RouterLink to="/forecast">5 Day Forecast</RouterLink>
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
  computed: {
    appBackgroundStyle() {
      const { state, getBackgroundImage } = useWeatherStore()
      return {
        backgroundImage: `linear-gradient(rgba(12, 20, 35, 0.45), rgba(12, 20, 35, 0.65)), url(${getBackgroundImage(state.weather)})`
      }
    }
  }
}
</script>

<style>
:root {
  --bg-card: rgba(255, 255, 255, 0.9);
  --bg-card-strong: rgba(255, 255, 255, 0.97);
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
  min-height: 100vh;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.overlay {
  min-height: 100vh;
  background: rgba(247, 249, 252, 0.18);
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
  margin: 0;
  max-width: 42rem;
  color: rgba(255, 255, 255, 0.9);
}

.site-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.site-nav a {
  text-decoration: none;
  color: white;
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 0.8rem 1rem;
  border-radius: 999px;
  font-weight: 700;
}

.site-nav a.router-link-exact-active {
  background: white;
  color: var(--accent-dark);
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

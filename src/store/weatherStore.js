import { reactive } from 'vue'
import { fetchForecast } from '../services/weatherApi'
import bgClear from '../assets/bg-clear.svg'
import bgRain from '../assets/bg-rain.svg'
import bgCold from '../assets/bg-cold.svg'
import bgNight from '../assets/bg-night.svg'

const STORAGE_KEY = 'weather_saved_locations'

function readSavedLocations() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    return []
  }
}

const state = reactive({
  city: 'Goldsboro',
  weather: null,
  loading: false,
  error: '',
  savedLocations: readSavedLocations()
})

function persistSavedLocations() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.savedLocations))
}

function normalizeLocationLabel(weatherData) {
  const { name, region, country } = weatherData.location
  return [name, region, country].filter(Boolean).join(', ')
}

function dedupeAndTrim(list) {
  return [...new Set(list.map(item => item.trim()).filter(Boolean))].slice(0, 8)
}

export function getBackgroundImage(weatherData) {
  if (!weatherData) return bgClear

  const conditionText = weatherData.current.condition.text.toLowerCase()
  const tempF = weatherData.current.temp_f
  const isDay = weatherData.current.is_day === 1

  if (!isDay) return bgNight
  if (conditionText.includes('rain') || conditionText.includes('drizzle') || conditionText.includes('storm')) return bgRain
  if (conditionText.includes('snow') || tempF <= 45) return bgCold
  return bgClear
}

export async function searchWeather(city, days = 5) {
  const trimmedCity = city.trim()

  if (!trimmedCity) {
    state.error = 'Please enter a city name.'
    return
  }

  state.loading = true
  state.error = ''

  try {
    const data = await fetchForecast(trimmedCity, days)
    state.weather = data
    state.city = trimmedCity
  } catch (error) {
    state.error = error.response?.data?.error?.message || error.message || 'Unable to load weather data.'
  } finally {
    state.loading = false
  }
}

export function saveCurrentLocation() {
  if (!state.weather) return

  const label = normalizeLocationLabel(state.weather)
  state.savedLocations = dedupeAndTrim([label, ...state.savedLocations])
  persistSavedLocations()
}

export async function loadSavedLocation(locationLabel) {
  await searchWeather(locationLabel, 5)
}

export function removeSavedLocation(locationLabel) {
  state.savedLocations = state.savedLocations.filter(item => item !== locationLabel)
  persistSavedLocations()
}

export function useWeatherStore() {
  return {
    state,
    searchWeather,
    saveCurrentLocation,
    loadSavedLocation,
    removeSavedLocation,
    getBackgroundImage
  }
}

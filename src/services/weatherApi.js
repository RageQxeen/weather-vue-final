import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.weatherapi.com/v1',
  timeout: 10000
})

export async function fetchForecast(city, days = 5) {
  const key = process.env.VUE_APP_WEATHER_API_KEY

  if (!key) {
    throw new Error('Missing WeatherAPI key. Add VUE_APP_WEATHER_API_KEY to your .env.local file.')
  }

  const response = await api.get('/forecast.json', {
    params: {
      key,
      q: city,
      days,
      aqi: 'no',
      alerts: 'no'
    }
  })

  return response.data
}

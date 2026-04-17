<template>
  <section class="panel chart-panel">
    <div>
      <h2 class="panel-title">Hourly forecast chart</h2>
      <p class="panel-subtitle">Hourly temperatures and rain amounts for the current day.</p>
    </div>

    <div v-if="chartData.labels.length" class="chart-wrap">
      <Bar :data="chartData" :options="chartOptions" aria-label="Hourly weather chart" />
    </div>

    <p v-else class="panel-subtitle chart-empty">Search for a city to build the hourly chart.</p>
  </section>
</template>

<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import { useWeatherStore } from '../store/weatherStore'

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend)

export default {
  name: 'HourlyChart',
  components: { Bar },
  computed: {
    hourlyHours() {
      return useWeatherStore().state.weather?.forecast?.forecastday?.[0]?.hour || []
    },
    chartData() {
      const labels = this.hourlyHours.map(hour => new Date(hour.time).toLocaleTimeString('en-US', { hour: 'numeric' }))
      const temps = this.hourlyHours.map(hour => Math.round(hour.temp_f))
      const rain = this.hourlyHours.map(hour => Number(hour.precip_in.toFixed(2)))

      return {
        labels,
        datasets: [
          {
            type: 'line',
            label: 'Temperature (°F)',
            borderColor: '#6d4aff',
            backgroundColor: '#6d4aff',
            tension: 0.3,
            yAxisID: 'y',
            data: temps
          },
          {
            type: 'bar',
            label: 'Rain (in)',
            backgroundColor: '#8fc9ff',
            borderColor: '#8fc9ff',
            yAxisID: 'y1',
            data: rain
          }
        ]
      }
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        scales: {
          x: {
            ticks: {
              maxRotation: 0,
              autoSkip: true,
              maxTicksLimit: 8
            }
          },
          y: {
            position: 'left',
            title: {
              display: true,
              text: 'Temperature (°F)'
            }
          },
          y1: {
            position: 'right',
            grid: {
              drawOnChartArea: false
            },
            title: {
              display: true,
              text: 'Rain (in)'
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.chart-panel {
  padding: 1.25rem;
}

.chart-wrap {
  position: relative;
  height: 380px;
  margin-top: 1rem;
}

.chart-empty {
  margin-top: 1rem;
}
</style>

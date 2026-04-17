<template>
  <section class="panel chart-panel">
    <div>
      <h2 class="panel-title">5 day chart</h2>
      <p class="panel-subtitle">Temperature and rain totals for the selected forecast range.</p>
    </div>

    <div v-if="chartData.labels.length" class="chart-wrap">
      <Bar :data="chartData" :options="chartOptions" aria-label="5 day weather chart" />
    </div>

    <p v-else class="panel-subtitle chart-empty">Search for a city to build the chart.</p>
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
  name: 'DailyChart',
  components: { Bar },
  computed: {
    forecastDays() {
      return useWeatherStore().state.weather?.forecast?.forecastday || []
    },
    chartData() {
      const labels = this.forecastDays.map(day => new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }))
      const temps = this.forecastDays.map(day => Math.round(day.day.avgtemp_f))
      const rain = this.forecastDays.map(day => Number(day.day.totalprecip_in.toFixed(2)))

      return {
        labels,
        datasets: [
          {
            type: 'line',
            label: 'Avg Temp (°F)',
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
  height: 360px;
  margin-top: 1rem;
}

.chart-empty {
  margin-top: 1rem;
}
</style>

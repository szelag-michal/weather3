// CommitChart.js
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['datasets', 'labels'],
  data() {
    return {
      gradient: null,
      gradient2: null
    }
  },
  mounted () {
    this.renderChart({
      labels: this.labels,
      datasets: this.datasets
    }, {responsive: true, maintainAspectRatio: false})
  }
}
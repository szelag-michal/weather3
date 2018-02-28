<template>
  <div class="row">
        <div class="col-lg-12" v-for="(fc, i) in forecast.consolidated_weather" :key="fc.id" v-if="i < 1">
          <div class="card text-center m-2" :class="'bg-'+fc.weather_state_abbr">
                <div class="card-block p-0">
                  <div class="p-3">
                    <div class="font-size-4">
                      {{forecast.title}}
                    </div>
                    <div class="font-size-5">
                      {{Math.round(fc.the_temp)}} &deg; <sup>c</sup> <span class="icon" :class="'icon-'+fc.weather_state_abbr"></span>
                    </div>
                    <div class="font-size-3 text-italic">{{fc.weather_state_name}}</div>
                    <div class="font-size-2 text-uppercase"><strong>{{fc.applicable_date}}</strong></div>
                  </div>
                  <line-example :datasets="datasets" :labels="labels"/>
                </div>
              </div>
        </div>
      </div>
</template>
<script>
import {HTTP} from './http-common'
import LineExample from './components/LineChart.js'
import moment from 'moment'
import { bus } from './main'

export default {
  components: {
    LineExample
  },
  data() {
    return {
      actualBackground: '',
      forecast: [],
      labels: [],
      datasets: [],
      location: '',
      

    }
  },
  methods: {
    getForecast(data) {
      HTTP.get(`https://www.metaweather.com/api/location/${data}/`)
    .then(response => {
      this.forecast = response.data;
      this.actualBackground = 'bg-'+response.data.consolidated_weather[0].weather_state_abbr;
      this.$emit('actualBg',this.actualBackground)
      let labels = response.data.consolidated_weather.map(item => {
        return moment(item['applicable_date']).format('ddd');          
      })
      this.labels = labels;

      let temperatures = response.data.consolidated_weather.map(item => {
        return Math.round(item['the_temp']);
      })
      
      let windspeed = response.data.consolidated_weather.map(item => {
        return Math.round(item['wind_speed']);
      })

      function createObject(data, label, color) {
        return new Object({
          label: label,
          data: data,
          borderColor: `rgba(${color}, 0.5)`,
          pointBackgroundColor: `rgba(${color}, 0.2)`,
          borderWidth: 1,
          pointBorderColor: `rgba(${color}, 0.5)`,
          backgroundColor: `rgba(${color}, 0.2)`
        });
      }
      this.datasets = []
      this.datasets.push(createObject(temperatures, 'Temperatures (C)', '75, 192, 192'), createObject(windspeed, 'Windspeed (km/h)', '232,62,140'))  
    })
    .catch(e => {
      this.errors.push(e)
    })
    }
  },
  created() {
    bus.$on('location', (data) => {
      this.location = data
    });
    bus.$on('woeid', (data) => {
      this.getForecast(data)
    });
    this.getForecast('560743')

    
    
  }
}
</script>
<style lang="scss">
  @import '../node_modules/bootstrap/scss/bootstrap';
  @import './assets/vendor/weather-icons/sass/weather-icons';
  @import './assets/scss/chartist';
  @import './assets/scss/variables';
  html, body, .container-fluid {width: 100%;height: 100%;}
  body {padding: 0;}
  .form-inline {position: relative;}
  .form-inline .list-group {position: absolute;top: 100%;width: 100%;}
</style>
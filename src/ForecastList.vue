<template>
<div class="container">
    <div class="row">
      <div class="col-12">
        
      </div>
    </div>
      <div class="row">
        <div class="col-lg-12" v-for="(fc, i) in forecast.consolidated_weather" :key="fc.id" v-if="i < 2 && i > 0">
          <div class="card text-center m-2" :class="'bg-'+fc.weather_state_abbr">
                <div class="card-block p-0">
                  <div class="p-3">
                    <div class="font-size-5">
                      {{Math.round(fc.the_temp)}} &deg; <sup>c</sup> <span class="icon" :class="'icon-'+fc.weather_state_abbr"></span>
                    </div>
                    <div class="font-size-3 text-italic">{{fc.weather_state_name}}</div>
                    <div class="font-size-2 text-uppercase"><strong>{{fc.applicable_date}}</strong></div>
                  </div>
                  
                </div>
              </div>
        </div>
      </div>
<div class='chart'>
    <!-- import font awesome for legend icons -->
    <link href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' rel='stylesheet'>
    <chart-axis :data='chartData'></chart-axis>
  </div>


    </div>  
</template>
<script>
import {HTTP} from './http-common';
import fcDetails from './ForecastDetails.vue'
import { svgArea, svgLine, svgScatter } from 'd2b'
import { ChartAxis } from 'vue-d2b'
import moment from 'moment'
export default {
  components: {
    'fc-details': fcDetails,
    'chartAxis': ChartAxis
  },
  data() {
    return {
      forecast: [],
    chartData: {
          sets: [
            {
              generators: [svgArea(), svgLine(), svgScatter()],
              graphs: [
                {
                  label: 'Temperatures',
                  values: [
                    {x: 'Mon', y: 15},
                    {x: 'Tue', y: 8},
                    {x: 'Wed', y: 12},
                    {x: 'Thu', y: 11},
                    {x: 'Fri', y: 5},
                    {x: 'Sat', y: 15}
                  ]
                },
                {
                  label: 'Wind Speed',
                  values: [
                    {x: 'Mon', y: 5},
                    {x: 'Tue', y: 12},
                    {x: 'Wed', y: 22},
                    {x: 'Thu', y: 60},
                    {x: 'Fri', y: 60},
                    {x: 'Sat', y: 11}
                  ]
                }
              ]
            }
          ]
        }
    }
  },
  created() {
    HTTP.get(`https://www.metaweather.com/api/location/44418/`)
    .then(response => {
      this.forecast = response.data;
        // let series = response.data.consolidated_weather.map(item => {
        //   return Math.round(item['the_temp'])
        // })
        // let labels = response.data.consolidated_weather.map(item => {
        //   return moment(item['applicable_date']).format('ddd');
          
        // })
        
        // let labels2 = labels.map(value => ({'x': value}));
        // let series2 = series.map(value => ({'y': value}));

        // let mergeData = _.merge(series2, labels2);
    
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>
<style lang="scss">

.chart{
    width: 100%;
    height: 500px;
  }

</style>

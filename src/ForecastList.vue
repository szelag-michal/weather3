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


    </div>  
</template>
<script>
import {HTTP} from './http-common';
import fcDetails from './ForecastDetails.vue'

import moment from 'moment'
export default {
  components: {},
  data() {
    return {
      forecast: [],

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

<template>
  <div id="app">
    <app-header></app-header>
    <fc-list></fc-list>
  </div>
</template>

<script>
import Header from './Header.vue'
import fcList from './ForecastList.vue'

export default {
 components: {
   'app-header': Header,
   'fc-list': fcList
 }
}
</script>

<style lang="scss">
  @import '../node_modules/bootstrap/scss/bootstrap';
  @import './assets/vendor/weather-icons/sass/weather-icons';
  @import './assets/scss/chartist';
  @import './assets/scss/variables';

  body {padding-top: 4em;}
  .form-inline {position: relative;}
  .form-inline .list-group {position: absolute;top: 100%;width: 100%;}
</style>

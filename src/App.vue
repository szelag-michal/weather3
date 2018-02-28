<template>
<div class="container-fluid" :class="actualBackground">
    <app-header></app-header>
    <app-weather @actualBg="actualBg($event)"></app-weather>
    </div>  
</template>
<script>
import AppHeader from './components/Header.vue'
import AppWeather from './Weather.vue'
export default {
  data() {
    return {
      actualBackground: ''
    }
  },
  methods: {
    actualBg(e) {
      this.actualBackground = e
    }
  },
  components: {
    AppHeader,
    AppWeather
  }
}
</script>



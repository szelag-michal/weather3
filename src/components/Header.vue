<template>
  <nav class="navbar navbar-expand-lg">
      <a class="navbar-brand" href="#">Weather App</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        
        <div class="form-inline ml-auto my-2 my-lg-0">
          
          <input 
              class="form-control mr-sm-2" 
              type="search" 
              placeholder="Search" 
              aria-label="Search" 
              v-model="suggestion" 
              @input="onInput(suggestion)"
              @keyup.down="onArrowDown"
              @keyup.up="onArrowUp"
              @keyup.enter="onEnter"
          >
          <ul class="list-group" v-if="showSuggestion">
            <li class="list-group-item" @click="onClick(loc.title, loc.woeid)" :class="{'active': key === arrowCounter}" v-for="(loc, key) in locations" :key="loc.woeid">{{loc.title}}</li>
          </ul>
        </div>
      </div>
    </nav>
</template>
<script>
import axios from 'axios'
import {bus} from '../main'
export default {
  data() {
    return {
      arrowCounter: 0,
      suggestion: '',
      location: '',
      locations: [],
      showSuggestion: false
    }
  },
  methods: {
    onInput: function(e) {
      if(e.length > 2) {
        this.showSuggestion = true;

        
        axios.get(`https://www.metaweather.com/api/location/search/?query=${e}`)
        .then(response => {
          this.locations = response.data
          
        })
        .catch(e => console.log(e))
      }
    },
    onClick(title, woeid) {
      this.suggestion = title
      this.emitData(title, woeid)
      this.showSuggestion = false;
    },
    onEnter: function() {
      this.location = this.locations[this.arrowCounter].title
      
      this.suggestion = this.location
      this.showSuggestion = false;
      this.emitData(this.location, this.locations[this.arrowCounter].woeid)
    }, 
    emitData(location, woeid) {
      bus.$emit('location', location)
      bus.$emit('woeid', woeid)
    },
    onArrowDown() {
			if (this.arrowCounter < this.locations.length) {
          this.arrowCounter = this.arrowCounter + 1;
        }
		},
		onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
      }
    },
  }
}
</script>
<style lang="scss">
.list-group {z-index: 999999}
</style>


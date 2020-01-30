<template>
    <form class="form row justify-content-md-between pb-5 py-lg-5">
      <div class="col col-6 mb-3 mb-lg-0">
         <div class="form-group d-sm-none">
          <label for="region" class="sr-only">Region</label>
          <select class="form-control" id="region" v-model="currentSelectedRegion">
            <option disabled value="">Region</option>
            <option v-for="(region, index) in regions" :key="index" :value="region">{{region['data-name']}}</option>
          </select>
          </div>  
        <div class="d-flex">
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="difficultyLevel" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Difficulty
            </button>
            <div class="dropdown-menu" aria-labelledby="difficultyLevel">
              <button @click="setSelectedDifficulty('')" type="button" class="dropdown-item" :class="selectedDifficulty == '' ? 'active' : ''">Show All</button>
              <div class="dropdown-divider"></div>
              <button @click="setSelectedDifficulty('Easy')" type="button" class="dropdown-item" :class="selectedDifficulty == 'Easy' ? 'active' : ''">Easy</button>
              <button @click="setSelectedDifficulty('Moderate')" type="button" class="dropdown-item" :class="selectedDifficulty == 'Moderate' ? 'active' : ''">Moderate</button>
              <button @click="setSelectedDifficulty('Strenuous')" type="button" class="dropdown-item" :class="selectedDifficulty == 'Strenuous' ? 'active' : ''">Strenuous</button>
            </div>
          </div>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="terrain" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Terrain
            </button>
            <div class="dropdown-menu" aria-labelledby="terrain">
              <button @click="setSelectedTerrain('')" type="button" class="dropdown-item" :class="selectedTerrain == '' ? 'active' : ''">Show All</button>
              <div class="dropdown-divider"></div>
              <button @click="setSelectedTerrain('Road')" type="button" class="dropdown-item" :class="selectedTerrain == 'Road' ? 'active' : ''">Road</button>
              <button @click="setSelectedTerrain('Off-Road')" type="button" class="dropdown-item" :class="selectedTerrain == 'Off-Road' ? 'active' : ''">Off-Road</button>
              <button @click="setSelectedTerrain('Mixed')" type="button" class="dropdown-item" :class="selectedTerrain == 'Mixed' ? 'active' : ''">Mixed</button>
            </div>
          </div>
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="distanceKM" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Distance
              </button>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="distanceKM">
                <button @click="setSelectedDistanceMin('0'), setSelectedDistanceMax('9999')" type="button" class="dropdown-item" :class="selectedDistanceMin == '0' && selectedDistanceMax == '9999' ? 'active' : ''">Show All</button>
                <div class="dropdown-divider"></div>
                <div class="form-check form-check-inline ml-3">
                  <input class="form-check-input" type="radio" id="miles" value="miles" name="distance-unit" v-model="selectedDistanceType">
                  <label class="form-check-label" for="miles">mi</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" id="kilometres" value="kilometres" name="distance-unit" v-model="selectedDistanceType">
                  <label class="form-check-label" for="kilometres">km</label>
                </div>
                <div class="dropdown-divider"></div>
                <button 
                  @click="setSelectedDistanceMin('0'), setSelectedDistanceMax('19')" 
                  type="button" 
                  class="dropdown-item" 
                  :class="selectedDistanceMin == '0' && selectedDistanceMax == '19' ? 'active' : ''">
                    0 - 19 {{selectedDistanceType}}
                  </button>
                <button @click="setSelectedDistanceMin('20'), setSelectedDistanceMax('39')" type="button" class="dropdown-item" :class="selectedDistanceMin == '20' && selectedDistanceMax == '39' ? 'active' : ''">20 - 39 {{selectedDistanceType}}</button>
                <button @click="setSelectedDistanceMin('40'), setSelectedDistanceMax('59')" type="button" class="dropdown-item" :class="selectedDistanceMin == '40' && selectedDistanceMax == '59' ? 'active' : ''">40 - 59 {{selectedDistanceType}}</button>
                <button @click="setSelectedDistanceMin('60'), setSelectedDistanceMax('79')" type="button" class="dropdown-item" :class="selectedDistanceMin == '60' && selectedDistanceMax == '79' ? 'active' : ''">60 - 79 {{selectedDistanceType}}</button>
                <button @click="setSelectedDistanceMin('80'), setSelectedDistanceMax('99')" type="button" class="dropdown-item" :class="selectedDistanceMin == '80' && selectedDistanceMax == '99' ? 'active' : ''">80 - 99 {{selectedDistanceType}}</button>
                <button @click="setSelectedDistanceMin('100'), setSelectedDistanceMax('9999')" type="button" class="dropdown-item" :class="selectedDistanceMin == '100' && selectedDistanceMax == '9999' ? 'active' : ''">100 + {{selectedDistanceType}}</button>
              </div>
          </div>
        </div>
      </div>
      <div class="col col-12 col-md-auto">
        <div class="input-group">
          <label class="sr-only" for="route-search-input">Search Routes</label>
            <div class="input-group-prepend">
              <span class="input-group-text bg-primary border border-primary"><i class="fa fa-search text-light"></i></span>
            </div>
          <input class="form-control" type="search" id="route-search-input" placeholder="Search routes" name="search" v-model="searchTerm" />
          <button @click.prevent="clearFilters" class="btn btn-link btn-outline-primary ml-3">Clear all filters</button>
        </div>
      </div>
    </form>
</template>

<script>
import axios from 'axios';
export default {
  name: "RoutesFilters",
  components: {},
  data() {
    return {
      searchTerm: '',
      selectedDistanceType: 'miles',
      currentSelectedRegion: this.selectedRegion
    };
  },
  watch: {
      selectedRegion() {
        this.currentSelectedRegion = this.selectedRegion
      },
      currentSelectedRegion() {
        this.$emit('setSelectedRegion', this.currentSelectedRegion);
      },
      searchTerm() {
          this.$emit('setSearchTerm', this.searchTerm);
      },
      selectedDistanceType() {
          this.$emit('setSelectedDistanceType', this.selectedDistanceType);
      },
      selectedTerrain() {},
      selectedDifficulty() {},
      selectedDistanceMin() {},
      selectedDistanceMax() {}
  },
  computed: {},
  props: [
    'selectedTerrain',
    'selectedDifficulty',
    'selectedDistanceMin',
    'selectedDistanceMax',
    'selectedRegion',
    'regions'
  ],
  methods: {
    clearFilters() {
      this.$emit('clearFilters');
    },
    setSelectedDistanceMin(value) {
      this.$emit('setSelectedDistanceMin', value);
    },
    setSelectedDistanceMax(value) {
      this.$emit('setSelectedDistanceMax', value);
    },
    setSelectedTerrain(value) {
      this.$emit('setSelectedTerrain', value);
    },
    setSelectedDifficulty(value) {
      this.$emit('setSelectedDifficulty', value);
    },
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>

<template>
    <form class="form row justify-content-md-between py-5">
      <div class="col col-6 mb-3 mb-md-0">
        <div class="d-flex">
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="difficultyLevel" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Difficulty
            </button>
            <div class="dropdown-menu" aria-labelledby="difficultyLevel">
              <button @click.stop.prevent="setSelectedDifficulty('')" type="button" class="dropdown-item" :class="selectedDifficulty == '' ? 'active' : ''">Show All</button>
              <div class="dropdown-divider"></div>
              <button @click.stop.prevent="setSelectedDifficulty('Easy')" type="button" class="dropdown-item" :class="selectedDifficulty == 'Easy' ? 'active' : ''">Easy</button>
              <button @click.stop.prevent="setSelectedDifficulty('Moderate')" type="button" class="dropdown-item" :class="selectedDifficulty == 'Moderate' ? 'active' : ''">Moderate</button>
              <button @click.stop.prevent="setSelectedDifficulty('Strenuous')" type="button" class="dropdown-item" :class="selectedDifficulty == 'Strenuous' ? 'active' : ''">Strenuous</button>
            </div>
          </div>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="terrain" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Terrain
            </button>
            <div class="dropdown-menu" aria-labelledby="terrain">
              <button @click.stop.prevent="setSelectedTerrain('')" type="button" class="dropdown-item" :class="selectedTerrain == '' ? 'active' : ''">Show All</button>
              <div class="dropdown-divider"></div>
              <button @click.stop.prevent="setSelectedTerrain('Road')" type="button" class="dropdown-item" :class="selectedTerrain == 'Road' ? 'active' : ''">Road</button>
              <button @click.stop.prevent="setSelectedTerrain('Off-Road')" type="button" class="dropdown-item" :class="selectedTerrain == 'Off-Road' ? 'active' : ''">Off-Road</button>
              <button @click.stop.prevent="setSelectedTerrain('Mixed')" type="button" class="dropdown-item" :class="selectedTerrain == 'Mixed' ? 'active' : ''">Mixed</button>
            </div>
          </div>
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="distanceKM" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Distance
              </button>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="distanceKM">
                <button @click.stop.prevent="setSelectedDistanceMin('0'), setSelectedDistanceMax('9999')" type="button" class="dropdown-item" :class="selectedDistanceMin == '0' && selectedDistanceMax == '9999' ? 'active' : ''">Show All</button>
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
                  @click.stop.prevent="setSelectedDistanceMin('0'), setSelectedDistanceMax('19')" 
                  type="button" 
                  class="dropdown-item" 
                  :class="selectedDistanceMin == '0' && selectedDistanceMax == '19' ? 'active' : ''">
                    + 1 {{selectedDistanceType}}
                  </button>
                <button @click.stop.prevent="setSelectedDistanceMin('20'), setSelectedDistanceMax('39')" type="button" class="dropdown-item" :class="selectedDistanceMin == '20' && selectedDistanceMax == '39' ? 'active' : ''">+ 20 {{selectedDistanceType}}</button>
                <button @click.stop.prevent="setSelectedDistanceMin('40'), setSelectedDistanceMax('59')" type="button" class="dropdown-item" :class="selectedDistanceMin == '40' && selectedDistanceMax == '59' ? 'active' : ''">+ 40 {{selectedDistanceType}}</button>
                <button @click.stop.prevent="setSelectedDistanceMin('60'), setSelectedDistanceMax('79')" type="button" class="dropdown-item" :class="selectedDistanceMin == '60' && selectedDistanceMax == '79' ? 'active' : ''">+ 60 {{selectedDistanceType}}</button>
                <button @click.stop.prevent="setSelectedDistanceMin('80'), setSelectedDistanceMax('99')" type="button" class="dropdown-item" :class="selectedDistanceMin == '80' && selectedDistanceMax == '99' ? 'active' : ''">+ 80 {{selectedDistanceType}}</button>
                <button @click.stop.prevent="setSelectedDistanceMin('100'), setSelectedDistanceMax('9999')" type="button" class="dropdown-item" :class="selectedDistanceMin == '100' && selectedDistanceMax == '9999' ? 'active' : ''">+ 100 {{selectedDistanceType}}</button>
              </div>
          </div>
        </div>
      </div>
      <div class="col col-12 col-md-auto col-lg-4">
        <div class="input-group">
          <label class="sr-only" for="route-search-input">Search Routes</label>
            <div class="input-group-prepend">
              <span class="input-group-text bg-primary border border-primary"><i class="fa fa-search text-light"></i></span>
            </div>
          <input class="form-control" type="search" id="route-search-input" placeholder="Search routes" name="search" v-model="searchTerm" />
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
      selectedDistanceType: 'miles'
    };
  },
  watch: {
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
    'selectedDistanceMax'
  ],
  methods: {
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

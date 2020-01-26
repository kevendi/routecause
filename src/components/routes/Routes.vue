<template>
<div>
    <div class="container text-light">
        <section class="text-light pt-5 d-print-none">
            <div class="row position-sticky">
                <div class="col col-lg-5">
                    <regions-list 
                        :routes = 'routes' 
                        :regions = 'regions'
                        :selectedRegion = 'selectedRegion'
                        @highlightRegion = 'highlightRegion' 
                        @unhighlightRegion = 'unhighlightRegion' 
                        @setSelectedRegion = 'setSelectedRegion' 
                    />
                </div>
                <div class="col col-12 col-lg-6 offset-lg-1">
                    <regions-map
                        :selectedRegion = 'selectedRegion'
                        :highlightedRegion = 'highlightedRegion'
                        @highlightRegion = 'highlightRegion' 
                        @unhighlightRegion = 'unhighlightRegion' 
                        @setSelectedRegion = 'setSelectedRegion'
                    />
                </div>
            </div>
            
        </section>
        <routes-filters 
            @setSearchTerm='setSearchTerm'
            @setSelectedTerrain='setSelectedTerrain'
            @setSelectedDifficulty='setSelectedDifficulty'
            @setSelectedDistanceMin='setSelectedDistanceMin'
            @setSelectedDistanceMax='setSelectedDistanceMax'
            @setSelectedDistanceType='setSelectedDistanceType'
            :selectedTerrain='selectedTerrain'
            :selectedDifficulty='selectedDifficulty'
            :selectedDistanceMin='selectedDistanceMin'
            :selectedDistanceMax='selectedDistanceMax'
        />
        <routes-list 
          :routes = 'filteredRoutes' 
          @clearFilters='clearFilters'
        />
    </div>
    <regions-map-popup 
      :region = 'selectedRegion'
    />
    <regions-map-popup 
      :region = 'highlightedRegion'
    />
</div>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';
import RegionsList from './components/RegionsList'
import RegionsMap from './components/RegionsMap'
import RoutesFilters from './components/RoutesFilters'
import RoutesList from './components/RoutesList'
import RegionsMapPopup from './components/RegionsMapPopup'
export default {
  name: "Routes",
  components: {
      'regions-list': RegionsList,
      'regions-map': RegionsMap,
      'regions-map-popup': RegionsMapPopup,
      'routes-filters':RoutesFilters,
      'routes-list':RoutesList
  },
  data() {
    return {
        routes: [],
        regions: [],
        highlightedRegion: '',
        selectedRegion: '',
        selectedDifficulty: '',
        selectedTerrain: '',
        selectedDistanceMin: '0',
        selectedDistanceMax: '9999',
        selectedDistanceType: 'miles',
        searchTerm: ''
    };
  },
  computed: {
    searchedRoutes() {
      return this.routes.filter((route) => {
        return (
          (route.title.toLowerCase().match(this.searchTerm.toLowerCase()))
        )
      })
    },
    filteredRoutes() {
      return this.searchedRoutes.filter(route => {
        if(this.selectedRegion !== '') {
            return route.region.includes(this.selectedRegion['data-name'])
        }
        return route
      }).filter(route => {
        if(this.selectedTerrain !== '') {
            return route.terrain === this.selectedTerrain
        }
        return route
      }).filter(route => {
        if(this.selectedDistanceMax !== '') {
            if (this.selectedDistanceType === 'miles') {
                return parseInt(route.distanceMiles, 10) <= parseInt(this.selectedDistanceMax, 10)
            } else {
                return parseInt(route.distanceKilometres, 10) <= parseInt(this.selectedDistanceMax, 10)
            }
        }
        return route
      }).filter(route => {
        if(this.selectedDistanceMin !== '') {
            if (this.selectedDistanceType === 'miles') {
                return parseInt(route.distanceMiles, 10) >= parseInt(this.selectedDistanceMin, 10)
            } else {
                return parseInt(route.distanceKilometres, 10) >= parseInt(this.selectedDistanceMin, 10)
            }
        }
        return route
      }).filter(route => {
        if(this.selectedDifficulty !== '') {
            return route.difficultyLevel === this.selectedDifficulty
        }
        return route
      })
    }
  },
  props: [],
  methods: {
    clearSearchTerms() {
        this.searchTerms = '';
    },
    highlightRegion(region) {
        this.highlightedRegion = region;
    },
    unhighlightRegion() {
        this.highlightedRegion = '';
    },
    setSelectedRegion(region) {
        this.selectedRegion = region;
    },
    setSelectedDifficulty(difficulty) {
        this.selectedDifficulty = difficulty;
    },
    setSelectedTerrain(terrain) {
        this.selectedTerrain = terrain;
    },
    setSelectedDistanceMax(max) {
        this.selectedDistanceMax = max;
    },
    setSelectedDistanceMin(min) {
        this.selectedDistanceMin = min;
    },
    setSelectedDistanceType(type) {
        this.selectedDistanceType = type;
    },
    clearFilters() {
      this.highlightedRegion = '';
      this.selectedRegion = '';
      this.selectedDifficulty = '';
      this.selectedTerrain = '';
      this.selectedDistanceMin = '0';
      this.selectedDistanceMax = '9999';
      this.selectedDistanceType = 'miles';
      this.searchTerm = '';
    },
    getRegions() {
      let url = "../regions.json";
      return axios.get(url)
        .then(response => {
          this.regions = response.data;
        })
    },
    getRoutes() {
      let url = "../routes.json";
      return axios.get(url)
        .then(response => {
          this.routes = response.data;
        })
    },
    setSearchTerm(term) {
      this.searchTerm = term;
    }
  },
  mounted() {
    this.getRoutes();
    this.getRegions();
  }
};
</script>

<style lang="scss" scoped>
</style>

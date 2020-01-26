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
        ></routes-filters>
        <routes-list :routes = 'filteredRoutes'></routes-list>
    </div>
    <div ref="description" class="description"></div>
</div>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';
import RegionsList from './components/RegionsList'
import RegionsMap from './components/RegionsMap'
import RoutesFilters from './components/RoutesFilters'
import RoutesList from './components/RoutesList'
export default {
  name: "Routes",
  components: {
      'regions-list': RegionsList,
      'regions-map': RegionsMap,
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
  watch: {
    selectedRegion() {
        this.addMapPopup()
    },
    highlightedRegion() {
        this.addMapPopup()
    },
    unhighlightRegion() {
        this.removeMapPopup()
    }
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
    addMapPopup() {
      var popupText = '';
        if (this.selectedRegion !== '') {
            var popupText = this.selectedRegion['data-name']
            var description = this.$refs.description;
            var mapPath = document.getElementById(this.selectedRegion.id)
            description.classList.add('active');
            description.innerHTML = popupText;
            this.positionDescription(mapPath);
        } else if (this.highlightedRegion !== '') {
          var popupText = this.highlightedRegion['data-name']
          var description = this.$refs.description;
          var mapPath = document.getElementById(this.highlightedRegion.id)
          description.classList.add('active');
          description.innerHTML = popupText;
          this.positionDescription(mapPath);
        }
        else {
            this.removeMapPopup();
        }
    },
    removeMapPopup() {
      var description = this.$refs.description;
      description.innerHTML = "";
      description.classList.remove('active');
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
    positionDescription(region) {
        if (region) {
            var description = this.$refs.description;
            var svgRect = region.getBoundingClientRect();
            description.style.left = ((svgRect.x) + (svgRect.width/2)) + "px";
            description.style.top = (svgRect.y-60) + window.pageYOffset + "px";
        }
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
.description {
  background: white;
  border-radius: 5px;
  box-shadow: 0 0 0 1px #eee;
  color: #21669e;
  display: none;
  margin: 0 auto;
  padding: 10px 15px;
  pointer-events: none;
  position: absolute;
  text-align: center;
  transform: translateX(-50%);
  z-index: 1;
  &.active {
    display: block;
  }
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    top: 100%;
    width: 0;
    height: 0;
    margin-left: -10px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid white
  }
}
</style>

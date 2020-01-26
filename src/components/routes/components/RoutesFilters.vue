<template>
    <form class="form row justify-content-md-between py-5">
      <div class="col col-6 mb-3 mb-md-0">
        <div class="d-flex">
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="difficultyLevel" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Difficulty
            </button>
            <div class="dropdown-menu" aria-labelledby="difficultyLevel">
              <button @click="setDifficulty" type="button" class="dropdown-item" :class="difficulty == '' ? 'active' : ''" data-difficulty="">Show All</button>
              <div class="dropdown-divider"></div>
              <button @click="setDifficulty" type="button" class="dropdown-item" :class="difficulty == 'Easy' ? 'active' : ''" data-difficulty="Easy">Easy</button>
              <button @click="setDifficulty" type="button" class="dropdown-item" :class="difficulty == 'Moderate' ? 'active' : ''" data-difficulty="Moderate">Moderate</button>
              <button @click="setDifficulty" type="button" class="dropdown-item" :class="difficulty == 'Strenuous' ? 'active' : ''" data-difficulty="Strenuous">Strenuous</button>
            </div>
          </div>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="terrain" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Terrain
            </button>
            <div class="dropdown-menu" aria-labelledby="terrain">
              <button @click="setTerrain" type="button" class="dropdown-item" :class="terrain == '' ? 'active' : ''" data-terrain="">Show All</button>
              <div class="dropdown-divider"></div>
              <button @click="setTerrain" type="button" class="dropdown-item" :class="terrain == 'Road' ? 'active' : ''" data-terrain="Road">Road</button>
              <button @click="setTerrain" type="button" class="dropdown-item" :class="terrain == 'Off-Road' ? 'active' : ''" data-terrain="Off-Road">Off-Road</button>
              <button @click="setTerrain" type="button" class="dropdown-item" :class="terrain == 'Mixed' ? 'active' : ''" data-terrain="Mixed">Mixed</button>
            </div>
          </div>
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="distanceKM" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Distance
              </button>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="distanceKM">
                <button @click="setDistance" type="button" class="dropdown-item" :class="distanceMin == '' && distanceMax == '' ? 'active' : ''" data-distance-min="0" data-distance-max="9999">Show All</button>
                <div class="dropdown-divider"></div>
                <div class="form-check form-check-inline ml-3">
                  <input class="form-check-input" type="radio" id="miles" value="miles" name="distance-unit" v-model="distanceType">
                  <label class="form-check-label" for="miles">mi</label>
                </div>
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" id="kilometres" value="kilometres" name="distance-unit" v-model="distanceType">
                  <label class="form-check-label" for="kilometres">km</label>
                </div>
                <div class="dropdown-divider"></div>
                <button @click="setDistance" type="button" class="dropdown-item" :class="distanceMin == '0' && distanceMax == '19' ? 'active' : ''" data-distance-min="0" data-distance-max="19">+ 1 {{distanceType}}</button>
                <button @click="setDistance" type="button" class="dropdown-item" :class="distanceMin == '20' && distanceMax == '39' ? 'active' : ''" data-distance-min="20" data-distance-max="39">+ 20 {{distanceType}}</button>
                <button @click="setDistance" type="button" class="dropdown-item" :class="distanceMin == '40' && distanceMax == '59' ? 'active' : ''" data-distance-min="40" data-distance-max="59">+ 40 {{distanceType}}</button>
                <button @click="setDistance" type="button" class="dropdown-item" :class="distanceMin == '60' && distanceMax == '79' ? 'active' : ''" data-distance-min="60" data-distance-max="79">+ 60 {{distanceType}}</button>
                <button @click="setDistance" type="button" class="dropdown-item" :class="distanceMin == '80' && distanceMax == '99' ? 'active' : ''" data-distance-min="80" data-distance-max="99">+ 80 {{distanceType}}</button>
                <button @click="setDistance" type="button" class="dropdown-item" :class="distanceMin == '100' && distanceMax == '9999' ? 'active' : ''" data-distance-min="100" data-distance-max="9999">+ 100 {{distanceType}}</button>
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
          <input class="form-control" type="search" id="route-search-input" placeholder="Search routes" name="search" />
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
      distanceType: "miles",
      distanceMax: "",
      distanceMin: "",
      terrain: "",
      difficulty: ""
    };
  },
  computed: {},
  props: [],
  methods: {
    setDistance(e) {
      e.stopPropagation();
      this.distanceMin = e.currentTarget.dataset.distanceMin
      this.distanceMax = e.currentTarget.dataset.distanceMax
    },
    setTerrain(e) {
      e.stopPropagation();
      this.terrain = e.currentTarget.dataset.terrain
    },
    setDifficulty(e) {
      e.stopPropagation();
      this.difficulty = e.currentTarget.dataset.difficulty
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>

</style>

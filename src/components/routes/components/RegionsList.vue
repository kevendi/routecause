<template>
  <ul class="list-unstyled ml-n2 row cols sticky-top">
    <li v-for="(region, index) in regions" :key="index">
      <button 
        data-map-trigger 
        :data-map-target="region.id" 
        class="btn btn-link btn-outline-primary m-1 d-flex justify-content-between align-items-center">
          {{region['data-name']}}
          <span 
            class="badge badge-pill ml-2"
            :class="regionRouteCount(region['data-name']) == 0 ? 'text-muted badge-secondary' : 'badge-primary'"
            >
              {{regionRouteCount(region['data-name'])}}
            </span>
      </button>
    </li>
  </ul>
</template>

<script>
import axios from 'axios';
export default {
  name: "RegionsList",
  components: {},
  data() {
    return {
      regions: [],
      routes: []
    };
  },
  computed: {
  },
  props: [],
  methods: {
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
    regionRouteCount(region) {
      var regionRouteCount = 0;
      this.routes.map(route => {
        if (route.region.includes(region)) {
          regionRouteCount += 1;
        }
      })
      return regionRouteCount;
    }
  },
  mounted() {
    this.getRegions();
    this.getRoutes();
  }
};
</script>

<style lang="scss" scoped>

</style>

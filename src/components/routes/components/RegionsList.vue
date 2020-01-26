<template>
  <ul class="list-unstyled ml-n2 row cols sticky-top">
    <li v-for="(region, index) in regions" :key="index">
      <button 
        @mouseenter="highlightRegion(region)"
        @mouseleave="unhighlightRegion()"
        @click="setSelectedRegion(region)"
        class="btn btn-sm btn-link btn-outline-primary m-1 d-flex justify-content-between align-items-center"
        :class="region['data-name'] === selectedRegion['data-name'] ? 'active' : ''"
        >
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
    return {};
  },
  watch: {
    selectedRegion() {},
    highlightedRegion() {},
  },
  computed: {
  },
  props: [
    'routes',
    'regions',
    'selectedRegion'
  ],
  methods: {
    highlightRegion(region) {
      this.$emit('highlightRegion', region);
    },
    unhighlightRegion() {
      this.$emit('unhighlightRegion');
    },
    setSelectedRegion(region) {
      if (region.id == this.selectedRegion.id) {
        this.$emit('setSelectedRegion', '');
      } else {
        this.$emit('setSelectedRegion', region);
      }
    },
    regionRouteCount(regionName) {
      var regionRouteCount = 0;
      this.routes.map(route => {
        if (route.region.includes(regionName)) {
          regionRouteCount += 1;
        }
      })
      return regionRouteCount;
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>

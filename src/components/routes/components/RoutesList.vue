<template>
  <ul class="list-unstyled row">
    <li class="col col-md-6 mb-3" v-for="(route, index) in routes" :key="index">
      <div class="media bg-dark text-light border border-secondary">
        <div class="media-image-wrapper scrim float-left">
            <img :src="route.heroImagePath+'?nf_resize=smartcrop&w=150'" :alt="route.heroImageAlt" loading="lazy" width="150"/>
        </div>
        <div class="media-body p-3">
          <h2 class="h5"><a class="stretched-link" :href="route.url">{{ route.title }}</a></h2>
          <dl class="text-muted mb-0">
            <dt class="sr-only">Region</dt>
            <dd class="mb-0">{{ route.region }}</dd>
            <dt class="sr-only">Terrain</dt>
            <dd class="mb-0">{{ route.terrain }}</dd>
            <dt class="sr-only">Difficulty</dt>
            <dd class="mb-0">{{ route.difficultyLevel }}</dd>
            <dt class="sr-only">Distance</dt>
            <dd class="mb-0">{{ route.distanceMiles }} mi / {{ route.distanceKilometres }} km</dd>
          </dl>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import axios from 'axios';
export default {
  name: "RoutesList",
  components: {},
  data() {
    return {
      routes: []
    };
  },
  computed: {},
  props: [],
  methods: {
    getRoutes() {
      let url = "../routes.json";
      return axios.get(url)
        .then(response => {
          this.routes = response.data;
        })
    }
  },
  mounted() {
    this.getRoutes();
  }
};
</script>

<style lang="scss" scoped>
</style>

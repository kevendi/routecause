<template>
  <ul class="list-unstyled row">
    <li class="col mb-3" v-if="!routes.length">
      <div class="media bg-dark text-light border border-secondary">
        <div class="media-body p-3 d-flex align-items-center">
          <h2 class="h5">There are no routes available.</h2>
          <button @click="clearFilters" class="btn btn-link btn-outline-primary ml-3">Clear all filters</button>
        </div>
      </div>
    </li>
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
  props: [
    'routes'
  ],
  methods: {
    clearFilters() {
      this.$emit('clearFilters');
    }
  }
};
</script>

<style lang="scss" scoped>
.media {
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  animation: card-fade-in 250ms forwards ease-in-out,
  card-bounce-in 375ms cubic-bezier(0,0.615,0.29,1.285);
}

@keyframes card-fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes card-bounce-in {
  from {
    transform: translateY(20px) scale3d(0.6, 0.8, 0.8);
  }

  to {
    transform: translateY(0) scale3d(1,1,1);
  }
}
</style>

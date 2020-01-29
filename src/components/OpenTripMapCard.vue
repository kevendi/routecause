<template>
    <div class="card bg-dark border border-secondary">
        <div class="card-body">
            <h3 class="card-title h5" v-html="feature.properties.name"></h3>
        </div>
    </div>
</template>

<script>
export default {
  name: "OpenTripMapCard",
  data() {
    return {
    };
  },
  props: [
      'feature'
  ],
  computed: {

  },
  methods: {

  },
};
</script>

<style lang="scss" scoped>

.card {
  border: none;
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

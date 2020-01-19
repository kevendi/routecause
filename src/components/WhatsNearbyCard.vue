<template>
    <div class="card bg-dark border border-secondary">
        <img :src="feature.properties.formattedImage" class="card-img-top" :alt="feature.properties.name + feature.properties.productType.value" loading="lazy" width="auto"/>
        <div class="card-body">
            <h3 class="card-title h5" v-html="feature.properties.name"></h3>
            <strong class="card-text">
                <template v-if="feature.properties.featureHasStarGradingRange">
                *<span>{{feature.properties.minStars}}-{{feature.properties.maxStars}}</span> <span class="font-weight-light">|</span>  
                </template>
                <template v-if="feature.properties.featureHasStarGrading">
                <span v-for="(item,starIndex) in feature.properties.maxStars" :key="starIndex">*</span> <span class="font-weight-light">|</span> 
                </template>
                {{feature.properties.locationName}} <template v-if="feature.properties.category && feature.properties.productType.key !== 'even'"><span class="font-weight-light">|</span>  {{feature.properties.category}}</template>
            </strong>
            <p class="card-text" v-html="feature.properties.description"></p>
            <dl>
                <template v-if="feature.properties.formattedPrices">
                    <dt>{{feature.properties.formattedPrices.label}}</dt>
                    <dd>{{feature.properties.formattedPrices.price}} <span v-if="feature.properties.formattedPrices.basis">- {{feature.properties.formattedPrices.basis.value}}</span></dd>
                </template>
                <template v-if="feature.properties.formattedDates">
                    <dt>{{feature.properties.formattedDates.label}}</dt>
                    <dd>{{feature.properties.formattedDates.date}}</dd>
                </template>
                <template v-if="feature.properties.facilities">
                    <dt>Facilities</dt>
                    <dd class="d-inline" v-for="(facility, facIndex) in feature.properties.formattedFacilities" :key="facIndex">{{facility.value}}<template v-if="facIndex != feature.properties.formattedFacilities.length - 1">, </template></dd>
                </template>
                <template v-if="feature.properties.formattedAddress">
                    <dt>Address</dt>
                    <dd>
                    <a :href="feature.properties.googleMapsLink" target="_blank" title="Get Directions" rel="noreferrer">{{feature.properties.formattedAddress}}</a>
                    </dd>
                </template>
                <template v-if="feature.properties.telephoneNumber">
                    <dt>Telephone</dt>
                    <dd>
                        <a class="d-md-none" :href="'tel:' + feature.properties.formattedPhone">Call {{feature.properties.telephoneNumber}}</a>
                        <span class="d-none d-md-block">
                            {{feature.properties.telephoneNumber}}
                        </span>
                    </dd>
                </template>
                <template v-if="feature.properties.email">
                    <dt>Email</dt>
                    <dd><a :href="'mailto:' + feature.properties.email" target="_blank">{{feature.properties.email}}</a></dd>
                </template>
            </dl>
        </div>
        <div class="card-footer d-flex justify-content-around">
        <template v-if="feature.properties.website">
            <a class="btn btn-lg btn-info" :href="feature.properties.website" target="_blank" rel="noreferrer">Visit Website</a>
        </template>
        <template v-if="feature.properties.bookingUrl">
            <a class="btn btn-lg btn-primary" :href="feature.properties.bookingUrl" target="_blank" rel="noreferrer">Booking Link</a>
        </template>
        </div>
    </div>
</template>

<script>
export default {
  name: "WhatsNearbyCard",
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

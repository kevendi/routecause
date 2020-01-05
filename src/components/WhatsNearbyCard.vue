<template>
    <div class="card">
        <img :src="feature.properties.formattedImage" class="card-img-top" :alt="feature.properties.name">
        <div class="card-body">
            <h3 class="card-title h5" v-html="feature.properties.name"></h3>
            <strong class="card-text">
                <template v-if="feature.properties.featureHasStarGradingRange">
                *<span>{{feature.properties.minStars}}-{{feature.properties.maxStars}}</span> | 
                </template>
                <template v-if="feature.properties.featureHasStarGrading">
                <span class="text-primary" v-for="(item,starIndex) in feature.properties.maxStars" :key="starIndex">*</span> | 
                </template>
                {{feature.properties.locationName}} | {{feature.properties.category}}
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
                <template v-if="feature.properties.addressLine1 && feature.properties.addressLine1 !== '.null'">
                    <dt>Address</dt>
                    <dd>
                    <a :href="feature.properties.googleMapsLink" target="_blank" title="Get Directions">{{feature.properties.formattedAddress}}</a>
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
        <template v-if="feature.properties.website">
            <a class="btn btn-primary btn-lg btn-block m-0" :href="feature.properties.website" target="_blank">Visit Website</a>
        </template>
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

</style>

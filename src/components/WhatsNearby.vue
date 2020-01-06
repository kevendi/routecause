<template>
  <div class="container">
      <div class="d-lg-flex align-items-center justify-content-between">
        <h2 class="mb-3">What's Nearby</h2>
        <div>
          <div class="input-group">
            <form class="form-inline">
              <label class="mr-3" for="search">Search</label>
              <input id="search" v-model="searchTerms" type="search" class="search-input form-control form-control-lg ml-md-3" />
            </form>
            <div class="input-group-append" v-if="searchTerms.length">
              <button class="btn btn-primary" @click.prevent="clearSearchTerms()">
                Clear Search
              </button>
            </div>
          </div>
      </div>
    </div>
      <nav>
        <div class="nav nav-tabs py-5" id="nav-tab" role="tablist">
          <a
            class="nav-item nav-link h5 active"
            :class="{disabled: !accoFeatures.length}"
            :disabled="!accoFeatures.length"
            id="nav-acco-tab"
            data-toggle="tab"
            href="#nav-acco"
            role="tab"
            aria-controls="nav-acco"
            aria-selected="true"
          >Accommodation</a>
          <a
            class="nav-item nav-link h5"
            :class="{disabled: !actiFeatures.length}"
            :disabled="!actiFeatures.length"
            id="nav-acti-tab"
            data-toggle="tab"
            href="#nav-acti"
            role="tab"
            aria-controls="nav-acti"
            aria-selected="false"
          >Activities</a>
          <a
            class="nav-item nav-link h5"
            :class="{disabled: !attrFeatures.length}"
            :disabled="!attrFeatures.length"
            id="nav-attr-tab"
            data-toggle="tab"
            href="#nav-attr"
            role="tab"
            aria-controls="nav-attr"
            aria-selected="false"
          >Attractions</a>
          <a
            class="nav-item nav-link h5"
            :class="{disabled: !evenFeatures.length}"
            :disabled="!evenFeatures.length"
            id="nav-even-tab"
            data-toggle="tab"
            href="#nav-even"
            role="tab"
            aria-controls="nav-even"
            aria-selected="false"
          >Events</a>
          <a
            class="nav-item nav-link h5"
            :class="{disabled: !cateFeatures.length}"
            :disabled="!cateFeatures.length"
            id="nav-cate-tab"
            data-toggle="tab"
            href="#nav-cate"
            role="tab"
            aria-controls="nav-cate"
            aria-selected="false"
          >Food and Drink</a>
          <a
            class="nav-item nav-link h5"
            :class="{disabled: !retaFeatures.length}"
            :disabled="!retaFeatures.length"
            id="nav-reta-tab"
            data-toggle="tab"
            href="#nav-reta"
            role="tab"
            aria-controls="nav-reta"
            aria-selected="false"
          >Shopping</a>
        </div>
      </nav>
    <div class="tab-content" id="nav-tabContent" v-if="!isLoading">
      <div class="tab-pane active fade show" role="tabpanel" id="nav-acco" aria-labelledby="nav-acco-tab">
        <div class="card-columns"  v-if="accoFeatures.length">
          <whats-nearby-card 
            v-for="(accoFeature, accoIndex) in accoFeatures" 
            :key="accoIndex" 
            :feature="accoFeature">
          </whats-nearby-card>
        </div>
      </div>
      <div class="tab-pane fade show" role="tabpanel" id="nav-acti" aria-labelledby="nav-acti-tab">
        <div class="card-columns" v-if="actiFeatures.length">
          <whats-nearby-card 
            v-for="(actiFeature, actiIndex) in actiFeatures" 
            :key="actiIndex" 
            :feature="actiFeature">
          </whats-nearby-card>
        </div>
      </div>
      <div class="tab-pane fade show" role="tabpanel" id="nav-attr" aria-labelledby="nav-attr-tab">
        <div class="card-columns">
          <whats-nearby-card 
            v-for="(attrFeature, attrIndex) in attrFeatures" 
            :key="attrIndex" 
            :feature="attrFeature">
          </whats-nearby-card>
        </div>
      </div>
      <div class="tab-pane fade show" role="tabpanel" id="nav-even" aria-labelledby="nav-even-tab">
        <div class="card-columns">
          <whats-nearby-card 
            v-for="(evenFeature, evenIndex) in evenFeatures" 
            :key="evenIndex" 
            :feature="evenFeature">
          </whats-nearby-card>
        </div>
      </div>
      <div class="tab-pane fade show" role="tabpanel" id="nav-cate" aria-labelledby="nav-cate-tab">
        <div class="card-columns">
          <whats-nearby-card 
            v-for="(cateFeature, cateIndex) in cateFeatures" 
            :key="cateIndex" 
            :feature="cateFeature">
          </whats-nearby-card>
          <h3 class="danger">Oops!</h3>
            <p>There are no food and drink results</p>
        </div>
      </div>
      <div class="tab-pane fade show" role="tabpanel" id="nav-reta" aria-labelledby="nav-reta-tab">
        <div class="card-columns">
          <whats-nearby-card 
            v-for="(retaFeature, retaIndex) in retaFeatures" 
            :key="retaIndex" 
            :feature="retaFeature">
          </whats-nearby-card>
          <h3 class="danger">Oops!</h3>
            <p>There are no shopping results</p>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';
import WhatsNearbyCard from './WhatsNearbyCard'
import _ from 'lodash';

export default {
  name: "WhatsNearby",
  components: {
    'whats-nearby-card': WhatsNearbyCard
  },
  data() {
    return {
      isLoading: true,
      products: [],
      labels: {
        product: {
          types: {
            acco: "Accommodation",
            acti: "Activities",
            attr: "Attractions",
            even: "Events",
            cate: "Food and Drink",
            reta: "Shopping"
          },
          basis: {
            pp: "per pitch per night",
            pppn: "per person per night",
            prpn: "per room per night",
            pupn: "per unit per night",
            pupw: "per unit per week"
          },
          facilities: {
            accessparkdrop: "Accessible Parking and Dropoff",
            audioloop: "Audio Loop",
            dsblaccess: "Disabled Access",
            parking: "Parking",
            petswelcom: "Pets Welcome",
            wifi: "WiFi"
          }
        }
      },
      searchTerms: ''
    };
  },
  watch: {
    searchTerms: () => {

    },
    features: () => {
        
    }
  },
  computed: {
    features() {
      if (!this.products) {
        return null
      }
      let features = this.products;
      features.forEach(feature => {
        feature.properties.formattedSortName = this.getFeatureFormattedSortName(feature.properties.name);
      })
      return features;
    },
    filteredFeatures() {
      return this.features.filter(feature => {
        return this.filterBySearchTerms(feature);
      })
    },
    accoFeatures() {
      return this.sortedFeatures.filter(feature => {
        return this.filterByProductType(feature, 'acco');
      })
    },
    actiFeatures() {
      return this.sortedFeatures.filter(feature => {
        return this.filterByProductType(feature, 'acti');
      })
    },
    attrFeatures() {
      return this.sortedFeatures.filter(feature => {
        return this.filterByProductType(feature, 'attr');
      })
    },
    cateFeatures() {
      return this.sortedFeatures.filter(feature => {
        return this.filterByProductType(feature, 'cate');
      })
    },
    evenFeatures() {
      return this.sortedFeatures.filter(feature => {
        return this.filterByProductType(feature, 'even');
      })
    },
    retaFeatures() {
      return this.sortedFeatures.filter(feature => {
        return this.filterByProductType(feature, 'reta');
      })
    },
    sortedFeatures() {
      let sortedFeatures = _.orderBy(this.filteredFeatures, (feature) => {
        return feature.properties.formattedSortName;
      }, 'asc')
      return sortedFeatures;
    }
  },
  methods: {
    clearSearchTerms() {
      this.searchTerms = '';
    },
    filterByProductType(feature, productType) {
      return feature.properties.productType.key === productType;
    },
    filterBySearchTerms(feature) {
      return (
        (feature.properties.name.toLowerCase().match(this.searchTerms.toLowerCase())) ||
        (feature.properties.category.toLowerCase().match(this.searchTerms.toLowerCase())) ||
        (feature.properties.locationName.toLowerCase().match(this.searchTerms.toLowerCase())) ||
        (feature.properties.facilities.toLowerCase().match(this.searchTerms.toLowerCase())) ||
        (feature.properties.description.toLowerCase().match(this.searchTerms.toLowerCase()))
      )
    },
    getFeatureFormattedAddress(feature) {
      let formattedAddress = null;
      if (feature.properties.addressLine1 !== null) {
        formattedAddress = feature.properties.addressLine1.split('.').join(' ');
      }
      return formattedAddress;
    },
    getFeatureFormattedDates(feature) {
      let formattedDates = null;
      if (feature.properties.productType.key === 'even') {
        let dp_locale = document.documentElement.lang.substring(0, 2)

        if (['de', 'es', 'fr', 'it', 'nl'].indexOf(dp_locale)) {
          moment.locale(dp_locale)
        }

        let formattedDateObject = {};
        if (feature.properties.startDate === feature.properties.endDate) {
          formattedDateObject.label = 'Date:';
        } else {
          formattedDateObject.label = 'Dates from:';
        }
        formattedDateObject.date = moment(feature.properties.startDate).format('DD MMM YYYY');
        formattedDates = formattedDateObject;
      }
      return formattedDates;
    },
    getFeatureFormattedFacilities(feature) {
      let formattedFacilities = null;
      if (feature.properties.facilities !== null) {
        var lookup = this.labels.product.facilities;
        let facilitiesArray = [];
        feature.properties.facilities.split(',').map(facility => {
          Object.entries(lookup).forEach(([key, value]) => {
            if (key == facility) {
              let facilitiesObject = {};
              facilitiesObject.key = key;
              facilitiesObject.value = value;
              facilitiesArray.push(facilitiesObject);
            }
          })
        })
        formattedFacilities = facilitiesArray;
      }
      return formattedFacilities;
    },
    getFeatureFormattedImage(feature) {
      let featureFormattedImage = null;
      if (feature.properties.image) {
        featureFormattedImage = feature.properties.image.replace(/\[(.+?)\]/g, '[ToFit300x200]');
      }
      return featureFormattedImage;
    },
    getFeatureFormattedPhone(feature) {
      let formattedPhone = null;
      if (feature.properties.telephoneNumber) {
        formattedPhone = feature.properties.telephoneNumber.replace(/\D/g,'');
      }
      return formattedPhone;
    },
    getFeatureFormattedProductType(type) {
      let formattedProductType = {};
      if (type !== null) {
        var lookup = this.labels.product.types;
          Object.entries(lookup).forEach(([key, value]) => {
            if (key == type) {
              formattedProductType.key = key;
              formattedProductType.value = value;
            }
          })
      }
      return formattedProductType;
    },
    getFeatureFormattedPrices(feature) {
      let formattedPrices = null;
      if (feature.properties.price !== null) {
        let formattedPriceObject = {};
        formattedPriceObject.label = (feature.properties.multiplePrices || feature.properties.basis) ? 'Prices from' : 'Price';
        formattedPriceObject.price = '£' + Number.parseFloat(feature.properties.price).toFixed(2);
        if (feature.properties.basis) {
          var lookup = this.labels.product.basis;
          Object.entries(lookup).forEach(([key, value]) => {
            if (key == feature.properties.basis) {
              let basisObject = {};
              basisObject.key = key;
              basisObject.value = value;
              formattedPriceObject.basis = basisObject;
            }
          })
        }
        formattedPrices = formattedPriceObject;
      }
      return formattedPrices;
    },
    getFeatureFormattedSortName(name) {
      let formattedSortName = null;
      if (name) {
        var stripThe = name.replace(/^The/i, '');
        var toLower = stripThe.toLowerCase();
        var stripDigitAlpha = toLower.replace(/\d+[a-z]/ig, '');
        var stripDigitSlash = stripDigitAlpha.replace(/\d+\//g, '');
        var stripDigit = stripDigitSlash.replace(/\d+/g, '');
        var stripNonAlpha = stripDigit.replace(/\W/g, '');
        var finalTransform = stripNonAlpha;
        if (finalTransform !== '') {
          formattedSortName = finalTransform;
        }
      }
      return formattedSortName;
    },
    getFeatureFormattedWebsite(feature) {
      let formattedWebsite = null;
      if (feature.properties.website) {
        return formattedWebsite = feature.properties.website.replace(/(http|https)?:\/\/(www\.)*/, '');
      }
      return formattedWebsite;
    },
    getFeatureGoogleMapsLink(feature) {
      //9 -11 Belmont Street.AB10 1JR
      let googleMapsLink = null;
      if (feature.properties.addressLine1 !== null) {
        googleMapsLink = 'https://www.google.com/maps/place/' + feature.properties.addressLine1.split(' ').join('+').split('.').join('+').split(',').join('');
      }
      return googleMapsLink;
    },
    getFeatureHasStarGrading(feature) {
      let featureHasStarGrading = false;
      if ((feature.properties.minStars === feature.properties.maxStars) && (feature.properties.minStars !== 0)) {
        featureHasStarGrading = true;
      }
      return featureHasStarGrading;
    },
    getFeatureHasStarGradingRange(feature) {
      let featureHasStarGradingRange = false;
      if ((feature.properties.minStars !== feature.properties.maxStars) && (feature.properties.minStars !== 0)) {
        featureHasStarGradingRange = true;
      }
      return featureHasStarGradingRange;
    },
    getProducts() {
      var prodTypes = ["acco", "acti", "attr", "even", "cate", "reta"];
      axios.all(prodTypes.map(type => {
        let url = "http://www.routecause.org/assets/json/" + type + ".json";
        return axios.get(url)
          .then(response => {
            response.data.features.map(feature => {
              feature.properties.productType = this.getFeatureFormattedProductType(type);
              feature.properties.icon = 'icon-'+type;
              this.products.push(feature);
            });
          })
      }))
      .then(this.getProductDataBatch);
    },
    getProductDataBatch() {
      this.products.map((feature) => {
        if((feature.properties.category === undefined)) {
          this.getProductData(feature.properties.id);
        }
      })
    },
    getProductData(productID) {
      axios.all(this.products.map((feature, index) => {
        if ((feature.properties.id === productID) && (feature.properties.category === undefined)) {
          return axios.get("http://www.routecause.org/assets/json/" + productID+ ".json")
          .then(response => {
            let obj = Object.assign({}, feature.properties, response.data.data[0]);
            feature.properties = obj;
            feature.properties.formattedAddress = this.getFeatureFormattedAddress(feature);
            feature.properties.formattedDates = this.getFeatureFormattedDates(feature);
            feature.properties.formattedFacilities = this.getFeatureFormattedFacilities(feature);
            feature.properties.formattedImage = this.getFeatureFormattedImage(feature);
            feature.properties.googleMapsLink = this.getFeatureGoogleMapsLink(feature);
            feature.properties.formattedPrices = this.getFeatureFormattedPrices(feature);
            feature.properties.formattedPhone = this.getFeatureFormattedPhone(feature);
            feature.properties.formattedWebsite = this.getFeatureFormattedWebsite(feature);
            feature.properties.featureHasStarGrading = this.getFeatureHasStarGrading(feature);
            feature.properties.featureHasStarGradingRange = this.getFeatureHasStarGradingRange(feature);
            this.products[index].properties = feature.properties;
          })
        }
      }))
      .then(this.isLoading = false)
    }
  },
  mounted() {
    this.getProducts();
  }
};
</script>

<style lang="scss" scoped>
.tab-content {
  position: relative;
  height: 80vh;
  overflow-y: scroll;
}
</style>

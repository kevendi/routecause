<template>
  <div class="container">
    <div class="d-lg-flex align-items-center justify-content-between">
      <h2 class="mb-3">What's Nearby</h2>
      <div>
        <div class="input-group" v-if="products.length">
          <form class="form-inline">
            <label class="mr-3" for="search">Search</label>
            <input id="search" v-model="searchTerms" type="search" class="search-input form-control form-control-lg ml-md-3" />
            <div class="input-group-append" v-if="searchTerms.length">
            <button class="btn btn-primary btn-lg" @click.prevent="clearSearchTerms()">
              Clear Search
            </button>
          </div>
          </form>
        </div>
      </div>
    </div>
    <nav class="sticky-top">
      <div class="nav nav-tabs py-5" id="nav-tab" role="tablist">
        <a
          v-for="(label, key) in labels.product.types" :key="key"
          class="nav-link h5 nav-`${key}`"
          :id="'nav-'+key+'-tab'"
          data-toggle="tab"
          :href="'#nav-'+key"
          role="tab"
          :aria-controls="'nav-'+key"
          :aria-selected="key=='acco'"
        >{{label}}</a>
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
        <div v-else>
          <p class="h5 text-primary">Sorry, there's currently no accommodation to show for this location. You'll just have to sleep in a tent.</p>
          <small><strong>Disclaimer:</strong> This feature of the website isn't really for real yet.</small>
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
        <div v-else>
          <p class="h5 text-primary">Sorry, there are currently no activities to show for this location. But isn't cycling enough of an activity?</p>
          <small><strong>Disclaimer:</strong> This feature of the website isn't really for real yet.</small>
        </div>
      </div>
      <div class="tab-pane fade show" role="tabpanel" id="nav-attr" aria-labelledby="nav-attr-tab">
        <div class="card-columns" v-if="attrFeatures.length">
          <whats-nearby-card 
            v-for="(attrFeature, attrIndex) in attrFeatures" 
            :key="attrIndex" 
            :feature="attrFeature">
          </whats-nearby-card>
        </div>
        <div v-else>
          <p class="h5 text-primary">Sorry, there are currently no attractions to show for this location.</p>
          <small><strong>Disclaimer:</strong> This feature of the website isn't really for real yet.</small>

        </div>
      </div>
      <div class="tab-pane fade show" role="tabpanel" id="nav-cate" aria-labelledby="nav-cate-tab">
        <div class="card-columns" v-if="cateFeatures.length">
          <whats-nearby-card 
            v-for="(cateFeature, cateIndex) in cateFeatures" 
            :key="cateIndex" 
            :feature="cateFeature">
          </whats-nearby-card>
        </div>
        <div v-else>
          <p class="h5 text-primary">Sorry, there is currently no food and drink to show for this location. You'll just have to go to the grocery store.</p>
          <small><strong>Disclaimer:</strong> This feature of the website isn't really for real yet.</small>
        </div>
      </div>
      <div class="tab-pane fade show" role="tabpanel" id="nav-even" aria-labelledby="nav-even-tab">
        <div class="card-columns" v-if="evenFeatures.length">
          <whats-nearby-card 
            v-for="(evenFeature, evenIndex) in evenFeatures" 
            :key="evenIndex" 
            :feature="evenFeature">
          </whats-nearby-card>
        </div>
        <div v-else>
          <p class="h5 text-primary">Sorry, there are currently no events to show for this location.</p>
          <small><strong>Disclaimer:</strong> This feature of the website isn't really for real yet.</small>
        </div>
      </div>
      <div class="tab-pane fade show" role="tabpanel" id="nav-reta" aria-labelledby="nav-reta-tab">
        <div class="card-columns" v-if="retaFeatures.length">
          <whats-nearby-card 
            v-for="(retaFeature, retaIndex) in retaFeatures" 
            :key="retaIndex" 
            :feature="retaFeature">
          </whats-nearby-card>
        </div>
        <div v-else>
          <p class="h5 text-primary">Sorry, there is currently no shopping to show for this location. You're supposed to be riding your bike anyway and not shopping.</p>
          <small><strong>Disclaimer:</strong> This feature of the website isn't really for real yet.</small>
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

if (!Object.entries)
  Object.entries = function( obj ){
    var ownProps = Object.keys( obj ),
        i = ownProps.length,
        resArray = new Array(i); // preallocate the Array
    while (i--)
      resArray[i] = [ownProps[i], obj[ownProps[i]]];

    return resArray;
};

if (!Number.isNaN) {
  Object.defineProperty(Number, 'isNaN', {
    value: function(value) {     
      return value !== value;
    }
  });
}

export default {
  name: "WhatsNearby",
  components: {
    'whats-nearby-card': WhatsNearbyCard
  },
  data() {
    return {
      isLoading: true,
      products: [],
      devListAccessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMWU2YTk0MzYtZDhiNy00NzE4LWE2NWEtY2JjM2NkMDg1NTRiIiwia2V5X2lkIjoiNGM2ZjQ2OTYtZWZmMS00ZjkyLTgxMmQtZjczNTEzN2VhMWI2IiwiaWF0IjoxNTc5OTY3NDE5fQ.-MsUj3tx8JN846nM9fDoPqr4INDP3I4TLW94gtkToA8",
      labels: {
        product: {
          types: {
            acco: "Accommodation",
            acti: "Activities",
            attr: "Attractions",
            cate: "Food and Drink",
            even: "Events",
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
      placeholderImagePath: '/assets/images/imagePlaceholder.png',
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
  props: [
      'locationName'
  ],
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
    formatEventProperties(response) {
      var events = response.data;
      events.map(event => {
          event.schedules[0].performances.map(performance => {
            var featureObj = {};
            featureObj.properties = {};
            featureObj.properties.productType = this.getFeatureFormattedProductType('even');
            featureObj.properties.icon = 'icon-even';
            
            featureObj.properties.name = event.name;
            if (event.images) {
              featureObj.properties.formattedImage = event.images[0].url;
              featureObj.properties.alt_text = (event.images[0].alt_text.length) ? event.images[0].alt_text : event.name + 'event image';
            } else if (event.schedules.images) {
              featureObj.properties.formattedImage = event.schedules[0].images[0].url;
              featureObj.properties.alt_text = event.schedules[0].images[0].alt_text;
            } else {
              featureObj.properties.formattedImage = this.placeholderImagePath;
              featureObj.properties.alt_text = null;
            }
            featureObj.properties.locationName = event.schedules[0].place.town;
            featureObj.properties.latitude = event.schedules[0].place.lat;
            featureObj.properties.longitude = event.schedules[0].place.lng;
            featureObj.properties.facilities = "";
            let place_name = (event.schedules[0].place.name.length  > 0) ? event.schedules[0].place.name + ', '  : '';
            let address = (event.schedules[0].place.address.length  > 0) ? event.schedules[0].place.address + ', '  : '';
            let town = (event.schedules[0].place.town.length  > 0) ? event.schedules[0].place.town + ', '  : '';
            let postal_code = (event.schedules[0].place.postal_code.length  > 0) ? event.schedules[0].place.postal_code  : '';
            featureObj.properties.formattedAddress = place_name + address + town + postal_code;
            featureObj.properties.googleMapsLink = 'https://www.google.com/maps/place/' + featureObj.properties.formattedAddress;
            featureObj.properties.even = true;
            featureObj.properties.minStars = null;
            featureObj.properties.maxStars = null;
            featureObj.properties.website = event.website;
            featureObj.properties.description = (event.descriptions.length > 0) ? event.descriptions[0].description : null;
            featureObj.properties.category = event.tags.map(item => {
              return item;
            }).join(', ');
            let prices = [];
            if(performance.tickets) {
              performance.tickets.map(ticket => {
                if(ticket.min_price) {
                  prices.push(ticket.max_price);
                  return prices.push(ticket.min_price);
                }
                return;
              });
            }
            featureObj.properties.price = prices.length ? prices.sort()[0] : null;
            featureObj.properties.multiplePrices = (prices.length > 0) ? true : false;
            featureObj.properties.formattedPrices = this.getFeatureFormattedPrices(featureObj)
            featureObj.properties.id = event.event_id;
            featureObj.properties.startDate = performance.ts;
            featureObj.properties.endDate = performance.ts;
            featureObj.properties.formattedDates = this.getFeatureFormattedDates(featureObj)
            featureObj.properties.bookingUrl = (performance.links.length > 0) ? performance.links[0].url : null;
            if ((featureObj.properties.category.length === 1) && (featureObj.properties.category === 'film')) {
              return 
            } else {
              return this.products.push(featureObj);
            }
          })
        })
    },
    getEvents() {
      var minDate = moment().format("YYYY-MM-DD");
      var maxDate = moment().add(1, 'years').format("YYYY-MM-DD");
      var AuthStr = 'Bearer ' + this.devListAccessToken;
      var url = 'https://api.list.co.uk/v1/events?location='+this.locationName+'&min_date='+minDate+'&max_date='+maxDate+'&order=ts';
        axios.get(url, { headers: { Authorization: AuthStr }})
        .then(response => {
          return this.formatEventProperties(response);
        })
        .then(this.isLoading = false)
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
      // let featureFormattedImage = null;
      // if (feature.properties.image) {
      //   let changeSize = feature.properties.image.replace(/\[(.+?)\]/g, '[ToFit300x200]');
      //   featureFormattedImage = changeSize.replace(/^http:\/\//i, 'https://');
      // }
      // return featureFormattedImage;
      return this.placeholderImagePath;
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
      var prodTypes = ["acco","acti","attr","cate","reta"];
      axios.all(prodTypes.map(type => {
        let url = "../assets/json/" + type + ".json";
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
          return axios.get("../assets/json/" + productID+ ".json")
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
    if (this.locationName == "Isle of Arran") {
      this.getProducts();
    }
    this.getEvents();
  }
};
</script>

<style lang="scss" scoped>
  .nav-link,
  .nav-link:hover:not(.active) {
    color: white;
  }

  .tab-content {
    position: relative;
    height: 80vh;
    overflow-y: scroll;
  }
  .card-columns {
    @media (min-width: 576px) {
      column-count: 2;
    }
    @media (min-width: 992px) {
      column-count: 3;
    }
    @media (min-width: 1200px) {
      column-count: 3;
    }
  }
</style>
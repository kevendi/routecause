<template>
  <div class="container">
    <div class="d-lg-flex align-items-center justify-content-between">
      <h2 class="mb-3">What's Nearby {{locationName}}</h2>
      <div>
        <div class="input-group" v-if="products.length">
          <form class="form-inline">
            <label class="mr-3" for="search">Search</label>
            <input
              id="search"
              v-model="searchTerms"
              type="search"
              class="search-input form-control form-control-lg ml-md-3"
            />
            <div class="input-group-append" v-if="searchTerms.length">
              <button
                class="btn btn-primary btn-lg"
                @click.prevent="clearSearchTerms()"
              >Clear Search</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <nav class="sticky-top">
      <div class="nav nav-tabs py-5" id="nav-tab" role="tablist">
        <a
          v-for="(label, index) in productTypes" :key="index"
          class="nav-link h5 nav-`${label.key}`"
          :id="'nav-'+label.key+'-tab'"
          data-toggle="tab"
          :href="'#nav-'+label.key"
          role="tab"
          :aria-controls="'nav-'+label.key"
          :aria-selected="label.key=='accommodation'"
        >{{label.value}}</a>
      </div>
    </nav>
    <div class="tab-content" id="nav-tabContent" v-if="!isLoading">
      <div class="tab-pane active fade show" role="tabpanel" id="nav-accommodation" aria-labelledby="nav-accommodation-tab">
        <div class="card-columns"  v-if="accommodationFeatures.length">
          <open-trip-map-card 
            v-for="(accommodationFeature, accommodationIndex) in accommodationFeatures" 
            :key="accommodationIndex" 
            :feature="accommodationFeature">
          </open-trip-map-card>
        </div>
        <div v-else>
          <p class="h5 text-primary">Sorry, there's currently no accommodation to show for this location. You'll just have to sleep in a tent.</p>
        </div>
      </div>
      <div class="tab-pane fade show" role="tabpanel" id="nav-tourist" aria-labelledby="nav-tourist-tab">
        <div class="card-columns" v-if="touristFeatures.length">
          <open-trip-map-card 
            v-for="(touristFeature, touristIndex) in touristFeatures" 
            :key="touristIndex" 
            :feature="touristFeature">
          </open-trip-map-card>
        </div>
        <div v-else>
          <p class="h5 text-primary">Sorry, there are currently no tourist features to show for this location.</p>
        </div>
      </div>
      <div class="tab-pane fade show" role="tabpanel" id="nav-transport" aria-labelledby="nav-transport-tab">
        <div class="card-columns" v-if="transportFeatures.length">
          <open-trip-map-card 
            v-for="(transportFeature, transportIndex) in transportFeatures" 
            :key="transportIndex" 
            :feature="transportFeature">
          </open-trip-map-card>
        </div>
        <div v-else>
          <p class="h5 text-primary">Sorry, there are currently no transport features to show for this location.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
import OpenTripMapCard from "./OpenTripMapCard";
import _ from "lodash";

if (!Object.entries)
  Object.entries = function(obj) {
    var ownProps = Object.keys(obj),
      i = ownProps.length,
      resArray = new Array(i); // preallocate the Array
    while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];

    return resArray;
  };

if (!Number.isNaN) {
  Object.defineProperty(Number, "isNaN", {
    value: function(value) {
      return value !== value;
    }
  });
}

export default {
  name: "OpenTripMap",
  components: {
    "open-trip-map-card": OpenTripMapCard
  },
  data() {
    return {
      isLoading: true,
      products: [],
      key: "5ae2e3f221c38a28845f05b6915bdbef48e315af12f05d42729f2dcd",
      productTypes: [
        {
          key: "accommodation",
          value: "Accommodation",
          subtypes: [
            {
              key: "other_hotels",
              value: "Hotel"
            },
            {
              key: "guest_houses",
              value: "Guest House"
            },
            {
              key: "motels",
              value: "Motel"
            }
          ]
        },
        {
            key: "tourist_facilities",
          value: "Tourist Facilities",
          subtypes: [
            {
              key: "foods",
              value: "Food & Drink"
            },
            {
              key: "shops",
              value: "Shopping"
            },
            {
              key: "banks",
              value: "Banks and ATMs"
            }
          ]
        },
        {
          key: "transport",
          value: "Transport",
          subtypes: [
            {
              key: "railway_stations",
              value: "Train Stations"
            }
          ]
        }
      ],
      placeholderImagePath: "/assets/images/imagePlaceholder.png",
      searchTerms: ""
    };
  },
  watch: {
    searchTerms: () => {},
    features: () => {}
  },
  computed: {
    features() {
      if (!this.products) {
        return null;
      }
      let features = this.products;
      features.forEach(feature => {
        feature.properties.formattedSortName = this.getFeatureFormattedSortName(
          feature.properties.name
        );
      });
      return features;
    },
    filteredFeatures() {
      return this.features.filter(feature => {
        return this.filterBySearchTerms(feature);
      });
    },
    accommodationFeatures() {
      return this.sortedFeatures.filter(feature => {
        return this.filterByProductType(feature, "accommodation");
      });
    },
    touristFeatures() {
      return this.sortedFeatures.filter(feature => {
        return this.filterByProductType(feature, "tourist_facilities");
      });
    },
    transportFeatures() {
      return this.sortedFeatures.filter(feature => {
        return this.filterByProductType(feature, "transport");
      });
    },
    sortedFeatures() {
      let sortedFeatures = _.orderBy(
        this.filteredFeatures,
        feature => {
          return feature.properties.formattedSortName;
        },
        "asc"
      );
      return sortedFeatures;
    }
  },
  props: ["locationName", "lonMin", "lonMax", "latMin", "latMax"],
  methods: {
    clearSearchTerms() {
      this.searchTerms = "";
    },
    filterByProductType(feature, productType) {
      return feature.properties.productType.key === productType;
    },
    filterBySearchTerms(feature) {
      return (
        feature.properties.name
          .toLowerCase()
          .match(this.searchTerms.toLowerCase()) ||
        feature.properties.kinds
          .toLowerCase()
          .match(this.searchTerms.toLowerCase())
      );
    },
    getFeatureFormattedSortName(name) {
      let formattedSortName = null;
      if (name) {
        var stripThe = name.replace(/^The/i, "");
        var toLower = stripThe.toLowerCase();
        var stripDigitAlpha = toLower.replace(/\d+[a-z]/gi, "");
        var stripDigitSlash = stripDigitAlpha.replace(/\d+\//g, "");
        var stripDigit = stripDigitSlash.replace(/\d+/g, "");
        var stripNonAlpha = stripDigit.replace(/\W/g, "");
        var finalTransform = stripNonAlpha;
        if (finalTransform !== "") {
          formattedSortName = finalTransform;
        }
      }
    },
    getProducts() {
        axios.all(this.productTypes.map(type => {
            type.subtypes.map(subtype => {
                let url = `https://api.opentripmap.com/0.1/en/places/bbox?lon_min=${this.lonMin}&lon_max=${this.lonMax}&lat_min=${this.latMin}&lat_max=${this.latMax}&kinds=${subtype.key}&apikey=${this.key}`;
                return axios.get(url)
                    .then(response => {
                    response.data.features.map(feature => {
                        feature.properties.productType = { "key": type.key, "value": type.value };
                        feature.properties.productSubtype = { "key": subtype.key, "value": subtype.value };
                        feature.properties.icon = 'icon-'+type.key;
                        this.products.push(feature);
                    });
                })
            })
      }))
      .then(this.getProductDataBatch);
    },
    getProductDataBatch() {
      this.products.map((feature) => {
          return this.getProductData(feature.properties.xid);
      });
    },
    getProductData(productID) {
        return axios
            .get(`https://api.opentripmap.com/0.1/en/places/xid/${productID}?apikey=${key}`)
            .then(response => {
                console.log(response)
                let obj = Object.assign({}, feature.properties, response);
                  feature.properties = obj;
                  this.products[index].properties = feature.properties;
            })
            .then(this.isLoading = false);
    }
  },
  mounted() {
    this.getProducts();
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

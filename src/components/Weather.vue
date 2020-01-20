<template>
  <div>
    <dl>
      <dt>Sunrise</dt>
      <dd>{{this.sunriseTime}}</dd>
      <dt>Sunset</dt>
      <dd>{{this.sunsetTime}}</dd>
    </dl>
  </div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';
export default {
  name: "Weather",
  components: {
  },
  data() {
    return {
      openWeatherAPIKey: "007b903cbaaa3a3db02518d8021efdbc",
      forecast: null
    };
  },
  computed: {
    sunriseTime() {
      if (!this.forecast) {
        return null
      }
      return moment.unix(this.forecast.city.sunrise).format('HH:mm');
    },
    sunsetTime() {
      if (!this.forecast) {
        return null
      }
      return moment.unix(this.forecast.city.sunset).format('HH:mm');
    },
  },
  props: [
      'locationName'
  ],
  methods: {
    getWeather() {
      console.log(this.locationName)
      let url = "https://api.openweathermap.org/data/2.5/forecast?q="+this.locationName+",GB&mode=json&units=metric&appid="+this.openWeatherAPIKey;
      return axios.get(url)
        .then(response => {
          this.forecast = response.data;
        })
    },
  },
  mounted() {
    this.getWeather();
  }
};
</script>

<style lang="scss" scoped>
</style>

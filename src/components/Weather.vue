<template>
    <div class="container mt-5">
        <dl class="list-inline mb-5">
          <dt class="list-inline-item mb-0">Sunrise</dt>
          <dd class="list-inline-item mb-0">{{this.sunriseTime}}</dd>
          <dt class="list-inline-item mb-0">Sunset</dt>
          <dd class="list-inline-item mb-0">{{this.sunsetTime}}</dd>
        </dl>
      <div class="row" v-for="(entry, index) in this.formattedWeatherList" :key="index">
        <template v-if="entry.time === '06:00'">
          <h3 class="col">{{entry.date}}</h3>
        </template>
        <dl class="col col-12 col-sm-10 offset-sm-2 list-inline">
          <dt class="sr-only">Time</dt>
          <dd class="list-inline-item mb-0">{{entry.time}}</dd>
          <dt class="sr-only">Weather</dt>
          <dd class="list-inline-item mb-0">
            <img :src="entry.icon" :alt="entry.weather + ' icon'" />
            {{entry.weather}}
          </dd>
          <dt class="sr-only">Temperature</dt>
          <dd class="list-inline-item mb-0">{{entry.temp}}&deg;</dd>  
          <dt class="sr-only">Wind Direction</dt>
          <dd class="list-inline-item mb-0">
            <div :style="`transform: rotate(${entry.windDirection}deg);`">
              <i class="fa fa-arrow-alt-circle-up"></i>
            </div>
          </dd> 
          <dt class="sr-only">Wind Speed</dt>
          <dd class="list-inline-item mb-0">{{entry.windSpeed}} mph</dd> 
        </dl>
      </div>
    </div><!-- container -->
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
    formattedWeatherList() {
      if (!this.forecast) {
        return null
      }
      let formattedWeatherList = [];
      this.forecast.list.map(entry => {
        let weatherObj = {};
        weatherObj.date = moment.unix(entry.dt).format("ddd Do");
        weatherObj.time = moment.unix(entry.dt).format("HH:mm");
        weatherObj.temp = Math.round(entry.main.temp);
        weatherObj.weather = entry.weather[0].description;
        weatherObj.icon = '/assets/images/open-weather-icons/'+entry.weather[0].icon+'@2x.png';
        weatherObj.windSpeed = Math.round(entry.wind.speed);
        weatherObj.windDirection = entry.wind.deg;
        if ((weatherObj.time == '06:00') || (weatherObj.time == '09:00') || (weatherObj.time == '12:00') || (weatherObj.time == '15:00') || (weatherObj.time == '18:00')) {
          formattedWeatherList.push(weatherObj);
        }
      })
      return formattedWeatherList;
    }
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
          console.log(response.data)
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
.list-inline {
  font-size: 1rem;
  @media (min-width: 1200px) {
    font-size: 1.4rem;
  }
}
</style>

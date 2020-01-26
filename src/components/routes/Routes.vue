<template>
<div>
    <div class="container text-light">
        <section class="text-light pt-5 d-print-none">
            <div class="row position-sticky">
                <div class="col col-lg-5">
                    <regions-list></regions-list>
                </div>
                <div class="col col-12 col-lg-6 offset-lg-1">
                    <regions-map></regions-map>
                </div>
            </div>
            
        </section>
        <routes-filters></routes-filters>
        <routes-list></routes-list>
    </div>
    <div ref="description" class="description"></div>
</div>
</template>

<script>
import axios from 'axios';
import RegionsList from './components/RegionsList'
import RegionsMap from './components/RegionsMap'
import RoutesFilters from './components/RoutesFilters'
import RoutesList from './components/RoutesList'
export default {
  name: "Routes",
  components: {
      RegionsList,
      RegionsMap,
      RoutesFilters,
      RoutesList
  },
  data() {
    return {
    };
  },
  computed: {
  },
  props: [
  ],
  methods: {
      positionDescription(region) {
        var description = this.$refs.description;
        var svgBoundingBox = region.getBBox();
        var svgRect = region.getBoundingClientRect();
        description.style.left = ((svgRect.x) + (svgRect.width/2)) + "px";
        description.style.top = (svgRect.y-60) + window.pageYOffset + "px";
      },
    initRoutes() {
        var mapTriggers = document.querySelectorAll('[data-map-trigger]');
        var regionsMap = document.getElementById("RegionsMap");
        var description = this.$refs.description;

        if (regionsMap !== null && mapTriggers !== null && description !== null) {
            for (const trigger of mapTriggers) {
                trigger.addEventListener('mouseenter', (e) => {
                    var region = regionsMap.getElementById(e.target.getAttribute('data-map-target'));
                    description.classList.add('active');
                    description.innerHTML = region.getAttribute('data-name');
                    this.positionDescription(region);
                    region.classList.add('active')
                });
                trigger.addEventListener('mouseleave', (e) => {
                    var region = regionsMap.getElementById(e.target.getAttribute('data-map-target'));
                    description.classList.remove('active');
                    description.innerHTML = '';
                    region.classList.remove('active')
                });
            }
            var mapRegions = regionsMap.querySelectorAll('[data-name]');
                    for (const region of mapRegions) {
            region.addEventListener('mouseover', (e) => {
                var button = document.querySelector(`[data-map-target="${e.target.id}"]`);
                button.classList.add('active');
                region.classList.add('active');
                description.classList.add('active');
                description.innerHTML = e.target.getAttribute('data-name');
                this.positionDescription(region);
            });
            region.addEventListener('mouseout', (e) => {
                var button = document.querySelector(`[data-map-target="${e.target.id}"]`);
                button.classList.remove('active');
                region.classList.remove('active')
                description.classList.remove('active');
                description.innerHTML = "";
            });
        }
        }
    }
  },
  mounted() {
    this.initRoutes()
  }
};
</script>

<style lang="scss" scoped>
.description {
  background: white;
  border-radius: 5px;
  box-shadow: 0 0 0 1px #eee;
  color: #21669e;
  display: none;
  margin: 0 auto;
  padding: 10px 15px;
  pointer-events: none;
  position: absolute;
  text-align: center;
  transform: translateX(-50%);
  z-index: 1;
  &.active {
    display: block;
  }
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    top: 100%;
    width: 0;
    height: 0;
    margin-left: -10px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid white
  }
}
</style>

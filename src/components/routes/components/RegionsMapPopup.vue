<template>
    <div class="description"></div>
</template>

<script>
export default {
  name: "RegionsMapPopup",
  props: [
    'region'
  ],
    watch: {
    region() {
        this.addMapPopup()
    }
  },
  methods: {
    addMapPopup() {
      var popupText = '';
        if (this.region !== '') {
            var popupText = this.region['data-name']
            var mapPath = document.getElementById(this.region.id)
            this.$el.classList.add('active');
            this.$el.innerHTML = popupText;
            this.positionDescription(mapPath);
        } 
        else {
            this.removeMapPopup();
        }
    },
    positionDescription(region) {
        if (region) {
            var svgRect = region.getBoundingClientRect();
            this.$el.style.left = ((svgRect.x) + (svgRect.width/2)) + "px";
            this.$el.style.top = (svgRect.y-60) + window.pageYOffset + "px";
        }
    },
    removeMapPopup() {
      this.$el.innerHTML = "";
      this.$el.classList.remove('active');
    },
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

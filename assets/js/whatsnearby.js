document.addEventListener('DOMContentLoaded', function () {
    new Vue({
        template: `
        <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <a class="nav-item nav-link active" id="nav-accommodation-tab" data-toggle="tab" href="#nav-accommodation" role="tab" aria-controls="nav-accommodation" aria-selected="true">Accommodation</a>
                <a class="nav-item nav-link" id="nav-activities-tab" data-toggle="tab" href="#nav-activities" role="tab" aria-controls="nav-activities" aria-selected="false">Activities</a>
                <a class="nav-item nav-link" id="nav-attractions-tab" data-toggle="tab" href="#nav-attractions" role="tab" aria-controls="nav-attractions" aria-selected="false">Attractions</a>
                <a class="nav-item nav-link" id="nav-events-tab" data-toggle="tab" href="#nav-events" role="tab" aria-controls="nav-events" aria-selected="false">Events</a>
                <a class="nav-item nav-link" id="nav-food-drink-tab" data-toggle="tab" href="#nav-food-drink" role="tab" aria-controls="nav-food-drink" aria-selected="false">Food and Drink</a>
                <a class="nav-item nav-link" id="nav-shopping-tab" data-toggle="tab" href="#nav-shopping" role="tab" aria-controls="nav-shopping" aria-selected="false">Shopping</a>
            </div>
        </nav>
      <div class="tab-content" id="nav-tabContent">
        <div class="tab-pane fade show active" id="nav-accommodation" role="tabpanel" aria-labelledby="nav-accommodation-tab">
          <div class="card-columns">
            <div class="card" v-for="feature, index in accommodation" :key="index">
              <img src="images/P1330926.JPG" class="card-img-top" alt="...">
              <div class="card-body">
                <h3 class="card-title">Grianan House And Grianan Cottage</h3>
                <strong class="card-text">**** | Kildonan | Self Catering</strong>
                <p class="card-text">GRIANAN HOUSE AND GRIANAN COTTAGE FOR VIDEO TOUR AND ON LINE BOOKING www.grianan-arran.co.uk Recently built and
                      beautifully finished self catering ...</p>
                <p>Parking, Pets Welcome</p>
                <a class="btn btn-primary" href="http://www.grianan-arran.co.uk/">Visit Website</a>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane fade" id="nav-activities" role="tabpanel" aria-labelledby="nav-activities-tab">
          ...
        </div>
        <div class="tab-pane fade" id="nav-attractions" role="tabpanel" aria-labelledby="nav-attractions-tab">
            ...
        </div>
        <div class="tab-pane fade" id="nav-events" role="tabpanel" aria-labelledby="nav-events-tab">
            ...
        </div>
        <div class="tab-pane fade" id="nav-food-drink" role="tabpanel" aria-labelledby="nav-food-drink-tab">
            ...
        </div>
        <div class="tab-pane fade" id="nav-shopping" role="tabpanel" aria-labelledby="nav-shopping-tab">
            ...
        </div>
      </div>
        `,
        el: '#app',
        // define data - initial display text
        data() {
            return {
                accommodation: [],
                activities: [],
                attractions: [],
                events: [],
                food_drink: [],
                shopping: []
            }
        },
        methods: {
            getProducts() {
                var prodTypes = ["acco", "acti", "attr", "even", "cate", "reta"];
                prodTypes.map(type => {
                    let url = 'http://127.0.0.1:4000/assets/json/' + type + '.json';
                    fetch(url)
                        .then(res => res.json())
                        .then(data => {
                            data.features.map(feature => {
                                let productUrl = 'http://127.0.0.1:4000/assets/json/' + feature.properties.id + '.json';
                                fetch(productUrl)
                                    .then(res => res.json())
                                    .then(data => {
                                        obj = Object.assign({}, feature.properties, data.data[0])
                                        feature.properties = obj
                                        switch (type) {
                                            case "acco":
                                                this.accommodation.push(feature);
                                                break;
                                        }
                                    })
                            })
                        })
                })

            },
        },
        mounted() {
            this.getProducts();
        }
    })
})
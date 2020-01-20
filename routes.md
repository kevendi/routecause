---
layout: default
title:  "Cycle Routes in Scotland"
summary: "Discover some fantastic cycling routes in Scotland."
lead: "This list and map are under construction and don't really do anything yet, but someday it's gonna be awesome."
mapPath: "/map/scotland-regions.svg"
mapAlt: "Scotland Regions Map"
---
  <section class="text-light position-relative d-lg-flex">
      <div class="container py-5">
          <div class="row">
              <div class="col col-lg-5">
                  <h1 itemprop="name headline">Routes</h1>
                  <p class="lead mb-5">{{page.lead}}</p>
                  <ul class="list-unstyled ml-n2 row cols">
                    {% for region in site.data.regions %}
                      <li>
                        <button data-map-trigger data-map-target="{{region.id}}" class="btn btn-link btn-outline-info m-1">{{region.data-name}}</button>
                      </li>
                    {% endfor %} 
                  </ul>
                </div>
                <div class="col col-12 col-lg-6 offset-lg-1 position-sticky">
                  <figure data-route-map class="route-map d-print-none sticky-top">
                    {% include {{ page.mapPath | prepend: site.baseurl }} %}
                    <div data-description class="description"></div>
                        <figcaption class="sr-only">
                            <span>{{page.heroImageAlt}}</span>
                        </figcaption>
                  </figure>
              </div>
          </div>
      </div>
</section>

<div class="container py-5 text-light">
  <ul class="list-unstyled card-columns mt-5">
    {% for route in site.routes %}
      <li class="card bg-dark text-light border border-secondary">
        <img src="{{route.heroImagePath | prepend: site.baseurl | append: '?nf_resize=smartcrop&w=500'}}" class="card-img-top" alt="{{ route.heroImageAlt }}" loading="lazy" width="auto"/>
        <div class="card-body">
        <h2 class="card-title h5"><a class="stretched-link" href="{{ route.url }}">{{ route.title }}</a></h2>
        <p>{{ route.summary }}</p>
        </div>
        <div class="card-footer">
          <dl class="text-muted d-flex justify-content-between mb-0">
            <dt class="sr-only">Region</dt>
            <dd class="mb-0">{{ route.region }}</dd>
            <dt class="sr-only">Distance</dt>
            <dd class="mb-0">{{ route.distanceMiles }} mi / {{ route.distanceKilometres }} km</dd>
          </dl>
        </div>
      </li>
    {% endfor %}
  </ul>
</div>
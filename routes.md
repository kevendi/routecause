---
layout: default
title:  "Cycle Routes in Scotland"
summary: "Discover some fantastic cycling routes in Scotland."
lead: "This list and map are under construction and don't really do anything yet, but someday it's gonna be awesome."
mapPath: "/map/scotland-regions.svg"
mapAlt: "Scotland Regions Map"
---
<section class="text-light pt-5 d-print-none">
  <div class="container">
    <div class="row">
      <div class="col col-lg-5">
        <h1 itemprop="name headline">Routes</h1>
        <p class="lead mb-5">{{page.lead}}</p>
      </div>
    </div>
    <div class="row position-sticky">
      <div class="col col-lg-5">
        <ul class="list-unstyled ml-n2 row cols sticky-top">
          {% for region in site.data.regions %}
            <li>
              <button data-map-trigger data-map-target="{{region.id}}" class="btn btn-link btn-outline-primary m-1 d-flex justify-content-between align-items-center">{{region.data-name}}   {% assign count = 0 %}
                {% for route in site.routes %}
                  {% if route.region contains region.data-name %}
                    {% assign count = count | plus: 1 %}
                  {% endif %}
                {% endfor %}
                {% if count > 0 %}
                  <span class="badge badge-primary badge-pill ml-2">{{ count }}</span>
                {% else %}
                  <span class="badge badge-secondary badge-pill text-muted ml-2">{{ count }}</span>
                {% endif %}
              </button>
            </li>
          {% endfor %} 
        </ul>
      </div>
      <div class="col col-12 col-lg-6 offset-lg-1">
        <figure data-route-map class="route-map">
          {% include {{ page.mapPath | prepend: site.baseurl }} %}
          <figcaption class="sr-only">
            <span>{{page.heroImageAlt}}</span>
          </figcaption>
        </figure>
      </div>
    </div>
  </div>
  <div data-description class="description"></div>
</section>

<div class="container text-light">
    <form class="form row py-5">
      <div class="col mb-3 mb-md-0">
        <div class="d-flex">
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="difficultyLevel" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Difficulty
            </button>
            <div class="dropdown-menu" aria-labelledby="difficultyLevel">
              <button class="dropdown-item">Easy</button>
              <button class="dropdown-item">Moderate</button>
              <button class="dropdown-item">Strenuous</button>
            </div>
          </div>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="terrain" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Terrain
            </button>
            <div class="dropdown-menu" aria-labelledby="terrain">
              <button class="dropdown-item">Road</button>
              <button class="dropdown-item">Off-Road</button>
              <button class="dropdown-item">Mixed</button>
            </div>
          </div>
          <div class="d-flex">
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="distanceKM" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                mi
              </button>
              <div class="dropdown-menu" aria-labelledby="distanceKM">
                <button class="dropdown-item" data-min-km="0" data-max-km="19">+ 1 mile</button>
                <button class="dropdown-item" data-min-mi="20" data-max-mi="39">+ 20 miles</button>
                <button class="dropdown-item" data-min-mi="40" data-max-mi="59">+ 40 miles</button>
                <button class="dropdown-item" data-min-mi="60" data-max-mi="79">+ 60 miles</button>
                <button class="dropdown-item" data-min-mi="80" data-max-mi="99">+ 80 miles</button>
                <button class="dropdown-item" data-min-mi="100" data-max-mi="1000">+ 100 miles</button>
              </div>
            </div>
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="distanceKM" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                km
              </button>
              <div class="dropdown-menu" aria-labelledby="distanceKM">
                <button class="dropdown-item" data-min-km="0" data-max-km="19">+ 1km</button>
                <button class="dropdown-item" data-min-km="20" data-max-km="39">+ 20km</button>
                <button class="dropdown-item" data-min-km="40" data-max-km="59">+ 40km</button>
                <button class="dropdown-item" data-min-km="60" data-max-km="79">+ 60km</button>
                <button class="dropdown-item" data-min-km="80" data-max-km="99">+ 80km</button>
                <button class="dropdown-item" data-min-km="100" data-max-km="1000">+ 100km</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col col-12 col-md-auto col-lg-6">
        <div class="input-group">
          <label class="sr-only" for="search-input">Search</label>
            <div class="input-group-prepend">
              <span class="input-group-text bg-primary border border-primary"><i class="fa fa-search text-light"></i></span>
            </div>
          <input class="form-control" type="search" id="search-input" placeholder="Search" name="search" />
        </div>
      </div>
    </form>
  <ul class="list-unstyled row">
    {% for route in site.routes %}
      <li class="col col-md-6 mb-3">
        <div class="media bg-dark text-light border border-secondary">
          <div class="media-image-wrapper float-left">
            <img src="{{route.heroImagePath | prepend: site.baseurl | append: '?nf_resize=smartcrop&w=150'}}" alt="{{ route.heroImageAlt }}" loading="lazy" width="150"/>
          </div>
          <div class="media-body p-3">
            <h2 class="h5"><a class="stretched-link" href="{{ route.url }}">{{ route.title }}</a></h2>
            <dl class="text-muted mb-0">
              <dt class="sr-only">Region</dt>
              <dd class="mb-0">{{ route.region }}</dd>
              <dt class="sr-only">Terrain</dt>
              <dd class="mb-0">{{ route.terrain }}</dd>
              <dt class="sr-only">Difficulty</dt>
              <dd class="mb-0">{{ route.difficultyLevel }}</dd>
              <dt class="sr-only">Distance</dt>
              <dd class="mb-0">{{ route.distanceMiles }} mi / {{ route.distanceKilometres }} km</dd>
            </dl>
          </div>
        </div>
      </li>
    {% endfor %}
  </ul>
</div>

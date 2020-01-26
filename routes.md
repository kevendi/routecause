---
layout: default
title:  "Cycle Routes in Scotland"
summary: "Discover some fantastic cycling routes in Scotland."
lead: "This page is under construction."
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
    <form class="form row justify-content-md-between py-5">
      <div class="col col-6 mb-3 mb-md-0">
        <div class="d-flex">
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="difficultyLevel" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Difficulty
            </button>
            <div class="dropdown-menu" aria-labelledby="difficultyLevel">
              <button type="button" class="dropdown-item">Easy</button>
              <button type="button" class="dropdown-item">Moderate</button>
              <button type="button" class="dropdown-item">Strenuous</button>
            </div>
          </div>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="terrain" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Terrain
            </button>
            <div class="dropdown-menu" aria-labelledby="terrain">
              <button type="button" class="dropdown-item">Road</button>
              <button type="button" class="dropdown-item">Off-Road</button>
              <button type="button" class="dropdown-item">Mixed</button>
            </div>
          </div>
            <div class="dropdown d-none">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="distanceKM" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                mi
              </button>
              <div class="dropdown-menu" aria-labelledby="distanceKM">
                <button type="button" class="dropdown-item" data-min-km="0" data-max-km="19">+ 1 mile</button>
                <button type="button" class="dropdown-item" data-min-mi="20" data-max-mi="39">+ 20 miles</button>
                <button type="button" class="dropdown-item" data-min-mi="40" data-max-mi="59">+ 40 miles</button>
                <button type="button" class="dropdown-item" data-min-mi="60" data-max-mi="79">+ 60 miles</button>
                <button type="button" class="dropdown-item" data-min-mi="80" data-max-mi="99">+ 80 miles</button>
                <button type="button" class="dropdown-item" data-min-mi="100" data-max-mi="1000">+ 100 miles</button>
              </div>
            </div>
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="distanceKM" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Distance
              </button>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="distanceKM">
                <div class="form-check form-check-inline ml-3">
                  <label class="form-check-label" for="miles">
                    <input class="form-check-input" type="radio" id="miles" value="miles" name="distance-unit">
                  mi</label>
                </div>
                <div class="form-check form-check-inline">
                  <label class="form-check-label" for="kilometres">
                    <input class="form-check-input" type="radio" id="kilometres" value="kilometres" name="distance-unit">
                  km</label>
                </div>
                <div class="dropdown-divider"></div>
                <button type="button" class="dropdown-item" data-distance-min="0" data-distance-max="19">+ 1</button>
                <button type="button" class="dropdown-item" data-distance-min="20" data-distance-max="39">+ 20</button>
                <button type="button" class="dropdown-item" data-distance-min="40" data-distance-max="59">+ 40</button>
                <button type="button" class="dropdown-item" data-distance-min="60" data-distance-max="79">+ 60</button>
                <button type="button" class="dropdown-item" data-distance-min="80" data-distance-max="99">+ 80</button>
                <button type="button" class="dropdown-item" data-distance-min="100" data-distance-max="1000">+ 100</button>
              </div>
          </div>
        </div>
      </div>
      <div class="col col-12 col-md-auto col-lg-4">
        <div class="input-group">
          <label class="sr-only" for="search-input">Search Routes</label>
            <div class="input-group-prepend">
              <span class="input-group-text bg-primary border border-primary"><i class="fa fa-search text-light"></i></span>
            </div>
          <input class="form-control" type="search" id="search-input" placeholder="Search routes" name="search" />
        </div>
      </div>
    </form>
  <ul class="list-unstyled row">
    {% for route in site.routes %}
      <li class="col col-md-6 mb-3">
        <div class="media bg-dark text-light border border-secondary">
          <div class="media-image-wrapper scrim float-left">
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

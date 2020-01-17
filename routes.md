---
layout: default
title:  "Cycle Routes in Scotland"
summary: "Discover some fantastic cycling routes in Scotland."
lead: "Please be patient and check back soon to see more routes as they are added."
---

<div class="container py-5 text-light">
  <h1>Routes</h1>
  <p class="lead">{{page.lead}}</p>
  <ul class="list-unstyled card-columns vh-100 mt-5">
    {% for route in site.routes %}
      <li class="card bg-dark text-light border border-secondary">
        <img src="{{route.heroImagePath | prepend: site.baseurl}}" class="card-img-top" alt="{{ route.heroImageAlt }}">
        <div class="card-body">
        <h2 class="card-title h5"><a class="stretched-link" href="{{ route.url }}">{{ route.title }}</a></h2>
        <p>{{ route.summary }}</p>
        </div>
        <div class="card-footer">
          <span class="text-muted">{{ route.region }}</span>
        </div>
      </li>
    {% endfor %}
  </ul>
</div>
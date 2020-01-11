---
layout: default
---

<div class="container">
  <ul class="list-unstyled card-columns vh-100 mt-5">
    {% for route in site.routes %}
      <li class="card bg-dark text-light border border-secondary">
        <img src="{{route.heroImagePath | prepend: site.baseurl}}" class="card-img-top" alt="{{ route.heroImageAlt }}">
        <div class="card-body">
        <h3 class="card-title h5"><a class="stretched-link" href="{{ route.url }}">{{ route.title }}</a></h3>
        <p>{{ route.summary }}</p>
        </div>
      </li>
    {% endfor %}
  </ul>
</div>
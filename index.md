---
layout: default
---

<div class="container">
  <ul class="list-unstyled card-columns vh-100 mt-5">
    {% for post in site.posts %}
      <li class="card bg-dark text-light border border-secondary">
        <img src="{{post.imagePath | prepend: site.baseurl}}" class="card-img-top" alt="{{ post.imageAlt }}">
        <div class="card-body">
        <h3 class="card-title h5"><a class="stretched-link" href="{{ post.url }}">{{ post.title }}</a></h3>
        <p>{{ post.summary }}</p>
        </div>
      </li>
    {% endfor %}
  </ul>
</div>
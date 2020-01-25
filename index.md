---
layout: default
title:  "Scotland Cycle Routes"
heroImagePath: "/assets/routes/assynt/images/P1080266.jpg"
heroImageAlt: "Folding bikes in Assynt, Scotland with Stac Pollaidh mountain in the distance"
heroImageCredit: "Kelly Marshall"
summary: "Promoting sustainable travel and tourism in Scotland by providing inspiring scenic bicycle route information, with route stage details, GPS downloadable and printable routes and maps."
lead: "Cycling is a fantastic and sustainable way to discover all beauty that Scotland has to offer. You get to slow down and really enjoy the scenery and traveling by bike is environmentally friendly. Not only does it keep you fit and healthy, but it is cheaper than paying for fuel or to hire a car. Touring Scotland by bicycle causes less impact on Scotland's public infrastructure than travelling by car and it is easy to take your bike on the train. In short, one of the best ways to see Scotland is by bike because it is environmentally, socially and economically sustainable."
---
  <section class="text-light position-relative d-lg-flex">
      <div class="container py-5">
          <div class="row">
              <div class="col col-lg-5">
                  <h1 itemprop="name headline">Cycle Routes in Scotland</h1>
                  <p class="lead">{{page.lead}}</p>
              </div>
          </div>
      </div>
      <figure class="hero scrim d-print-none">
          <img src="{{page.heroImagePath | prepend: site.baseurl | append: '?nf_resize=smartcrop&w=500'}}" alt="{{page.imageAlt}}" loading="lazy" width="auto"/>
          <figcaption class="sr-only">
              <span>{{page.heroImageAlt}}</span>
              <span>{{page.heroImageCredit}}</span>
          </figcaption>
      </figure>
  </section>
  <section class="position-absolute w-100 mt-n5 d-print-none" style="z-index: 1">
    <h2 class="sr-only text-light">Share this Page</h2>
    <div class="d-flex justify-content-end">
        <a href="https://www.facebook.com/sharer/sharer.php?u=https://www.routecause.org{{page.url}}" class="btn btn-lg btn-info" target="_blank" rel="noreferrer">
            <i class="fab fa-facebook-f"></i>
            <span class="sr-only">Share on Facebook</span>
        </a>
        <a href="https://twitter.com/intent/tweet?text=https://www.routecause.org{{page.url}}" data-share="twitter" data-share-url="{{page.url | prepend: site.baseurl}}" class="btn btn-lg btn-info" target="_blank" rel="noreferrer">
            <i class="fab fa-twitter"></i>
            <span class="sr-only">Share on Twitter</span>
        </a>
        <a href="https://www.linkedin.com/shareArticle?mini=true&amp;url=https://www.routecause.org{{page.url}}" class="btn btn-lg btn-info" target="_blank" rel="noreferrer">
            <i class="fab fa-linkedin-in"></i>
            <span class="sr-only">Share on LinkedIn</span>
        </a>
        <a href="mailto:?subject={{page.title}}&amp;body=https://www.routecause.org{{page.url}}" class="btn btn-lg btn-info" target="_blank">
            <i class="fas fa-envelope"></i>
            <span class="sr-only">Share via E-mail</span>
        </a>
    </div>
</section>
  <section class="text-light py-5">
    <div class="container">
  <h2>Latest Routes</h2>
   <ul class="list-unstyled card-columns mt-5">
    {% for route in site.routes %}
      <li class="card bg-dark text-light border border-secondary">
        <img src="{{route.heroImagePath | prepend: site.baseurl | append: '?nf_resize=smartcrop&w=500'}}" class="card-img-top" alt="{{ route.heroImageAlt }}" loading="lazy" width="auto" />
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
  </section>
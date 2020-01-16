---
layout: default
---
  <section class="text-light position-relative d-md-flex">
      <div class="container py-5">
          <div class="row">
              <div class="col col-md-5">
                  <h1 itemprop="name headline">Home</h1>
                  <p class="lead"></p>
              </div>
          </div>
      </div>
      <figure class="hero d-print-none">
          <img src="{{page.heroImagePath | prepend: site.baseurl}}" alt="{{page.imageAlt}}"/>
          <figcaption class="sr-only">
              <span>{{page.heroImageAlt}}</span>
              <span>{{page.heroImageCredit}}</span>
          </figcaption>
      </figure>
  </section>
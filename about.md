---
layout: default
title:  "About"
heroImagePath: "/assets/routes/applecross-peninsula/images/P1170795.JPG"
heroImageAlt: "Cycling around the Applecross Peninsula, Scotland."
heroImageCredit: "Kelly Marshall"
summary: "Promoting sustainable travel and tourism in Scotland by providing inspiring scenic bicycle route information, with route stage details, GPS downloadable and printable routes and maps."
lead: "We aim to promote sustainable travel and tourism in Scotland by providing inspiring scenic bicycle route suggestions with printable  descriptions and maps and downloable GPS routes."
---
  <section class="text-light position-relative d-lg-flex">
      <div class="container py-5">
          <div class="row">
              <div class="col col-lg-5">
                  <h1 itemprop="name headline">Our Mission</h1>
                  <p class="lead">{{page.lead}}</p>
                  <p class="lead">The website is in its early stages, but please check back to see more routes as we add them. If you would like make contact, please fill out one of the feedback forms on the site or <a href="mailto: routecause@yahoo.com">send an e-mail</a></p>
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
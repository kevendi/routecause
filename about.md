---
layout: default
title:  "About"
heroImagePath: "/assets/routes/applecross-peninsula/images/P1170795.JPG"
heroImageAlt: "Cycling around the Applecross Peninsula, Scotland."
heroImageCredit: "Kelly Marshall"
summary: "Promoting sustainable travel and tourism in Scotland by providing inspiring scenic bicycle route information, with route stage details, GPS downloadable and printable routes and maps."
lead: "We aim to promote sustainable travel and tourism in Scotland by providing inspiring scenic bicycle route suggestions with printable  descriptions and maps and downloable GPS routes. The website is in its early stages, but please check back to see more routes as we add them."
---
  <section class="text-light position-relative d-md-flex">
      <div class="container py-5">
          <div class="row">
              <div class="col col-md-5">
                  <h1 itemprop="name headline">Our Mission</h1>
                  <p class="lead">{{page.lead}}</p>
                  <p class="lead">If you would like make contact, please <a href="mailto: routecause@yahoo.com">send an e-mail</a></p>
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
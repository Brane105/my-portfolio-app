import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private readonly defaultImage = 'https://brane-portfolio-app.vercel.app/assets/images/apple-portfolio-bg.png';

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly title: Title,
    private readonly meta: Meta
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute.firstChild;
          while (route?.firstChild) {
            route = route.firstChild;
          }

          return route?.snapshot.data || {};
        })
      )
      .subscribe((data) => {
        const pageTitle = data['title'] || 'Bhalchandra Rane | Full Stack Software Engineer';
        const description =
          data['description'] ||
          'Portfolio of Bhalchandra Rane, a full stack software engineer building modern web applications.';
        const canonical = data['canonical'] || 'https://brane-portfolio-app.vercel.app/';
        const image = data['image'] || this.defaultImage;

        this.title.setTitle(pageTitle);
        this.setCanonicalUrl(canonical);
        this.meta.updateTag({ name: 'description', content: description });
        this.meta.updateTag({ name: 'robots', content: 'index, follow, max-image-preview:large' });
        this.meta.updateTag({ property: 'og:title', content: pageTitle });
        this.meta.updateTag({ property: 'og:description', content: description });
        this.meta.updateTag({ property: 'og:url', content: canonical });
        this.meta.updateTag({ property: 'og:image', content: image });
        this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
        this.meta.updateTag({ name: 'twitter:description', content: description });
        this.meta.updateTag({ name: 'twitter:image', content: image });

        window.setTimeout(() => {
          const section = data['section'] || 'home';
          document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
      });
  }

  private setCanonicalUrl(url: string) {
    let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');

    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }

    link.setAttribute('href', url);
  }
}

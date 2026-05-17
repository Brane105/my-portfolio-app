import { AfterViewInit, Component, ElementRef, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
  animations: [
    trigger('serviceList', [
      transition(':enter', [
        query('.service-card', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger(80, animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })))
        ], { optional: true })
      ])
    ])
  ]
})
export class ServiceComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('serviceCard') serviceCards!: QueryList<ElementRef<HTMLElement>>;

  services = [
    {
      icon: 'ti-browser',
      title: 'Web Application Development',
      description: 'Responsive, accessible applications built with Angular, React, HTML, CSS, and modern JavaScript.'
    },
    {
      icon: 'ti-components',
      title: 'Frontend Engineering',
      description: 'Component systems, stateful workflows, dashboards, forms, and interfaces that feel fast and clear.'
    },
    {
      icon: 'ti-server-2',
      title: 'Backend Development',
      description: 'APIs, authentication-ready flows, database integrations, and services using Node.js and Spring Boot.'
    }
  ];

  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    this.serviceCards.forEach((card, index) => {
      card.nativeElement.style.setProperty('--delay', `${index * 80}ms`);
      this.observer?.observe(card.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}

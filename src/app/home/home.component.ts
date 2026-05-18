import { AfterViewInit, Component, ElementRef, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('revealItem') revealItems!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('statValue') statValues!: QueryList<ElementRef<HTMLElement>>;

  stats = [
    { target: 4, suffix: '+', label: 'Years experience' },
    { target: 11, suffix: '+', label: 'Enterprise projects' },
    { target: 42, suffix: '+', label: 'Git repositories' }
  ];

  technologies = [
    { name: 'Angular', icon: 'angular' },
    { name: 'React', icon: 'react' },
    { name: 'Node.js', icon: 'nodedotjs' },
    { name: 'Spring Boot', icon: 'springboot' },
    { name: 'JavaScript', icon: 'javascript' },
    { name: 'Python', icon: 'python' },
    { name: 'MongoDB', icon: 'mongodb' },
    { name: 'MySQL / MSSQL', icon: 'mysql' },
    { name: 'Azure', icon: 'assets/images/Microsoft_Azure.svg' },
    { name: 'Docker', icon: 'docker' },
    { name: 'Kubernetes', icon: 'kubernetes' },
    { name: 'GitHub', icon: 'github' }
  ];

  private revealObserver?: IntersectionObserver;
  private statObserver?: IntersectionObserver;

  ngAfterViewInit(): void {
    this.observeRevealItems();
    this.observeStats();
  }

  ngOnDestroy(): void {
    this.revealObserver?.disconnect();
    this.statObserver?.disconnect();
  }

  scrollTo(sectionId: string): void {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  iconUrl(icon: string): string {
    if (icon.startsWith('assets/')) {
      return icon;
    }

    return `https://cdn.simpleicons.org/${icon}`;
  }

  private observeRevealItems(): void {
    this.revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.revealObserver?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    this.revealItems.forEach((item, index) => {
      item.nativeElement.style.setProperty('--delay', `${index * 80}ms`);
      this.revealObserver?.observe(item.nativeElement);
    });
  }

  private observeStats(): void {
    this.statObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset['index']);
            this.countUp(entry.target as HTMLElement, this.stats[index].target, this.stats[index].suffix);
            this.statObserver?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );

    this.statValues.forEach((item, index) => {
      item.nativeElement.dataset['index'] = String(index);
      this.statObserver?.observe(item.nativeElement);
    });
  }

  private countUp(element: HTMLElement, target: number, suffix: string): void {
    const start = performance.now();
    const duration = 1100;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = `${Math.round(target * eased)}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }
}

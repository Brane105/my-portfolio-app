import { Component, computed, signal } from '@angular/core';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

type ProjectCategory = 'Frontend' | 'Backend' | 'Full Stack';
type FilterCategory = 'All' | ProjectCategory;

interface Project {
  title: string;
  description: string;
  stack: string[];
  category: ProjectCategory;
  color: string;
  image: string;
  url: string;
}

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
  animations: [
    trigger('projectGrid', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'scale(0.96) translateY(16px)' }),
          stagger(80, animate('260ms ease-out', style({ opacity: 1, transform: 'scale(1) translateY(0)' })))
        ], { optional: true }),
        query(':leave', [
          stagger(40, animate('180ms ease-in', style({ opacity: 0, transform: 'scale(0.96)' })))
        ], { optional: true })
      ])
    ])
  ]
})
export class PortfolioComponent {
  filters: FilterCategory[] = ['All', 'Frontend', 'Backend', 'Full Stack'];
  activeFilter = signal<FilterCategory>('All');

  projects: Project[] = [
    {
      title: 'ClipForge AI',
      description: 'AI-powered clip creation tool for turning media into polished short-form content workflows.',
      stack: ['React', 'AI', 'Vercel'],
      category: 'Full Stack',
      color: '#9333ea',
      image: 'assets/images/ai%20coforge%20.png',
      url: 'https://clipforge-ai-iota.vercel.app/'
    },
    {
      title: 'Kanban Board App',
      description: 'Drag-and-drop task management board with columns, task cards, labels, and persistence.',
      stack: ['Angular', 'Node.js'],
      category: 'Full Stack',
      color: '#7c3aed',
      image: 'assets/images/kanban.png',
      url: 'https://kanban-board-application-ykx9.vercel.app/'
    },
    {
      title: 'Real Estate Listing App',
      description: 'Property discovery platform with filters, image galleries, recent offers feed, and listing detail pages.',
      stack: ['React', 'Node.js', 'MongoDB'],
      category: 'Full Stack',
      color: '#2563eb',
      image: 'assets/images/realtor.png',
      url: 'https://real-estate-application-five.vercel.app/'
    },
    {
      title: 'CarPool App',
      description: 'Real-time carpooling platform with route visualization, seat booking, fuel-share calculation, and live availability.',
      stack: ['Angular', 'Node.js', 'MongoDB', 'Google Maps API'],
      category: 'Full Stack',
      color: '#16a34a',
      image: 'assets/images/poolpalava.png',
      url: 'https://carpoolfrontend.vercel.app/'
    }
  ];

  filteredProjects = computed(() => {
    const filter = this.activeFilter();
    return filter === 'All' ? this.projects : this.projects.filter((project) => project.category === filter);
  });

  setFilter(filter: FilterCategory): void {
    this.activeFilter.set(filter);
  }

  trackProject(_: number, project: Project): string {
    return project.title;
  }
}

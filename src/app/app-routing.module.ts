import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'Bhalchandra Rane | Full Stack Software Engineer in Mumbai',
      description:
        'Portfolio of Bhalchandra Rane, a Mumbai-based full stack software engineer building Angular, React, Node.js, Spring Boot, database, and cloud-ready web applications.',
      canonical: 'https://brane-portfolio-app.vercel.app/'
    }
  },
  { path: 'home', component: HomeComponent, data: { section: 'home' } },
  {
    path: 'services',
    component: HomeComponent,
    data: {
      section: 'services',
      title: 'Services | Full Stack Web Development by Bhalchandra Rane',
      description:
        'Full-stack development services for responsive web apps, frontend engineering, backend APIs, cloud deployment, debugging, maintenance, and architecture.',
      canonical: 'https://brane-portfolio-app.vercel.app/services'
    }
  },
  {
    path: 'contact',
    component: HomeComponent,
    data: {
      section: 'contact',
      title: 'Contact Bhalchandra Rane | Full Stack Developer',
      description:
        'Contact Bhalchandra Rane for full-stack web development, Angular, React, Node.js, Spring Boot, cloud deployment, and software collaboration.',
      canonical: 'https://brane-portfolio-app.vercel.app/contact'
    }
  },
  {
    path: 'portfolio',
    component: HomeComponent,
    data: {
      section: 'portfolio',
      title: 'Portfolio Projects | Bhalchandra Rane Software Engineer',
      description:
        'Explore full-stack projects by Bhalchandra Rane, including carpooling, real estate, Kanban, SaaS dashboards, automation, and community web applications.',
      canonical: 'https://brane-portfolio-app.vercel.app/portfolio'
    }
  },
  {
    path: 'service',
    redirectTo: 'services',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', scrollPositionRestoration: 'disabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ServiceComponent } from './service/service.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

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
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  {
    path: 'contact',
    component: ContactComponent,
    data: {
      title: 'Contact Bhalchandra Rane | Full Stack Developer',
      description:
        'Contact Bhalchandra Rane for full-stack web development, Angular, React, Node.js, Spring Boot, cloud deployment, and software collaboration.',
      canonical: 'https://brane-portfolio-app.vercel.app/contact'
    }
  },
  {
    path: 'service',
    component: ServiceComponent,
    data: {
      title: 'Services | Full Stack Web Development by Bhalchandra Rane',
      description:
        'Full-stack development services for responsive web apps, frontend engineering, backend APIs, cloud deployment, debugging, maintenance, and architecture.',
      canonical: 'https://brane-portfolio-app.vercel.app/service'
    }
  },
  {
    path: 'portfolio',
    component: PortfolioComponent,
    data: {
      title: 'Portfolio Projects | Bhalchandra Rane Software Engineer',
      description:
        'Explore full-stack projects by Bhalchandra Rane, including real estate apps, Kanban boards, voting workflows, contact management, and carpool coordination.',
      canonical: 'https://brane-portfolio-app.vercel.app/portfolio'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

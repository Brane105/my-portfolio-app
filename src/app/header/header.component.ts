import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuOpen = false;
  scrolled = false;
  darkMode = false;

  navItems = [
    { label: 'Home', route: '/home', section: 'home', icon: 'ti-home' },
    { label: 'Services', route: '/services', section: 'services', icon: 'ti-tool' },
    { label: 'Portfolio', route: '/portfolio', section: 'portfolio', icon: 'ti-layout-grid' },
    { label: 'Contact', route: '/contact', section: 'contact', icon: 'ti-mail' }
  ];

  ngOnInit(): void {
    this.scrolled = window.scrollY > 8;
    this.darkMode = document.body.classList.contains('dark');
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 8;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  toggleTheme(): void {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
  }
}

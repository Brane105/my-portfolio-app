import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  status = false;

  addToggle() {
    this.status = !this.status;
  }

  closeMenu() {
    this.status = false;
  }
}

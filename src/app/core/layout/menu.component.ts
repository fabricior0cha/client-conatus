import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  public sidebar: Element | null = null;

  ngOnInit(): void {
    this.sidebar = document.querySelector('.sidebar');
  }

  onClick() {
    if (this.sidebar) {
      this.sidebar.classList.toggle('-translate-x-100');
    }
  }
}

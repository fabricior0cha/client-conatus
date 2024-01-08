import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  @Output() onToggleExpandSidebar = new EventEmitter();

  onClick() {
    if (document.querySelector('.sidebar')) {
      document.querySelector('.sidebar')?.classList.toggle('-translate-x-100');
    }
  }

  onToggleExpand() {
    this.onToggleExpandSidebar.emit();
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  @Input() isSidebarExpanded: boolean;

  public menuItems: MenuItem[] | undefined;
  public router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  ngOnInit(): void {
    this.menuItems = [
      {
        label: 'Fornecedor',
        icon: 'pi pi-fw pi-box',
        routerLink: '/fornecedores',
        command: () => {
          this.closeSidebar();
        },
      },
      {
        label: 'Categoria',
        icon: 'pi pi-fw pi-tags',
        routerLink: '/categorias',
        command: () => {
          this.closeSidebar();
        },
      },
      {
        label: 'Produto',
        icon: 'pi pi-fw pi-shopping-cart',
        routerLink: '/produtos',
        command: () => {
          this.closeSidebar();
        },
      },
      {
        label: 'Cliente',
        icon: 'pi pi-fw pi-user',
        routerLink: '/clientes',
        command: () => {
          this.closeSidebar();
        },
      },
    ];
  }

  closeSidebar() {
    if (document.querySelector('.sidebar')) {
      document.querySelector('.sidebar')?.classList.toggle('-translate-x-100');
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  public menuItems: MenuItem[] | undefined;

  ngOnInit(): void {
    this.menuItems = [
      {
        label: 'Cadastros',
        icon: 'pi pi-fw pi-file',
        items: [
          {
            label: 'Fornecedor',
            icon: 'pi pi-fw pi-box',
            routerLink: '/fornecedores',
          },
          {
            label: 'Categoria',
            icon: 'pi pi-fw pi-tags',
            routerLink: '/categorias',
          },
          {
            label: 'Produto',
            icon: 'pi pi-fw pi-shopping-cart',
            routerLink: '/produtos',
          },
          {
            label: 'Cliente',
            icon: 'pi pi-fw pi-user',
            routerLink: '/clientes',
          },
        ],
      },
    ];
  }
}

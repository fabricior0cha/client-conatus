import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'client-conatus';

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
          },
        ],
      },
    ];
  }
}

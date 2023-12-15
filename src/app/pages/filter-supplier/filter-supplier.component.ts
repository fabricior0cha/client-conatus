import { Component } from '@angular/core';

@Component({
  selector: 'app-filter-supplier',
  templateUrl: './filter-supplier.component.html',
  styleUrls: ['./filter-supplier.component.scss'],
})
export class FilterSupplierComponent {
  suppliers = [
    {
      nome: 'Fornecedor 1',
      dataAtualizacao: '2023-12-15T01:00:02.841Z',
    },
    {
      nome: 'Fornecedor 2',
      dataAtualizacao: '2023-12-15T01:00:02.841Z',
    },
  ];
}

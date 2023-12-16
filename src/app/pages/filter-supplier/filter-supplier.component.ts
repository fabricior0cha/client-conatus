import { Component, OnInit } from '@angular/core';
import { Pageable } from 'src/app/model/pageable';
import { Supplier } from 'src/app/model/supplier';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-filter-supplier',
  templateUrl: './filter-supplier.component.html',
  styleUrls: ['./filter-supplier.component.scss'],
})
export class FilterSupplierComponent implements OnInit {
  public suppliers: Pageable<Supplier>;

  constructor(private supplierService: SupplierService) {}

  ngOnInit(): void {
    this.supplierService.getSuppliers().subscribe((data) => {
      this.suppliers = data;
    });
  }
}

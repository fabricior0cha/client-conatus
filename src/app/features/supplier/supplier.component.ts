import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Paginator, PaginatorState } from 'primeng/paginator';
import { BasicModelResource } from 'src/app/core/models/basic-resource.model';
import { Pageable } from 'src/app/core/models/pageable.model';
import { Supplier } from 'src/app/core/models/supplier.model';
import { SupplierService } from 'src/app/core/services/supplier.service';
import { AbstractBasicFeatureComponent } from 'src/app/shared/abstract-basic-feature.component';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
})
export class SupplierComponent
  extends AbstractBasicFeatureComponent<
    Supplier,
    BasicModelResource<Supplier>,
    SupplierService
  >
  implements OnInit
{
  constructor(
    private fb: FormBuilder,
    private supplierService: SupplierService,
    messageService: MessageService
  ) {
    super(messageService, supplierService);
  }

  ngOnInit(): void {
    this.supplierService.get({ page: 0, size: 10 }).subscribe((data) => {
      this.data = data;
    });
    this.form = this.fb.group({
      id: [''],
      nome: [''],
    });
  }
}

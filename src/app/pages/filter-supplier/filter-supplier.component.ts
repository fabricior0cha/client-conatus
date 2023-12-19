import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
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

  public visibleModal: boolean = false;

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.supplierService.getSuppliers().subscribe((data) => {
      this.suppliers = data;
    });
    this.form = this.fb.group({
      nome: [''],
    });
  }

  public openModal(): void {
    this.visibleModal = true;
  }

  public saveSupplier(): void {
    this.supplierService.createSupplier(this.form.value).subscribe(
      (data) => {
        this.visibleModal = false;
        this.showSucess();
        this.ngOnInit();
      },
      (err: HttpErrorResponse) => {
        this.showErrors(err);
      }
    );
  }

  public showSucess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Successo',
      detail: 'Cadastro realizado com sucesso',
    });
  }

  public showErrors(err: HttpErrorResponse) {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: err?.error?.erros?.map((e: any) => e.detalhe).join('\n'),
    });
  }
}

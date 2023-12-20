import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Paginator, PaginatorState } from 'primeng/paginator';
import { Pageable } from 'src/app/core/models/pageable.model';
import { Supplier } from 'src/app/core/models/supplier.model';
import { SupplierService } from 'src/app/core/services/supplier.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
})
export class SupplierComponent implements OnInit {
  public suppliers: Pageable<Supplier>;

  public visibleModal: boolean = false;

  public form: FormGroup;

  first: number = 0;

  rows: number = 5;

  @ViewChild('paginator', { static: true }) paginator: Paginator;

  constructor(
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.supplierService.getSuppliers(0, 5).subscribe((data) => {
      this.suppliers = data;
    });
    this.form = this.fb.group({
      id: [''],
      nome: [''],
    });
  }

  public openModal(): void {
    this.visibleModal = true;
  }

  public openModalToUpdate(supplier: Supplier): void {
    this.visibleModal = true;
    this.form.patchValue(supplier);
  }

  public saveSupplier(): void {
    if (this.form.get('id')?.value) {
      this.supplierService.updateSupplier(this.form.value).subscribe(
        (data) => {
          this.visibleModal = false;
          this.showSucess('Cadastro atualizado com sucesso');
          this.form = this.fb.group({
            id: [''],
            nome: [''],
          });
          this.supplierService.getSuppliers(0, 5).subscribe((data) => {
            this.paginator.changePage(data.totalPages - 1);
          });
        },
        (err: HttpErrorResponse) => {
          this.showErrors(err);
        }
      );
      return;
    }

    this.supplierService.createSupplier(this.form.value).subscribe(
      (data) => {
        this.visibleModal = false;
        this.showSucess();
        this.supplierService.getSuppliers(0, 5).subscribe((data) => {
          this.suppliers = data;
          this.paginator.changePage(data.totalPages - 1);
        });
        this.form = this.fb.group({
          id: [''],
          nome: [''],
        });
      },
      (err: HttpErrorResponse) => {
        this.showErrors(err);
      }
    );
  }

  public showSucess(message: string = 'Cadastro realizado com sucesso') {
    this.messageService.add({
      severity: 'success',
      summary: 'Successo',
      detail: message,
    });
  }

  public showErrors(err: HttpErrorResponse) {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: err?.error?.erros?.map((e: any) => e.detalhe).join('\n'),
    });
  }

  public onPageChange(event: PaginatorState): void {
    this.supplierService
      .getSuppliers(event.page, event.rows)
      .subscribe((data) => {
        this.suppliers = data;
      });
  }
}

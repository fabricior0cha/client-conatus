import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Paginator, PaginatorState } from 'primeng/paginator';
import { BasicResourceService } from '../core/services/basic-resource.service';
import { BasicModelResource } from '../core/models/basic-resource.model';
import { Pageable } from '../core/models/pageable.model';
import { Inject } from '@angular/core';

@Component({
  template: '',
})
export class AbstractBasicFeatureComponent<
  M,
  T extends BasicModelResource<M>,
  S extends BasicResourceService<T>
> {
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  public visibleModal: boolean = false;

  public form: FormGroup;

  public data: Pageable<T>;

  public first: number = 0;

  public rows: number = 10;

  public constructor(
    private messageService: MessageService,
    @Inject('BasicResourceService') private service: S
  ) {}

  public onSubmit = (): void => {
    if (this.form.invalid) return;

    if (this.form.get('id')?.value) {
      this.service.update(this.buildRequest()).subscribe({
        next: () => {
          this.onSuccessSave('Cadastro atualizado com sucesso');
        },
        error: (err: HttpErrorResponse) => {
          this.showErrors(err);
        },
      });
      return;
    } else {
      this.service.create(this.buildRequest()).subscribe({
        next: () => {
          this.onSuccessSave();
        },
        error: (err: HttpErrorResponse) => {
          this.showErrors(err);
        },
      });
    }
  };

  public openModal(): void {
    this.form.reset();
    this.visibleModal = true;
  }

  public openModalToUpdate(data: T): void {
    this.visibleModal = true;
    this.form.patchValue(data);
  }

  public showSucess(message: string) {
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

  public onSuccessSave(msg = 'Cadastro realizado com sucesso') {
    this.form.reset();
    this.showSucess(msg);
    this.visibleModal = false;
    this.service.get({ page: 0, size: 10 }).subscribe((data) => {
      this.paginator.changePage(data.totalPages - 1);
    });
  }

  public onPageChange(event: PaginatorState): void {
    this.service
      .get({ page: event.page, size: event.rows })
      .subscribe((data) => {
        this.data = data;
      });
  }

  public buildRequest(): void {
    return this.form.value;
  }

  public isFieldValid(field: string) {
    return this.form?.get(field)?.invalid && this.form?.get(field)?.dirty;
  }
}

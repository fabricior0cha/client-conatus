import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Paginator, PaginatorState } from 'primeng/paginator';
import { Category } from 'src/app/core/models/category.model';
import { Pageable } from 'src/app/core/models/pageable.model';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
})
export class CategoryComponent implements OnInit {
  public categories: Pageable<Category>;

  public visibleModal: boolean = false;

  public form: FormGroup;

  first: number = 0;

  rows: number = 5;

  @ViewChild('paginator', { static: true }) paginator: Paginator;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories(0, 5).subscribe((data) => {
      this.categories = data;
    });
    this.form = this.fb.group({
      id: [''],
      descricao: [''],
    });
  }

  public openModal(): void {
    this.form.reset();
    this.visibleModal = true;
  }

  public openModalToUpdate(category: Category): void {
    this.visibleModal = true;
    this.form.patchValue(category);
  }

  public saveCategory(): void {
    if (this.form.get('id')?.value) {
      this.categoryService.updateCategory(this.form.value).subscribe(
        (data) => {
          this.visibleModal = false;
          this.showSucess('Cadastro atualizado com sucesso');
          this.form = this.fb.group({
            id: [''],
            descricao: [''],
          });
          this.categoryService.getCategories(0, 5).subscribe((data) => {
            this.paginator.changePage(data.totalPages - 1);
          });
        },
        (err: HttpErrorResponse) => {
          this.showErrors(err);
        }
      );
      return;
    }

    this.categoryService.createCategory(this.form.value).subscribe(
      (data) => {
        this.visibleModal = false;
        this.showSucess();
        this.categoryService.getCategories(0, 5).subscribe((data) => {
          this.categories = data;
          this.paginator.changePage(data.totalPages - 1);
        });
        this.form = this.fb.group({
          id: [''],
          descricao: [''],
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
    this.categoryService
      .getCategories(event.page, event.rows)
      .subscribe((data) => {
        this.categories = data;
      });
  }
}

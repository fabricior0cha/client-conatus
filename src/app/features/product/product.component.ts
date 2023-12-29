import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { Paginator, PaginatorState } from 'primeng/paginator';
import { Category } from 'src/app/core/models/category.model';
import { Pageable } from 'src/app/core/models/pageable.model';
import { Product } from 'src/app/core/models/product.model';
import { RequestProduct } from 'src/app/core/models/request-product.model';
import { Supplier } from 'src/app/core/models/supplier.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';
import { SupplierService } from 'src/app/core/services/supplier.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  public products: Pageable<Product>;

  public visibleModal: boolean = false;

  public form: FormGroup;

  public first: number = 0;

  public rows: number = 10;

  public suppliers: Supplier[] = [];

  public categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private supplierService: SupplierService,
    private categoryService: CategoryService,
    private messageService: MessageService
  ) {}

  @ViewChild('paginator', { static: true }) paginator: Paginator;

  ngOnInit(): void {
    this.productService.get({ page: 0, size: 10 }).subscribe((data) => {
      this.products = data;
    });
    this.form = this.fb.group({
      id: [''],
      descricao: [''],
      valor: [''],
      fornecedor: this.fb.control<Supplier>({} as Supplier),
      categorias: this.fb.control<Category[]>([]),
    });
  }

  public openModal(): void {
    this.form.reset();
    this.visibleModal = true;
  }

  public openModalToUpdate(product: Product): void {
    this.visibleModal = true;
    this.form.patchValue({
      ...product,
      categorias: product.categorias.map((c) => ({
        id: c.idCategoria,
        descricao: c.descricao,
      })),
      valor: product.valor.toString().replaceAll('.', ','),
    });
  }

  public getFormattedCategorias = (product: Product): string => {
    return product.categorias.map((c) => c.descricao).join(', ');
  };

  public onPageChange(event: PaginatorState): void {
    this.productService
      .get({ page: event.page, size: event.rows })
      .subscribe((data) => {
        this.products = data;
      });
  }

  public searchSuppliers = (event: AutoCompleteCompleteEvent): void => {
    this.supplierService.searchByName(event.query).subscribe((data) => {
      this.suppliers = data.content;
    });
  };

  public searchCategories = (event: AutoCompleteCompleteEvent): void => {
    this.categoryService.searchByDescription(event.query).subscribe((data) => {
      this.categories = data.content?.filter(
        (c) =>
          !this.form
            .get('categorias')
            ?.value?.find((f: Category) => f.id === c.id)
      );
    });
  };

  public submit(): void {
    if (this.form.get('id')?.value) {
      this.update();
      return;
    }
    this.save();
  }

  public save(): void {
    const product = this.buildProduct();
    this.productService.create(product).subscribe({
      next: () => {
        this.visibleModal = false;
        this.showSucess();
        this.productService.get({ page: 0, size: 10 }).subscribe((data) => {
          this.products = data;
          this.paginator.changePage(data.totalPages - 1);
        });
        this.form.reset();
      },
      error: (err: HttpErrorResponse) => {
        this.showErrors(err);
      },
    });
  }

  public update(): void {
    const product = this.buildProduct();
    this.productService.update(product).subscribe({
      next: () => {
        this.visibleModal = false;
        this.showSucess('Cadastro atualizado com sucesso');
        this.productService.get({ page: 0, size: 10 }).subscribe((data) => {
          this.products = data;
          this.paginator.changePage(data.totalPages - 1);
        });
        this.form.reset();
      },
      error: (err: HttpErrorResponse) => {
        this.showErrors(err);
      },
    });
  }

  public buildProduct(): RequestProduct {
    const product = new RequestProduct();
    product.id = this.form.get('id')?.value;
    product.descricao = this.form.get('descricao')?.value;
    product.valorUnitario = this.form.get('valor')?.value;
    product.idFornecedor = this.form.get('fornecedor')?.value?.id;
    product.categorias = this.form
      .get('categorias')
      ?.value?.map((c: Category) => ({ idCategoria: c.id }));
    return product;
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

  public getFormattedValue = (product: Product): string => {
    return `R$ ${
      product?.valor ? product.valor.toString().replaceAll('.', ',') : 0
    }`;
  };
}

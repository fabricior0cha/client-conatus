import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { Paginator, PaginatorState } from 'primeng/paginator';
import { BasicModelResource } from 'src/app/core/models/basic-resource.model';
import { Category } from 'src/app/core/models/category.model';
import { Pageable } from 'src/app/core/models/pageable.model';
import { Product } from 'src/app/core/models/product.model';
import { RequestProduct } from 'src/app/core/models/request-product.model';
import { Supplier } from 'src/app/core/models/supplier.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';
import { SupplierService } from 'src/app/core/services/supplier.service';
import { AbstractBasicFeatureComponent } from 'src/app/shared/abstract-basic-feature.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent
  extends AbstractBasicFeatureComponent<
    Product,
    BasicModelResource<Product>,
    ProductService
  >
  implements OnInit
{
  public suppliers: Supplier[] = [];

  public categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private supplierService: SupplierService,
    private categoryService: CategoryService,
    messageService: MessageService
  ) {
    super(messageService, productService);
  }

  ngOnInit(): void {
    this.productService.get({ page: 0, size: 10 }).subscribe((data) => {
      this.data = data;
    });
    this.form = this.fb.group({
      id: [null],
      descricao: [''],
      valor: [null],
      fornecedor: [{}],
      categorias: [[]],
    });
  }

  public override openModalToUpdate(product: Product): void {
    this.visibleModal = true;
    this.form.patchValue({
      ...product,
      categorias: product.categorias.map((c) => ({
        id: c.idCategoria,
        descricao: c.descricao,
      })),
      valor: product.valor,
    });
  }

  public getFormattedCategorias = (product: Product): string => {
    return product.categorias.map((c) => c.descricao).join(', ');
  };

  public getFormattedValue = (product: Product): string => {
    return `R$ ${
      product?.valor ? product.valor.toString().replaceAll('.', ',') : 0
    }`;
  };

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

  public override buildRequest(): RequestProduct {
    const product = new RequestProduct();
    product.id = this.form.get('id')?.value;
    product.descricao = this.form.get('descricao')?.value;
    product.valorUnitario = this.form.get('valor')?.value;
    product.idFornecedor = this.form.get('fornecedor')?.value?.id ?? null;
    product.categorias =
      this.form
        .get('categorias')
        ?.value?.map((c: Category) => ({ idCategoria: c.id })) ?? [];
    return product;
  }
}

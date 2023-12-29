import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Paginator, PaginatorState } from 'primeng/paginator';
import { BasicModelResource } from 'src/app/core/models/basic-resource.model';
import { Category } from 'src/app/core/models/category.model';
import { Pageable } from 'src/app/core/models/pageable.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { AbstractBasicFeatureComponent } from 'src/app/shared/abstract-basic-feature.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
})
export class CategoryComponent
  extends AbstractBasicFeatureComponent<
    Category,
    BasicModelResource<Category>,
    CategoryService
  >
  implements OnInit
{
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    messageService: MessageService
  ) {
    super(messageService, categoryService);
  }

  ngOnInit(): void {
    this.categoryService.get({ page: 0, size: 10 }).subscribe((data) => {
      this.data = data;
    });
    this.form = this.fb.group({
      id: [''],
      descricao: [''],
    });
  }
}

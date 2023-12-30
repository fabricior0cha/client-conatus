import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierComponent } from './features/supplier/supplier.component';
import { CategoryComponent } from './features/category/category.component';
import { ProductComponent } from './features/product/product.component';
import { CustomerComponent } from './features/customer/customer.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'fornecedores',
    pathMatch: 'full',
  },
  {
    path: 'fornecedores',
    component: SupplierComponent,
  },
  {
    path: 'categorias',
    component: CategoryComponent,
  },
  {
    path: 'produtos',
    component: ProductComponent,
  },
  {
    path: 'clientes',
    component: CustomerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

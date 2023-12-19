import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilterSupplierComponent } from './pages/filter-supplier/filter-supplier.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'fornecedores',
    pathMatch: 'full',
  },
  {
    path: 'fornecedores',
    component: FilterSupplierComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

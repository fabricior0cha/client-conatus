import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { FilterSupplierComponent } from './pages/filter-supplier/filter-supplier.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    FilterSupplierComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    HttpClientModule,
    ReactiveFormsModule,
    MessagesModule,
    MessageModule,
    NgxMaskDirective,
    NgxMaskPipe,
    ToastModule,
    TableModule,
    SidebarModule,
  ],
  providers: [
    MessageService,
    provideNgxMask({
      validation: false,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

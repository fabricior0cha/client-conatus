import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BasicModelResource } from 'src/app/core/models/basic-resource.model';
import { Customer } from 'src/app/core/models/customer.model';
import { AddressService } from 'src/app/core/services/address.service';
import { CustomerService } from 'src/app/core/services/customer.service';
import { AbstractBasicFeatureComponent } from 'src/app/shared/abstract-basic-feature.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
})
export class CustomerComponent extends AbstractBasicFeatureComponent<
  Customer,
  BasicModelResource<Customer>,
  CustomerService
> {
  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private addressService: AddressService,
    messageService: MessageService
  ) {
    super(messageService, customerService);
  }

  ngOnInit(): void {
    this.customerService.get({ page: 0, size: 10 }).subscribe((data) => {
      this.data = data;
    });
    this.form = this.fb.group({
      id: [null],
      nome: [''],
      cpf: [''],
      email: [''],
      celular: [''],
      telefone: [''],
      observacao: [''],
      endereco: this.fb.group({
        cep: [''],
        logradouro: [''],
        numero: [''],
        complemento: [''],
        bairro: [''],
        municipio: [''],
        uf: [''],
      }),
    });
  }

  public override openModalToUpdate(customer: Customer): void {
    this.visibleModal = true;
    this.customerService.getById(customer.id).subscribe({
      next: (data: Customer) => {
        this.form.patchValue({
          ...data,
          endereco: {
            ...data.endereco,
            cep: data.endereco.cep,
          },
        });
      },
      error: (err) => {
        this.showErrors(err);
      },
    });
  }

  public findByCep(): void {
    this.form.reset({
      ...this.form.value,
      endereco: {
        cep: this.form.get('endereco.cep')?.value,
      },
    });

    if (!this.form?.get('endereco.cep')?.value) return;
    this.addressService
      .getByCep(this.form?.get('endereco.cep')?.value)
      .subscribe({
        next: (data) => {
          this.form?.get('endereco')?.patchValue(data);
        },
        error: (err) => {
          this.showErrors(err);
        },
      });
  }
}

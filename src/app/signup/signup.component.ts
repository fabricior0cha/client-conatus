import { Component, OnInit } from '@angular/core';
import { Dominio } from '../model/dominio';
import { DominioService } from '../services/dominio.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Tenant } from '../model/tenant';
import { SignupService } from '../services/signup.service';
import { GenericValidator } from '../utils/genericValidator';
import { MessageService } from 'primeng/api';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public step: number = 0;

  public form: FormGroup;

  public listGender: Dominio[] = [];

  public listDepartment: Dominio[] = [];

  constructor(
    private fb: FormBuilder,
    private dominioService: DominioService,
    private signupService: SignupService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        pessoaJuridica: this.fb.group({
          nomeFantasia: ['', Validators.nullValidator],
          razaoSocial: ['', Validators.nullValidator],
          cnpj: ['', Validators.nullValidator],
          idRamoAtividade: [null, Validators.nullValidator],
        }),
        usuario: this.fb.group({
          cpf: ['', Validators.nullValidator],
          idGenero: [null, Validators.nullValidator],
          nome: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          telefone: ['', Validators.nullValidator],
          senha: ['', Validators.required],
        }),
      },
      { updateOn: 'blur' }
    );
  }

  public nextStep() {
    if (!this.form.valid) return;
    if (this.step == 0) {
      this.form.get('usuario.telefone')?.setValidators([Validators.required]);
      this.form.get('usuario.idGenero')?.setValidators([Validators.required]);
      this.form
        .get('usuario.cpf')
        ?.setValidators([Validators.required, GenericValidator.isValidCpf()]);
      this.getListGender();
    }
    if (this.step == 1) {
      this.form
        .get('pessoaJuridica.nomeFantasia')
        ?.setValidators([Validators.required]);
      this.form
        .get('pessoaJuridica.razaoSocial')
        ?.setValidators([Validators.required]);
      this.form
        .get('pessoaJuridica.cnpj')
        ?.setValidators([Validators.required, GenericValidator.isValidCnpj()]);
      this.form
        .get('pessoaJuridica.idRamoAtividade')
        ?.setValidators([Validators.required]);
      this.getListDepartment();
    }
    if (this.step == 2) {
      this.signup();
      return;
    }
    this.step++;
  }

  public getListGender() {
    this.dominioService.getDomainByCode('TIPO_GENERO').subscribe((data) => {
      this.listGender = data;
    });
  }

  public getListDepartment() {
    this.dominioService.getDomainByCode('RAMO_ATIV').subscribe((data) => {
      this.listDepartment = data;
    });
  }

  public signup() {
    const tenant = new Tenant();
    tenant.pessoaJuridica = {
      ...this.form.get('pessoaJuridica')?.value,
      cnpj: this.form.get('pessoaJuridica.cnpj')?.value.replace(/\D/g, ''),
    };
    tenant.usuario = {
      ...this.form.get('usuario')?.value,
      cpf: this.form.get('usuario.cpf')?.value.replace(/\D/g, ''),
      telefone: this.form.get('usuario.telefone')?.value.replace(/\D/g, ''),
    };

    this.signupService.signup(tenant).subscribe(
      () => {
        this.showSucess();
      },
      (err: HttpErrorResponse) => {
        this.showErrors(err);
      }
    );
  }

  public isFieldValid(field: string) {
    return (
      this.form?.get(field)?.invalid &&
      this.form?.get(field)?.touched &&
      this.form?.get(field)?.dirty
    );
  }

  public showSucess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Successo',
      detail: 'Cadastro realizado com sucesso',
    });
  }

  public showErrors(err: HttpErrorResponse) {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: err?.error?.erros?.map((e: any) => e.detalhe).join('\n'),
    });
  }

  get email() {
    return this.form.get('usuario.email');
  }

  get cpf() {
    return this.form.get('usuario.cpf');
  }

  get cnpj() {
    return this.form.get('pessoaJuridica.cnpj');
  }
}

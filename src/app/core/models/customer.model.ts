import { Address } from './address.model';
import { BasicModelResource } from './basic-resource.model';

export class Customer extends BasicModelResource<Customer> {
  nome: string;
  cpf: string;
  email: string;
  celular: string;
  telefone: string;
  situacao: string;
  tenant: string;
  endereco: Address;
}

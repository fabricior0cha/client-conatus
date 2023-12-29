import { BasicModelResource } from './basic-resource.model';

export class Supplier extends BasicModelResource<Supplier> {
  nome: string;
  dataAtualizacao: Date;
  usuarioAtualizacao: string;

  public constructor(model: Supplier) {
    super(model);
    if (model) {
      Object.assign(this, model);
    }
  }
}

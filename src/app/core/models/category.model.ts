import { BasicModelResource } from './basic-resource.model';

export class Category extends BasicModelResource<Category> {
  descricao: string;
  usuarioAtualizacao: string;
  dataAtualizacao: Date;

  constructor(model: Category) {
    super(model);
    if (model) {
      Object.assign(this, model);
    }
  }
}

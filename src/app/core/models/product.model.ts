import { BasicModelResource } from './basic-resource.model';
import { Supplier } from './supplier.model';

export class Product extends BasicModelResource<Product> {
  descricao: string;
  valor: number;
  fornecedor: Supplier;
  situacao: string;
  categorias: [
    {
      id: number;
      idCategoria: number;
      descricao: string;
    }
  ];
  dataAtualizacao: Date;

  public constructor(model: Product) {
    super(model);
    if (model) {
      Object.assign(this, model);
    }
  }
}

export class RequestProduct {
  id?: number;
  descricao: string;
  valorUnitario: number;
  idFornecedor: number;
  idSituacao: number;
  categorias: {
    idCategoria: number;
  }[];
}

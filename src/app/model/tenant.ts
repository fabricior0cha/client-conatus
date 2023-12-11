export class Tenant {
  pessoaJuridica: {
    nomeFantasia: string;
    razaoSocial: string;
    cnpj: string;
    idRamoAtividade: number;
  };

  usuario: {
    cpf: string;
    idGenero: number;
    nome: string;
    email: string;
    telefone: string;
    senha: string;
  };
}

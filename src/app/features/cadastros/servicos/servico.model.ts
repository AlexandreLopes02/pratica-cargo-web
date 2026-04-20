export type TipoServico = 'carga' | 'descarga';

export interface Servico {
  id?: number;
  empresaId: number;
  motoristaId: number;
  cargaId: number;
  peso: number;
  quemRetira: string;
  data: string; // yyyy-mm-dd
  tipo: TipoServico;
}

// Para exibição na lista quando usamos _expand
export interface ServicoExpandido extends Servico {
  empresa?: { id: number; nome: string; cnpj: string };
  motorista?: { id: number; nome: string; cpf: string };
  carga?: { id: number; nome: string };
}

export type TipoConta = 'CACC' | 'SVGS'; // Conta Corrente ou Poupança

export interface RecebedorPix {
  nome: string;
  cpfCnpj: string;
  ispb: string;
  agencia: string;
  contaTransacional: string;
  tipoConta: TipoConta;
}

export interface PagadorPix {
  nome: string;
  cpfCnpj: string;
  agencia: string;
  contaTransacional: string;
  tipoConta: TipoConta;
}


export interface MensagemPix {
  endToEndId: string;
  valor: number;
  pagador: PagadorPix;
  recebedor: RecebedorPix;
  campoLivre: string;
  txId: string;
  dataHoraPagamento: string;
}
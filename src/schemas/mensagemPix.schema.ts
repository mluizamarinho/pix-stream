export type TipoConta = 'CACC' | 'SVGS'; // Conta Corrente ou Poupança

export interface PessoaPix {
  nome: string;
  cpfCnpj: string;
  ispb: string;
  agencia: string;
  contaTransacional: string;
  tipoConta: TipoConta;
}

export interface MensagemPix {
  endToEndId: string;
  valor: number;
  pagador: PessoaPix;
  recebedor: PessoaPix;
  campoLivre: string;
  txId: string;
  dataHoraPagamento: string;
}
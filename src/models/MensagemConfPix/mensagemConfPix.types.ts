export type TipoConta = 'CACC' | 'SVGS'; // Conta Corrente ou Conta Poupança

export interface PessoaPix {
  nome: string;
  cpfCnpj: string;
  ispb: string;
  agencia: string;
  contaTransacional: string;
  tipoConta: TipoConta;
}
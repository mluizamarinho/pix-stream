import { PessoaPix } from "./mensagemConfPix.types";

export interface MensagemPix {
  endToEndId: string;
  valor: number;
  pagador: PessoaPix;
  recebedor: PessoaPix;
  campoLivre: string;
  txId: string;
  dataHoraPagamento: string;
}
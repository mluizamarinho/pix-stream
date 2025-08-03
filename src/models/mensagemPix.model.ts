import { pool } from '../config/db';
import { MensagemPix } from '../schemas/mensagemPix.schema';

export async function insereMensagemPix(mensagem: MensagemPix) {
  const query = `
    INSERT INTO mensagens_pix (
      endToEndId,
      valor,
      pagador,
      recebedor,
      campoLivre,
      txId,
      dataHoraPagamento
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)
  `;

  const values = [
    mensagem.endToEndId,
    mensagem.valor,
    JSON.stringify(mensagem.pagador),
    JSON.stringify(mensagem.recebedor),
    mensagem.campoLivre,
    mensagem.txId,
    mensagem.dataHoraPagamento,
  ];

  await pool.query(query, values);
}

import { pool } from '../config/pool.db';
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

export async function criarStream(interactionId: string, ispb: string) {
  await pool.query(
    'INSERT INTO pix_streams (interaction_id, ispb, last_read_id, created_at) VALUES ($1, $2, $3, NOW())',
    [interactionId, ispb, 0]
  );
}

export async function buscarStreamPorId(interactionId: string, ispb: string) {
  const result = await pool.query(
    'SELECT * FROM pix_streams WHERE interaction_id = $1 AND ispb = $2',
    [interactionId, ispb]
  );
  return result.rows[0];
}

export async function atualizarProgressoStream(interactionId: string, ispb: string, lastReadId: number) {
  await pool.query(
    'UPDATE pix_streams SET last_read_id = $1 WHERE interaction_id = $2 AND ispb = $3',
    [lastReadId, interactionId, ispb]
  );
}

export async function buscarMensagensPix(ispb: string, lastReadId: number, limit: number) {
  const result = await pool.query(
    `SELECT * FROM mensagens_pix
     WHERE recebedor->>'ispb' = $1 AND id > $2
     ORDER BY id ASC
     LIMIT $3`,
    [ispb, lastReadId, limit]
  );
  return result.rows;
}
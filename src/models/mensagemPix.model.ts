import { pool } from '../config/pool.db';
import { MensagemPix } from '../schemas/mensagemPix.schema';

import { prisma } from '../lib/prisma';

export async function insereMensagemPix(mensagem: MensagemPix) {
  await prisma.mensagemPix.create({
    data: {
      endToEndId: mensagem.endToEndId,
      valor: mensagem.valor,
      txId: mensagem.txId,
      dataHoraPagamento: new Date(mensagem.dataHoraPagamento),
      campoLivre: mensagem.campoLivre,

      pagadorNome: mensagem.pagador.nome,
      pagadorCpfCnpj: mensagem.pagador.cpfCnpj,
      pagadorIspb: mensagem.pagador.ispb,
      pagadorAgencia: mensagem.pagador.agencia,
      pagadorConta: mensagem.pagador.contaTransacional,
      pagadorTipoConta: mensagem.pagador.tipoConta,

      recebedorNome: mensagem.recebedor.nome,
      recebedorCpfCnpj: mensagem.recebedor.cpfCnpj,
      recebedorIspb: mensagem.recebedor.ispb,
      recebedorAgencia: mensagem.recebedor.agencia,
      recebedorConta: mensagem.recebedor.contaTransacional,
      recebedorTipoConta: mensagem.recebedor.tipoConta,
    }
  });
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

export async function deletarStream(interactionId: string, ispb: string) {
  await pool.query(
    'DELETE FROM pix_streams WHERE interaction_id = $1 AND ispb = $2',
    [interactionId, ispb]
  );
}
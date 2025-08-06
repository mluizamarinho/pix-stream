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
  await prisma.pixStream.create({
    data: {
      interactionId,
      ispb,
      lastReadId: "0"
    }
  });
}

export async function buscarStreamPorId(interactionId: string, ispb: string) {
  return await prisma.pixStream.findFirst({
    where: {
      interactionId,
      ispb
    }
  });
}

export async function atualizarProgressoStream(interactionId: string, ispb: string, lastReadId: string) {
  await prisma.pixStream.updateMany({
    where: {
      interactionId,
      ispb
    },
    data: {
      lastReadId
    }
  });
}

export async function buscarMensagensPix(ispb: string, lastReadId: number, limit: number) {
  return await prisma.mensagemPix.findMany({
    where: {
      recebedorIspb: ispb,
      id: {
        gt: lastReadId.toString()
      }
    },
    orderBy: {
      id: 'asc'
    },
    take: limit
  });
}

export async function deletarStream(interactionId: string, ispb: string) {
  await prisma.pixStream.deleteMany({
    where: {
      interactionId,
      ispb
    }
  });
}

import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../lib/prisma';

export class PixService {
  async iniciarStream(ispb: string, multiple: boolean) {
    // Verifica o número de streams ativos para o ISPB
    const streamsAtivas = await prisma.pixStream.count({
      where: { ispb },
    });

    if (streamsAtivas >= 6) {
      const error: any = new Error('Limite de streams atingido');
      error.statusCode = 429;
      throw error;
    }

    const interactionId = uuidv4();

    // Busca as primeiras mensagens ordenadas por data
    const mensagens = await prisma.mensagemPix.findMany({
      where: {
        recebedorIspb: ispb,
      },
      orderBy: {
        dataHoraPagamento: 'asc',
      },
      take: multiple ? 10 : 1,
    });

    const ultimaDataLida = mensagens.length > 0
      ? mensagens[mensagens.length - 1].dataHoraPagamento
      : null;

    // Cria nova stream no banco
    await prisma.pixStream.create({
      data: {
        interactionId,
        ispb,
        lastReadId: mensagens.length > 0 ? mensagens[mensagens.length - 1].id : '',
        ultimaDataLida,
      },
    });

    return {
      interactionId,
      mensagens,
    };
  }

  async continuarStream(ispb: string, interactionId: string, multiple: boolean) {
    const stream = await prisma.pixStream.findFirst({
      where: {
        interactionId,
        ispb,
      },
    });

    if (!stream) {
      throw new Error('Stream não encontrada');
    }

    // Busca mensagens após a última data lida
    const mensagens = await prisma.mensagemPix.findMany({
      where: {
        recebedorIspb: ispb,
        dataHoraPagamento: {
          gt: stream.ultimaDataLida ?? new Date(0),
        },
      },
      orderBy: {
        dataHoraPagamento: 'asc',
      },
      take: multiple ? 10 : 1,
    });

    // Atualiza posição da stream, se houver mensagens novas
    if (mensagens.length > 0) {
      const ultimaDataLida = mensagens[mensagens.length - 1].dataHoraPagamento;
      const lastReadId = mensagens[mensagens.length - 1].id;

      await prisma.pixStream.updateMany({
        where: {
          interactionId,
          ispb,
        },
        data: {
          lastReadId,
          ultimaDataLida,
        },
      });
    }

    return {
      interactionId,
      mensagens,
    };
  }

  async encerrarStream(ispb: string, interactionId: string) {
    await prisma.pixStream.deleteMany({
      where: {
        interactionId,
        ispb,
      },
    });
  }
}

import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../lib/prisma';
import { MensagemPix } from '../schemas/mensagemPix.schema';

export class PixService {
  async iniciarStream(ispb: string, multiple: boolean) {
    const interactionId = uuidv4();

    // Cria o registro da stream no banco
    await prisma.pixStream.create({
      data: {
        interactionId,
        ispb,
        lastReadId: "0",
      },
    });

    // Busca mensagens Pix a partir do ID 0 (assumindo que id é uma string UUID, ignorar filtro por gt: 0)
    const mensagens = await prisma.mensagemPix.findMany({
      where: {
        recebedorIspb: ispb,
      },
      orderBy: {
        dataHoraPagamento: 'asc',
      },
      take: multiple ? 10 : 1,
    });

    if (mensagens.length > 0) {
      const lastReadId = mensagens[mensagens.length - 1].id;
      await prisma.pixStream.updateMany({
        where: {
          interactionId,
          ispb,
        },
        data: {
          lastReadId,
        },
      });
    }

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

    const mensagens = await prisma.mensagemPix.findMany({
      where: {
        recebedorIspb: ispb,
        id: {
          gt: stream.lastReadId,
        },
      },
      orderBy: {
        dataHoraPagamento: 'asc',
      },
      take: multiple ? 10 : 1,
    });

    if (mensagens.length > 0) {
      const lastReadId = mensagens[mensagens.length - 1].id;
      await prisma.pixStream.updateMany({
        where: {
          interactionId,
          ispb,
        },
        data: {
          lastReadId,
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

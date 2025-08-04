import { v4 as uuidv4 } from 'uuid';
import { criarStream, buscarMensagensPix, buscarStreamPorId, atualizarProgressoStream, deletarStream } from '../models/mensagemPix.model';

export class PixService {

  async iniciarStream(ispb: string, multiple: boolean) {
    const interactionId = uuidv4();
    await criarStream(interactionId, ispb);

    const mensagens = await buscarMensagensPix(ispb, 0, multiple ? 10 : 1);

    if (mensagens.length > 0) {
      const lastId = mensagens[mensagens.length - 1].id;
      await atualizarProgressoStream(interactionId, ispb, lastId);
    }

    return {
      interactionId,
      mensagens,
    };
  }

  async continuarStream(ispb: string, interactionId: string, multiple: boolean) {
    const stream = await buscarStreamPorId(interactionId, ispb);
    if (!stream) {
      throw new Error('Stream não encontrada');
    }

    const mensagens = await buscarMensagensPix(ispb, stream.last_read_id, multiple ? 10 : 1);

    if (mensagens.length > 0) {
      const lastId = mensagens[mensagens.length - 1].id;
      await atualizarProgressoStream(interactionId, ispb, lastId);
    }

    return {
      interactionId,
      mensagens,
    };
  }

  async encerrarStream(ispb: string, interactionId: string) {
    await deletarStream(interactionId, ispb);
  }
}


import { v4 as uuidv4 } from 'uuid';
import { pixMessages } from '../mock-pix';

interface PixMessage {
  id: string;
  ispbRecebedor: string;
  valor: number;
  txId: string;
}

export class PixService {
  private streams = new Map<string, string[]>(); 

  getInitialMessages(ispb: string, multiple: boolean) {
    const mensagens = pixMessages.filter(msg => msg.ispbRecebedor === ispb);

    const selected = multiple ? mensagens.slice(0, 10) : mensagens.slice(0, 1);
    const interactionId = uuidv4();

    this.streams.set(interactionId, selected.map(msg => msg.id));

    return {
      messages: selected,
      pullNext: `/api/pix/${ispb}/stream/${interactionId}`
    };
  }
}

import { Request, Response } from 'express';
import { PixService } from '../services/pix.service';

const pixService = new PixService();

export async function startStream(req: Request, res: Response) {
  try {
    const { ispb } = req.params;
    const accept = req.headers['accept'];
    const multiple = accept === 'multipart/json';

    const { interactionId, mensagens } = await pixService.iniciarStream(ispb, multiple);

    if (mensagens.length === 0) {
      return res.status(204).send();
    }

    res.setHeader('Pull-Next', `/api/pix/${ispb}/stream/${interactionId}`);
    return res.status(200).json(mensagens);
  } catch (error) {
    console.error('Erro ao iniciar stream:', error);
    return res.status(500).json({ error: 'Erro ao iniciar stream' });
  }
}

export async function continueStream(req: Request, res: Response) {
  try {
    const { ispb, interactionId } = req.params;
    const accept = req.headers['accept'];
    const multiple = accept === 'multipart/json';

    const { mensagens } = await pixService.continuarStream(ispb, interactionId, multiple);

    if (mensagens.length === 0) {
      return res.status(204).send();
    }

    res.setHeader('Pull-Next', `/api/pix/${ispb}/stream/${interactionId}`);
    return res.status(200).json(mensagens);
  } catch (error) {
    console.error('Erro ao continuar stream:', error);
    return res.status(500).json({ error: 'Erro ao continuar stream' });
  }
}

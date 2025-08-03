// src/controllers/pix.controller.ts
import { Request, Response } from 'express';
import { PixService } from '../services/pix.service';


const pixService = new PixService();

export const startStream = async (req: Request, res: Response) => {
  const { ispb } = req.params;
  const acceptHeader = req.headers['accept'];

  const multiple = acceptHeader === 'multipart/json';

  const result = await pixService.getInitialMessages(ispb, multiple);

  if (result.messages.length === 0) {
    res.status(204).setHeader('Pull-Next', result.pullNext).send();
  } else {
    res.status(200)
      .setHeader('Pull-Next', result.pullNext)
      .json(multiple ? result.messages : result.messages[0]);
  }
};

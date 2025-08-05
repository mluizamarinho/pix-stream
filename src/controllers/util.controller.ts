// src/controllers/util.controller.ts
import { Request, Response } from 'express';
import { geraEInserePixFakeInfo } from '../services/util.service';

export const requisicaoPix = async (req: Request, res: Response) => {
  const { ispb, number } = req.params;

  const num = parseInt(number);
  if (!ispb || isNaN(num) || num <= 0) {
    return res.status(400).json({ error: 'Parâmetros inválidos.' });
  }

  try {
    await geraEInserePixFakeInfo(ispb, num);
    res.status(201).json({ message: `${num} mensagens inseridas para o ISPB ${ispb}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao inserir mensagens.' });
  }
};

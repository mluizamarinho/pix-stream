import { Request, Response } from 'express';

export const getMensagens = async (req: Request, res: Response) => {
  // Simulação de mensagens (pode vir do banco depois)
  const mensagens = [
    {
      endToEndId: 'ABC123',
      valor: 100.0,
      pagador: { nome: 'João', cpfCnpj: '00011122233', ispb: '12345678' },
      recebedor: { nome: 'Maria', cpfCnpj: '99988877766', ispb: '87654321' },
      campoLivre: '',
      txId: 'xyz123',
      dataHoraPagamento: new Date().toISOString(),
    },
  ];

  return res.status(200).json(mensagens);
};

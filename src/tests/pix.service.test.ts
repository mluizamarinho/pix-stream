import { PixService } from '../services/pix.service';
import { prisma } from '../lib/prisma';

jest.mock('../lib/prisma');

describe('PixService', () => {
  const service = new PixService();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('iniciarStream', () => {
    it('deve criar um stream e retornar mensagens', async () => {
      (prisma.pixStream.create as jest.Mock).mockResolvedValue({});
      (prisma.mensagemPix.findMany as jest.Mock).mockResolvedValue([
        { id: '123', dataHoraPagamento: new Date() },
        { id: '456', dataHoraPagamento: new Date() },
      ]);
      (prisma.pixStream.updateMany as jest.Mock).mockResolvedValue({});

      const result = await service.iniciarStream('12345678', true);

      expect(result.interactionId).toBeDefined();
      expect(result.mensagens).toHaveLength(2);
      expect(prisma.pixStream.create).toHaveBeenCalled();
      expect(prisma.mensagemPix.findMany).toHaveBeenCalledWith({
        where: { recebedorIspb: '12345678' },
        orderBy: { dataHoraPagamento: 'asc' },
        take: 10,
      });
    });
  });

  describe('continuarStream', () => {
  it('deve continuar a stream e atualizar o progresso', async () => {
    const ultimaData = new Date('2024-01-01T00:00:00.000Z');

    (prisma.pixStream.findFirst as jest.Mock).mockResolvedValue({
      interactionId: 'abc',
      ispb: '12345678',
      lastReadId: '123',
      ultimaDataLida: ultimaData, 
    });

    const mensagensFake = [
      { id: '124', dataHoraPagamento: new Date('2024-01-01T01:00:00.000Z') },
      { id: '125', dataHoraPagamento: new Date('2024-01-01T02:00:00.000Z') },
    ];

    (prisma.mensagemPix.findMany as jest.Mock).mockResolvedValue(mensagensFake);
    (prisma.pixStream.updateMany as jest.Mock).mockResolvedValue({});

    const result = await service.continuarStream('12345678', 'abc', true);

    expect(result.mensagens).toHaveLength(2);

    expect(prisma.pixStream.findFirst).toHaveBeenCalled();
    expect(prisma.mensagemPix.findMany).toHaveBeenCalledWith({
      where: {
        recebedorIspb: '12345678',
        dataHoraPagamento: {
          gt: ultimaData,
        },
      },
      orderBy: { dataHoraPagamento: 'asc' },
      take: 10,
    });
    expect(prisma.pixStream.updateMany).toHaveBeenCalledWith({
      where: {
        interactionId: 'abc',
        ispb: '12345678',
      },
      data: {
        lastReadId: '125',
        ultimaDataLida: mensagensFake[1].dataHoraPagamento,
      },
    });
  });

  it('deve lançar erro se a stream não for encontrada', async () => {
    (prisma.pixStream.findFirst as jest.Mock).mockResolvedValue(null);

    await expect(
      service.continuarStream('12345678', 'inexistente', false)
    ).rejects.toThrow('Stream não encontrada');
  });
});


  describe('encerrarStream', () => {
    it('deve deletar a stream com sucesso', async () => {
      (prisma.pixStream.deleteMany as jest.Mock).mockResolvedValue({});

      await service.encerrarStream('12345678', 'abc');

      expect(prisma.pixStream.deleteMany).toHaveBeenCalledWith({
        where: {
          interactionId: 'abc',
          ispb: '12345678',
        },
      });
    });
  });
});

export const prisma = {
  pixStream: {
    create: jest.fn(),
    updateMany: jest.fn(),
    findFirst: jest.fn(),
    deleteMany: jest.fn(),
  },
  mensagemPix: {
    findMany: jest.fn(),
  },
};

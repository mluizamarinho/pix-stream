import { faker } from '@faker-js/faker';

import { MensagemPix } from '../schemas/mensagemPix.schema';
import { insereMensagemPix } from '../models/mensagemPix.model';

export async function geraEInserePixFakeInfo(ispb: string, number: number) {
  for (let i = 0; i < number; i++) {
    const mensagem: MensagemPix = {
      endToEndId: faker.string.alphanumeric(32),
      valor: parseFloat(faker.finance.amount({ min: 10, max: 1000, dec: 2 })),
      txId: faker.string.alphanumeric(20),
      dataHoraPagamento: faker.date.recent().toISOString(),
      pagador: {
        nome: faker.person.fullName(),
        cpfCnpj: faker.string.numeric(11),
        agencia: faker.string.numeric(4),
        contaTransacional: faker.string.numeric(7),
        tipoConta: faker.helpers.arrayElement(['CACC', 'SVGS']),
      },
      recebedor: {
        nome: faker.person.fullName(),
        cpfCnpj: faker.string.numeric(11),
        ispb,
        agencia: faker.string.numeric(4),
        contaTransacional: faker.string.numeric(7),
        tipoConta: faker.helpers.arrayElement(['CACC', 'SVGS']),
      },
      campoLivre: '',
    };

    await insereMensagemPix(mensagem);
  }
}

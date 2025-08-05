-- CreateTable
CREATE TABLE "public"."MensagemPix" (
    "id" TEXT NOT NULL,
    "endToEndId" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "pagadorNome" TEXT NOT NULL,
    "pagadorCpfCnpj" TEXT NOT NULL,
    "pagadorIspb" TEXT NOT NULL,
    "pagadorAgencia" TEXT NOT NULL,
    "pagadorConta" TEXT NOT NULL,
    "pagadorTipoConta" TEXT NOT NULL,
    "recebedorNome" TEXT NOT NULL,
    "recebedorCpfCnpj" TEXT NOT NULL,
    "recebedorIspb" TEXT NOT NULL,
    "recebedorAgencia" TEXT NOT NULL,
    "recebedorConta" TEXT NOT NULL,
    "recebedorTipoConta" TEXT NOT NULL,
    "campoLivre" TEXT,
    "txId" TEXT NOT NULL,
    "dataHoraPagamento" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MensagemPix_pkey" PRIMARY KEY ("id")
);

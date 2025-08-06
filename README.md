# pix-stream

# 📡 Pix Stream

Pix Stream é uma aplicação back-end responsável por gerenciar e distribuir mensagens Pix simuladas. A aplicação foi inspirada na arquitetura de mensageria do SPI (Sistema de Pagamentos Instantâneos) e permite:

- Inserção de mensagens Pix simuladas associadas a um ISPB
- Gerenciamento de múltiplos coletores simultâneos
- Leitura concorrente de mensagens com exclusividade por stream
- Mecanismo de long polling com controle via cabeçalho `Pull-Next`

---

## 🚀 Tecnologias utilizadas

- Node.js
- TypeScript
- Express
- PostgreSQL
- Prisma ORM
- Jest (testes)
- Docker & Docker Compose
- Beekeeper Studio (Interface gráfica para inspeção e gerenciamento do banco de dados)
- Insomnia (Testar e documentar endpoints da API)
---

## ⚙️ Como rodar o projeto localmente
###
### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/pix-stream.git
cd pix-stream
```

### 2. Crie o arquivo .env a partir do .env.example

### 3. Instale as dependências do projeto

```bash
npm install
```

### 4. Rode o banco de dados com Docker Compose

```bash
docker-compose up -d
```

### 5. Gere o Prisma Client

```bash
npm run prisma:generate
```

### 6. Aplique as migrations (estrutura do banco)

```bash
npm run prisma:generate
```

### 7. Rode a aplicação
```bash
npm run dev
```

## 🧪 Rodando os testes

### 1. Testes unitários com Jest
```bash
npm run test
```

### 2. Testes em modo observação
```bash
npm run test:watch
```

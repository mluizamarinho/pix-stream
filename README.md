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
- Docker e Docker Compose

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

### 5. Rodando o projeto

```bash
npm run dev
```

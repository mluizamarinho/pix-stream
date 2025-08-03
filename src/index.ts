import express from 'express';
import mensagemRouter from './routes/mensagem.route';
import pixRoutes from './routes/pix.route';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

console.log("Iniciando app...");

app.use('/api/pix', pixRoutes);
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

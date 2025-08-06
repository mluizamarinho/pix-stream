import express from 'express';
import pixRoutes from './routes/pix.route';
import utilRoutes from './routes/util.route';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

console.log("Subindo aplicação Pix Stream...");

app.use('/api/pix', pixRoutes);
app.use('/api/util', utilRoutes)

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

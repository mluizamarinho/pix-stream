import { Router } from 'express';
import { getMensagens } from '../controllers/mensagem.controller';

const router = Router();

router.get('/', getMensagens);

export default router;

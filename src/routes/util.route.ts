import { Router } from 'express';
import { requisicaoPix } from '../controllers/util.controller';


const router = Router();

router.post('/msgs/:ispb/:number', requisicaoPix);

export default router;

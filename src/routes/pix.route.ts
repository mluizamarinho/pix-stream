import { Router } from 'express';
import { startStream, continueStream } from '../controllers/pix.controller';


const router = Router();

router.get('/:ispb/stream/start', startStream);
router.get('/:ispb/stream/:interatioonId', continueStream);

export default router;

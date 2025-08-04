import { Router } from 'express';
import { startStream, continueStream, deleteStream } from '../controllers/pix.controller';


const router = Router();

router.get('/:ispb/stream/start', startStream);
router.get('/:ispb/stream/:interationId', continueStream);
router.delete('/:ispb/stream/:interactionId', deleteStream);

export default router;

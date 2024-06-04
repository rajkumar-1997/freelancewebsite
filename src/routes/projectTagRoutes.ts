import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware';
import { fetchProjectsByTag,addTag } from '../controllers/projectTagController';
const router = Router();
router.get('/:tagName', authenticate, fetchProjectsByTag);
router.post('/addTag', authenticate, addTag);
export default router;
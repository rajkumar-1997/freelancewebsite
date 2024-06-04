import { Router } from 'express';
import {
  addProject,
  updateProject,
  deleteProject,
  listProjects,
} from '../controllers/projectController';
import { authenticate,isClient } from '../middlewares/authMiddleware';

const router = Router();

router.post('/addProject', authenticate, isClient, addProject);
router.put('/updateProject/:id', authenticate, isClient, updateProject);
router.delete('/deleteProject/:id', authenticate, isClient, deleteProject);
router.get('/listAllProjects', authenticate, isClient,listProjects);

export default router;

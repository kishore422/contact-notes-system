import { Router } from 'express';
import authRoutes from './authRoutes';
import contactRoutes from './contactRoutes';
import noteRoutes from './noteRoutes';

const router = Router();

router.use('/auth', authRoutes);

router.use('/contacts', contactRoutes);
router.use('/', noteRoutes);

export default router;
import { Router } from 'express';

import { feedbacksRoutes } from './feedbacks.routes';

const router = Router();

router.use(feedbacksRoutes);

export default router;

import { Router } from 'express';

import { FeedbacksController } from '@modules/feedbacks/controller/FeedbacksController';

const feedbacksRoutes = Router();

const feedbacksController = new FeedbacksController();

feedbacksRoutes.post('/feedbacks', feedbacksController.submit);

export { feedbacksRoutes };

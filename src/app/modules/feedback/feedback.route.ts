import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { FeedbackValidation } from './feedback.validation';
import { FeedbackController } from './feedback.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(FeedbackValidation.createUserZodSchema),
  FeedbackController.createUser,
);

export const FeedbackRouters = router;

import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { TutorValidation } from './tutor.validation';
import { TutorController } from './tutor.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(TutorValidation.createUserZodSchema),
  TutorController.createUser,
);

export const TutorRouters = router;

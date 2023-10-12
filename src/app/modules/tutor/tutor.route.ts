import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { TutorValidation } from './tutor.validation';
import { TutorController } from './tutor.controller';
import { UserValidation } from '../user/user.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(TutorValidation.createTutorZodSchema),
  TutorController.createTutor,
);

router.post(
  '/login',
  validateRequest(UserValidation.loginZodSchema),
  TutorController.loginTutor,
);
export const TutorRouters = router;

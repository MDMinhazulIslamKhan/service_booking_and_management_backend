import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { TutorValidation } from './tutor.validation';
import { TutorController } from './tutor.controller';
import { UserValidation } from '../user/user.validation';
import auth from '../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

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

router.get('/profile', auth(ENUM_USER_ROLE.TUTOR), TutorController.ownProfile);

router.get('/user/:id', TutorController.getSingleTutorByUser);

router.get(
  '/admin/:id',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.ADMIN_USER,
    ENUM_USER_ROLE.SUPER_ADMIN,
  ),
  TutorController.getSingleTutor,
);

router.patch(
  '/accept-request/:userId',
  auth(ENUM_USER_ROLE.TUTOR),
  TutorController.acceptBookingRequest,
);

router.patch(
  '/profile/:id',
  validateRequest(TutorValidation.updateTutorZodSchema),
  auth(
    ENUM_USER_ROLE.TUTOR,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN_TUTOR,
  ),
  TutorController.updateProfile,
);

export const TutorRouters = router;

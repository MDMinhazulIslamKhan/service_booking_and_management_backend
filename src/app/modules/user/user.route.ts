import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';
import auth from '../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser,
);

router.post(
  '/login',
  validateRequest(UserValidation.loginZodSchema),
  UserController.loginUser,
);

router.post(
  '/refresh-token',
  validateRequest(UserValidation.refreshTokenZodSchema),
  UserController.refreshToken,
);

router.get(
  '/profile',
  validateRequest(UserValidation.loginZodSchema),
  auth(
    ENUM_USER_ROLE.USER,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.ADMIN_TUTOR,
    ENUM_USER_ROLE.ADMIN_USER,
    ENUM_USER_ROLE.SUPER_ADMIN,
  ),
  UserController.ownProfile,
);

// router.get(
//   '/getAllUsers',
//   auth(
//     ENUM_USER_ROLE.ADMIN,
//     ENUM_USER_ROLE.ADMIN_USER,
//     ENUM_USER_ROLE.SUPER_ADMIN,
//   ),
//   UserController.getAllUsers,
// );

// router.get(
//   '/singleUser/:id',
//   auth(
//     ENUM_USER_ROLE.USER,
//     ENUM_USER_ROLE.ADMIN,
//     ENUM_USER_ROLE.ADMIN_TUTOR,
//     ENUM_USER_ROLE.ADMIN_USER,
//     ENUM_USER_ROLE.SUPER_ADMIN,
//     ENUM_USER_ROLE.TUTOR,
//   ),
//   UserController.singleUser,
// );

// router.patch(
//   '/profile/:id',
//   validateRequest(UserValidation.updateUserZodSchema),
//   auth(
//     ENUM_USER_ROLE.USER,
//     ENUM_USER_ROLE.ADMIN,
//     ENUM_USER_ROLE.ADMIN_TUTOR,
//     ENUM_USER_ROLE.ADMIN_USER,
//     ENUM_USER_ROLE.SUPER_ADMIN,
//   ),
//   UserController.updateProfile,
// );

export const UserRouters = router;

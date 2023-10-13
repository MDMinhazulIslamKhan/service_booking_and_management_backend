import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { BookingValidation } from './booking.validation';
import { BookingController } from './booking.controller';
import auth from '../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.USER),
  validateRequest(BookingValidation.createBookingZodSchema),
  BookingController.bookTutor,
);

router.delete(
  '/',
  auth(ENUM_USER_ROLE.USER),
  validateRequest(BookingValidation.createBookingZodSchema),
  BookingController.bookTutor,
);

router.get(
  '/all-booking',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.ADMIN_TUTOR,
  ),
  BookingController.getAllBookings,
);

router.get(
  '/get-my-bookings',
  auth(ENUM_USER_ROLE.USER),
  BookingController.getOwnBookings,
);

router.patch(
  '/process/:bookingId',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.ADMIN_TUTOR,
  ),
  BookingController.processBooking,
);

// router.patch(
//   '/accept/:bookingId',
//   auth(
//     ENUM_USER_ROLE.SUPER_ADMIN,
//     ENUM_USER_ROLE.ADMIN,
//     ENUM_USER_ROLE.ADMIN_USER,
//   ),
//   BookingController.acceptBookings,
// );

router.delete(
  '/cancel/:bookingId',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.ADMIN_TUTOR,
    ENUM_USER_ROLE.USER,
  ),
  BookingController.cancelBooking,
);

export const BookingRouters = router;

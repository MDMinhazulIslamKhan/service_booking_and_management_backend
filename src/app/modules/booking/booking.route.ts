import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { BookingValidation } from './booking.validation';
import { BookingController } from './booking.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(BookingValidation.createBookingZodSchema),
  BookingController.createUser,
);

export const BookingRouters = router;

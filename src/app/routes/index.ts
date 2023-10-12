import express from 'express';
import { UserRouters } from '../modules/user/user.route';
import { TutorRouters } from '../modules/tutor/tutor.route';
import { BookingRouters } from '../modules/booking/booking.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRouters,
  },
  {
    path: '/tutor',
    route: TutorRouters,
  },
  {
    path: '/booking',
    route: BookingRouters,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export const ApplicationRouters = router;

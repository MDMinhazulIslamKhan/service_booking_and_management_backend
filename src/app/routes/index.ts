import express from 'express';
import { UserRouters } from '../modules/user/user.route';
import { TutorRouters } from '../modules/tutor/tutor.route';

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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export const ApplicationRouters = router;

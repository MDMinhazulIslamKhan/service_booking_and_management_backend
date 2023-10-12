import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from './tutor.interface';
import Tutor from './tutor.model';

const createUser = async (user: IUser) => {};

export const TutorService = {
  createUser,
};

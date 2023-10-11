import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import User from './user.model';

const createUser = async (user: IUser) => {};

export const UserService = {
  createUser,
};

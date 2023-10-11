import { Model } from 'mongoose';
import { Role } from './user.constant';

export type IUser = {
  phoneNumber: string;
  email: string;
  role: Role;
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
};
export type UserModel = Model<IUser, Record<string, unknown>>;

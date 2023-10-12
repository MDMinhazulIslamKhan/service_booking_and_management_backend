import { Model, Types } from 'mongoose';
import { Role } from './user.constant';
import { Status } from '../../../constant';

export type IUser = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: Role;
  notification?: Array<{
    tutorId: Types.ObjectId;
    userId: Types.ObjectId;
    status: Status;
    teachingStartDate: Date;
    message: {
      dayPerWeek: number;
      teachingTime: string;
      maxSalary: number;
      location: string;
      description: string;
    };
  }>;
  unseenNotification: number;
  history?: Array<{ tutorId: Types.ObjectId; teachingStartDate: Date }>;
};

export type UserModel = {
  isUserExist(
    email: string,
  ): Promise<Pick<IUser, 'id' | 'email' | 'password' | 'role'>>;
  isPasswordMatch(
    givenPassword: string,
    savePassword: string,
  ): Promise<boolean>;
} & Model<IUser>;

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type ILoginRequest = {
  email: string;
  password: string;
};

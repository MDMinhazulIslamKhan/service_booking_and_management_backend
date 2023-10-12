import { Model, Types } from 'mongoose';
import { Department, Role } from './user.constant';
import { Status } from '../../../constant';

export type IUser = {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: Role;
  department?: Department;
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
    isSeen: boolean;
  }>;
  history?: Array<{ tutorId: Types.ObjectId; teachingStartDate: Date }>;
};

export type UserModel = {
  isUserExist(
    email: string,
  ): Promise<Pick<IUser, 'email' | 'password' | 'role'>>;
  isPasswordMatch(
    givenPassword: string,
    savePassword: string,
  ): Promise<boolean>;
} & Model<IUser>;

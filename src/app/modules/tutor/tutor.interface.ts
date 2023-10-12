import { Model, Types } from 'mongoose';
import {
  CurrentStatus,
  Gender,
  Group,
  Medium,
  PreferredClass,
  Status,
} from './tutor.constant';

export type ITutor = {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  gender: Gender;
  qualification: string;
  institution: string;
  group: Group;
  subject: string;
  medium: Medium;
  presentAddress: string;
  expertIn: string[];
  currentStatus: CurrentStatus;
  expectedMinSalary: number;
  dayPerWeek: number;
  preferredClass: PreferredClass[];
  preferredArea: string;
  preferredSubject: string;
  preferredMedium: Medium;
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
  history?: Array<{
    dayPerWeek: number;
    maxSalary: number;
    location: string;
    description: string;
    teachingStartDate: Date;
  }>;
  reviews?: Array<{ name: string; review: string; rating: number }>;
  totalTuitionTaken: number;
  currentTuition: number;
  maximumTuition: number;
};

export type TutorModel = {
  isUserExist(email: string): Promise<Pick<ITutor, 'email' | 'password'>>;
  isPasswordMatch(
    givenPassword: string,
    savePassword: string,
  ): Promise<boolean>;
} & Model<ITutor>;

import { z } from 'zod';
import { adminDepartment, userRoles } from './user.constant';
import { statusInfo } from '../../../constant';

const createUserZodSchema = z.object({
  body: z.object({
    fullName: z.string({
      required_error: 'fullName is required',
    }),
    email: z.string({
      required_error: 'email is required',
    }),
    phoneNumber: z.string({
      required_error: 'phoneNumber is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
    role: z.enum([...userRoles] as [string, ...string[]], {
      required_error: 'role is required',
    }),
    department: z
      .enum([...adminDepartment] as [string, ...string[]])
      .optional(),
  }),
});
const notificationZodSchema = z.object({
  body: z.object({
    tutorId: z.string({
      required_error: 'tutorId is required',
    }),
    userId: z.string({
      required_error: 'userId is required',
    }),
    status: z.enum([...statusInfo] as [string, ...string[]], {
      required_error: 'status is required',
    }),
    teachingStartDate: z.string({
      required_error: 'userId is required',
    }),
    message: z.object({
      dayPerWeek: z.number({
        required_error: 'dayPerWeek is required',
      }),
      teachingTime: z.string({
        required_error: 'teachingTime is required',
      }),
      maxSalary: z.number({
        required_error: 'maxSalary is required',
      }),
      location: z.string({
        required_error: 'location is required',
      }),
      description: z.string({
        required_error: 'description is required',
      }),
    }),
  }),
});

export const UserValidation = {
  createUserZodSchema,
};

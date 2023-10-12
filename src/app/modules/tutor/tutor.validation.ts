import { z } from 'zod';
import { userRoles } from './tutor.constant';

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'password is required',
    }),
    role: z.enum([...userRoles] as [string, ...string[]], {
      required_error: 'role is required',
    }),
    name: z.object({
      firstName: z.string({
        required_error: 'firstName is required',
      }),
      lastName: z.string({
        required_error: 'lastName is required',
      }),
    }),
    phoneNumber: z.string({
      required_error: 'phoneNumber is required',
    }),
    email: z.string({
      required_error: 'email is required',
    }),
  }),
});

export const TutorValidation = {
  createUserZodSchema,
};

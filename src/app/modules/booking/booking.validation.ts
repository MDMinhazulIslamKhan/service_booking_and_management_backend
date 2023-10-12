import { z } from 'zod';
import { statusInfo } from '../../../constant';

const createBookingZodSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'userId is required',
    }),
    tutorId: z.string({
      required_error: 'tutorId is required',
    }),
    status: z.enum([...statusInfo] as [string, ...string[]], {
      required_error: 'status is required',
    }),
    teachingStartDate: z.string({
      required_error: 'teachingStartDate is required',
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

export const BookingValidation = {
  createBookingZodSchema,
};

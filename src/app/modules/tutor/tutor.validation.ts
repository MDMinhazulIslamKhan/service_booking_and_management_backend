import { z } from 'zod';
import {
  tutorGender,
  tutorGroup,
  tutorMedium,
  tutorPreferredClass,
} from './tutor.constant';

const createTutorZodSchema = z.object({
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
    gender: z.enum([...tutorGender] as [string, ...string[]], {
      required_error: 'gender is required',
    }),
    qualification: z.string({
      required_error: 'password is required',
    }),
    institution: z.string({
      required_error: 'institution is required',
    }),
    group: z.enum([...tutorGroup] as [string, ...string[]], {
      required_error: 'group is required',
    }),
    subject: z.string({
      required_error: 'password is required',
    }),
    medium: z.enum([...tutorMedium] as [string, ...string[]], {
      required_error: 'medium is required',
    }),
    expertIn: z.array(z.string()),
    expectedMinSalary: z.number({
      required_error: 'expectedMinSalary is required',
    }),
    dayPerWeek: z.number({
      required_error: 'dayPerWeek is required',
    }),
    preferredClass: z.array(
      z.enum([...tutorPreferredClass] as [string, ...string[]], {
        required_error: 'preferredClass is required',
      }),
    ),
    preferredArea: z.string({
      required_error: 'preferredArea is required',
    }),
    preferredSubject: z.string({
      required_error: 'preferredSubject is required',
    }),
    preferredMedium: z.enum([...tutorMedium] as [string, ...string[]], {
      required_error: 'medium is required',
    }),
  }),
  currentTuition: z.number({
    required_error: 'currentTuition is required',
  }),
  maximumTuitionCapacity: z.number({
    required_error: 'maximumTuitionCapacity is required',
  }),
});

export const TutorValidation = {
  createTutorZodSchema,
};

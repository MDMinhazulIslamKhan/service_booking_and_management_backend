import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'userId is required',
    }),
    feedback: z.string({
      required_error: 'feedback is required',
    }),
  }),
});

export const FeedbackValidation = {
  createUserZodSchema,
};

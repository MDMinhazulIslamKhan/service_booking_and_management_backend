import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z
    .object({
      fullName: z.string({
        required_error: 'fullName is required',
      }),
      email: z
        .string({
          required_error: 'email is required',
        })
        .email({ message: 'Invalid email format' }),
      phoneNumber: z.string({
        required_error: 'phoneNumber is required',
      }),
      password: z.string({
        required_error: 'password is required',
      }),
    })
    .strict(),
});

const updateUserZodSchema = z.object({
  body: z
    .object({
      fullName: z.string().optional(),
      phoneNumber: z.string().optional(),
    })
    .strict(),
});

const changePasswordZodSchema = z.object({
  body: z
    .object({
      oldPassword: z.string({
        required_error: 'Old password is required',
      }),
      newPassword: z.string({
        required_error: 'New password is required',
      }),
    })
    .strict(),
});

const loginZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
});

// const notificationZodSchema = z.object({
//   body: z.object({
//     tutorId: z.string({
//       required_error: 'tutorId is required',
//     }),
//     userId: z.string({
//       required_error: 'userId is required',
//     }),
//     status: z.enum([...statusInfo] as [string, ...string[]], {
//       required_error: 'status is required',
//     }),
//     teachingStartDate: z.string({
//       required_error: 'userId is required',
//     }),
//     message: z.object({
//       dayPerWeek: z.number({
//         required_error: 'dayPerWeek is required',
//       }),
//       teachingTime: z.string({
//         required_error: 'teachingTime is required',
//       }),
//       maxSalary: z.number({
//         required_error: 'maxSalary is required',
//       }),
//       location: z.string({
//         required_error: 'location is required',
//       }),
//       description: z.string({
//         required_error: 'description is required',
//       }),
//     }),
//   }),
// });

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
  loginZodSchema,
  refreshTokenZodSchema,
  changePasswordZodSchema,
};

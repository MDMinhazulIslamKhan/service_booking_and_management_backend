import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import { adminDepartment, statusInfo, userRoles } from './user.constant';
import config from '../../../config';

const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      required: true,
      enum: userRoles,
    },
    department: {
      type: String,
      enum: adminDepartment,
    },
    notification: [
      {
        tutorId: {
          type: Schema.Types.ObjectId,
          ref: 'Tutor',
          required: true,
        },
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        status: {
          type: String,
          required: true,
          enum: statusInfo,
        },
        teachingStartDate: {
          type: Date,
          required: true,
        },
        message: {
          dayPerWeek: {
            type: Number,
            required: true,
          },
          teachingTime: {
            type: String,
            required: true,
          },
          maxSalary: {
            type: Number,
            required: true,
          },
          location: {
            type: String,
            required: true,
          },
          description: {
            type: String,
            required: true,
          },
        },
      },
    ],
    history: [
      {
        tutorId: {
          type: Schema.Types.ObjectId,
          ref: 'Tutor',
          required: true,
        },
        teachingStartDate: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

userSchema.statics.isUserExist = async function (
  email: string,
): Promise<Pick<IUser, 'email' | 'password' | 'role'> | null> {
  return await User.findOne(
    { email },
    { phoneNumber: 1, password: 1, role: 1 },
  );
};

userSchema.statics.isPasswordMatch = async function (
  givenPassword: string,
  savePassword: string,
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savePassword);
};

userSchema.pre('save', async function (next) {
  // hashing password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.jwt.bcrypt_salt_rounds),
  );
  next();
});

const User = model<IUser, UserModel>('User', userSchema);

export default User;

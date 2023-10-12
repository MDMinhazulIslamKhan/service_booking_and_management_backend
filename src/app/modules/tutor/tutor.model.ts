import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { ITutor, TutorModel } from './tutor.interface';
import {
  tutorCurrentStatus,
  tutorGender,
  tutorGroup,
  tutorMedium,
  tutorPreferredClass,
} from './tutor.constant';
import { statusInfo } from '../../../constant';

const tutorSchema = new Schema<ITutor>(
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
    gender: {
      type: String,
      enum: tutorGender,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    institution: {
      type: String,
      required: true,
    },
    group: {
      type: String,
      enum: tutorGroup,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    medium: {
      type: String,
      enum: tutorMedium,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    expertIn: {
      type: [String],
      required: true,
    },
    currentStatus: {
      type: String,
      enum: tutorCurrentStatus,
      required: true,
    },
    expectedMinSalary: {
      type: Number,
      required: true,
    },
    dayPerWeek: {
      type: Number,
      required: true,
    },
    preferredClass: {
      type: [String],
      enum: tutorPreferredClass,
      required: true,
    },
    preferredArea: {
      type: String,
      required: true,
    },
    preferredSubject: {
      type: String,
      required: true,
    },
    preferredMedium: {
      type: String,
      enum: tutorMedium,
      required: true,
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
        isSeen: {
          type: Boolean,
          required: true,
          default: false,
        },
      },
    ],
    history: [
      {
        dayPerWeek: {
          type: Number,
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
        teachingStartDate: {
          type: Date,
          required: true,
        },
      },
    ],
    reviews: [
      {
        name: {
          type: String,
          required: true,
        },
        review: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
      },
    ],
    totalTuitionTaken: {
      type: Number,
      required: true,
      default: 0,
    },
    currentTuition: {
      type: Number,
      required: true,
      default: 0,
    },
    maximumTuitionCapacity: {
      type: Number,
      required: true,
      default: 5,
    },
  },
  {
    timestamps: true,
  },
);

tutorSchema.statics.isUserExist = async function (
  email: string,
): Promise<Pick<ITutor, 'email' | 'password'> | null> {
  return await Tutor.findOne({ email }, { phoneNumber: 1, password: 1 });
};

tutorSchema.statics.isPasswordMatch = async function (
  givenPassword: string,
  savePassword: string,
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savePassword);
};

tutorSchema.pre('save', async function (next) {
  // hashing password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.jwt.bcrypt_salt_rounds),
  );
  next();
});

const Tutor = model<ITutor, TutorModel>('Tutor', tutorSchema);

export default Tutor;

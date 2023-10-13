import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ILoginRequest, ILoginUserResponse } from '../user/user.interface';
import { ITutor } from './tutor.interface';
import Tutor from './tutor.model';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import User from '../user/user.model';
import { UserInfoFromToken } from '../../../interfaces/common';
import Booking from '../booking/booking.model';
import mongoose from 'mongoose';
import { StatusOption } from '../booking/booking.interface';

const createTutor = async (tutor: ITutor): Promise<ITutor | null> => {
  const checkNumber = await Tutor.findOne({ phoneNumber: tutor.phoneNumber });
  const checkEmail = await Tutor.findOne({ email: tutor.email });
  const checkUserEmail = await User.findOne({ email: tutor.email });

  if (checkEmail || checkUserEmail) {
    throw new ApiError(httpStatus.CONFLICT, 'Already used this email!!!');
  }
  if (checkNumber) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Already used this phone number!!!',
    );
  }
  const createdTutor = await Tutor.create(tutor);
  if (!createdTutor) {
    throw new ApiError(400, 'Failed to create tutor!');
  }
  const result = await Tutor.findById(createdTutor._id);
  return result;
};
const loginTutor = async (
  payload: ILoginRequest,
): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const isTutorExist = await Tutor.isUserExist(email);

  if (!isTutorExist) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'There is no tutor with this email.',
    );
  }

  if (!(await Tutor.isPasswordMatch(password, isTutorExist.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect.');
  }

  const { role, id } = isTutorExist;
  const accessToken = jwtHelpers.createToken(
    { id, email, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  const refreshToken = jwtHelpers.createToken(
    { id, email, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const acceptBookingRequest = async (
  tutor: UserInfoFromToken,
  userId: string,
): Promise<string> => {
  const isBooking = await Booking.findOne({
    $and: [{ userId: userId }, { tutorId: tutor.id }],
  });
  if (!isBooking) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Booking doesn't exist.");
  }

  if (isBooking.status !== 'processing') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Booking is in processing.');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    await Booking.findOneAndUpdate(
      { _id: isBooking.id },
      { status: StatusOption.Accepted },
      {
        session,
      },
    );

    await Tutor.findOneAndUpdate(
      { _id: tutor.id },
      {
        $inc: { unseenNotification: -1 },
      },
      {
        session,
      },
    );

    await User.findOneAndUpdate(
      { _id: userId },
      {
        $inc: { unseenNotification: 1 },
      },
      {
        session,
      },
    );

    await Tutor.findOneAndUpdate(
      {
        $and: [{ _id: tutor.id }, { 'notification.userId': userId }],
      },
      {
        $set: {
          'notification.$.status': StatusOption.Accepted,
        },
      },
      {
        session,
      },
    );

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  return 'Booking accepted successfully.';
};

const ownProfile = async (
  userInfo: UserInfoFromToken,
): Promise<ITutor | null> => {
  const result = await Tutor.findById(userInfo.id);
  if (!result) {
    throw new ApiError(httpStatus.CONFLICT, 'Your profile is not exist!!!');
  }
  return result;
};

const getSingleTutor = async (id: string): Promise<ITutor | null> => {
  const result = await Tutor.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.CONFLICT, 'Tutor is not exist!!!');
  }
  return result;
};

const getSingleTutorByUser = async (id: string): Promise<ITutor | null> => {
  const result = await Tutor.findById(id).select({
    email: false,
    phoneNumber: false,
    role: false,
    notification: false,
    unseenNotification: false,
    history: false,
  });
  if (!result) {
    throw new ApiError(httpStatus.CONFLICT, 'Tutor is not exist!!!');
  }
  return result;
};

const updateProfile = async (
  id: string,
  payload: Partial<ITutor>,
  userInfo: UserInfoFromToken,
): Promise<ITutor | null> => {
  if (
    userInfo.role !== 'admin' &&
    userInfo.role !== 'admin_tutor' &&
    userInfo.role !== 'super_admin' &&
    id !== userInfo.id.toString()
  ) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'You can not update this profile!!!',
    );
  }
  if (payload.phoneNumber) {
    const checkNumber = await Tutor.findOne({
      phoneNumber: payload.phoneNumber,
    });

    if (checkNumber) {
      throw new ApiError(
        httpStatus.CONFLICT,
        'Already used this phone number!!!',
      );
    }
  }
  const result = await Tutor.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const TutorService = {
  createTutor,
  loginTutor,
  getSingleTutor,
  getSingleTutorByUser,
  acceptBookingRequest,
  ownProfile,
  updateProfile,
};

import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ILoginRequest, ILoginUserResponse, IUser } from './user.interface';
import User from './user.model';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import Tutor from '../tutor/tutor.model';
import { UserInfoFromToken } from '../../../interfaces/common';

const createUser = async (user: IUser): Promise<IUser | null> => {
  const checkNumber = await User.findOne({ phoneNumber: user.phoneNumber });
  const checkEmail = await User.findOne({ email: user.email });

  if (checkEmail) {
    throw new ApiError(httpStatus.CONFLICT, 'Already used this email!!!');
  }
  if (checkNumber) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Already used this phone number!!!',
    );
  }
  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user!');
  }
  const result = await User.findById(createdUser._id);
  return result;
};

const loginUser = async (
  payload: ILoginRequest,
): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const isUserExist = await User.isUserExist(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist.");
  }

  if (!(await User.isPasswordMatch(password, isUserExist.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect.');
  }

  const { role, id } = isUserExist;

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

const refreshToken = async (
  refreshToken: string,
): Promise<{ accessToken: string }> => {
  let verifiedToken;

  try {
    verifiedToken = jwtHelpers.verifyToken(
      refreshToken,
      config.jwt.refresh_secret as Secret,
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token!!!');
  }
  const isUserExist = await User.isUserExist(verifiedToken.email);
  const isTutorExist = await Tutor.isUserExist(verifiedToken.email);

  if (!isUserExist && !isTutorExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist!!!");
  }
  const newAccessToken = jwtHelpers.createToken(
    verifiedToken.role === 'tutor'
      ? {
          id: isTutorExist.id,
          email: isTutorExist.email,
          role: isTutorExist.role,
        }
      : {
          id: isUserExist.id,
          email: isUserExist.email,
          role: isUserExist.role,
        },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  return {
    accessToken: newAccessToken,
  };
};

const ownProfile = async (
  userInfo: UserInfoFromToken,
): Promise<IUser | null> => {
  const result = await User.findById(userInfo.id);
  if (!result) {
    throw new ApiError(httpStatus.CONFLICT, 'Your profile is not exist!!!');
  }
  return result;
};

export const UserService = {
  createUser,
  loginUser,
  refreshToken,
  ownProfile,
};

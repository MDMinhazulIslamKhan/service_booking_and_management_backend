import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ILoginRequest, ILoginUserResponse } from '../user/user.interface';
import { ITutor } from './tutor.interface';
import Tutor from './tutor.model';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import User from '../user/user.model';

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

export const TutorService = {
  createTutor,
  loginTutor,
};

import { Request, Response, RequestHandler } from 'express';
import { TutorService } from './tutor.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { ILoginUserResponse } from '../user/user.interface';
import config from '../../../config';
import { UserInfoFromToken } from '../../../interfaces/common';

const createTutor: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await TutorService.createTutor(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'Tutor create Successfully',
    });
  },
);

const loginTutor = catchAsync(async (req: Request, res: Response) => {
  const resultWithRefreshToken = await TutorService.loginTutor(req.body);
  const { refreshToken, ...result } = resultWithRefreshToken;

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tutor logged in successfully!',
    data: result,
  });
});

const acceptBookingRequest = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const tutor = req.user;
  const result = await TutorService.acceptBookingRequest(
    tutor as UserInfoFromToken,
    userId,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: result,
  });
});

const ownProfile = catchAsync(async (req: Request, res: Response) => {
  const userInfo = req?.user;

  const result = await TutorService.ownProfile(userInfo as UserInfoFromToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved Successfully',
    data: result,
  });
});

const getSingleTutor = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await TutorService.getSingleTutor(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved Successfully.',
    data: result,
  });
});
const getSingleTutorByUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await TutorService.getSingleTutorByUser(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved Successfully.',
    data: result,
  });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const tutor = req.body;
  const userInfo = req.user;

  const result = await TutorService.updateProfile(
    id,
    tutor,
    userInfo as UserInfoFromToken,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tutor updated successfully',
    data: result,
  });
});

export const TutorController = {
  createTutor,
  loginTutor,
  acceptBookingRequest,
  getSingleTutor,
  ownProfile,
  getSingleTutorByUser,
  updateProfile,
};

import { Request, Response, RequestHandler } from 'express';
import { TutorService } from './tutor.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { ILoginUserResponse } from '../user/user.interface';
import config from '../../../config';

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

export const TutorController = {
  createTutor,
  loginTutor,
};

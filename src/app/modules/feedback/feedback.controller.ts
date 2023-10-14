import { Request, Response, RequestHandler } from 'express';
import { FeedbackService } from './feedback.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { UserInfoFromToken } from '../../../interfaces/common';

const createFeedback: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const feedback = req.body;
    const userInfo = req.user;

    const result = await FeedbackService.createFeedback(
      feedback,
      userInfo as UserInfoFromToken,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'Feedback post successfully.',
    });
  },
);

export const FeedbackController = {
  createFeedback,
};

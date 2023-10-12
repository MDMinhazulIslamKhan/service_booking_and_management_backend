import { Request, Response, RequestHandler } from 'express';
import { BookingService } from './booking.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { UserInfoFromToken } from '../../../interfaces/common';

const bookTutor: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const bookingData = req.body;

    const result = await BookingService.bookTutor(
      bookingData,
      user as UserInfoFromToken,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'Tutor booked Successfully',
    });
  },
);

const getAllBookings: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await BookingService.getAllBookings();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'Booking retrieved Successfully',
    });
  },
);

const getOwnBookings: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const result = await BookingService.getOwnBookings(
      user as UserInfoFromToken,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'Booking retrieved Successfully',
    });
  },
);

const processBookings: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.bookingId;
    const result = await BookingService.processBookings(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: result,
    });
  },
);

export const BookingController = {
  bookTutor,
  getAllBookings,
  processBookings,
  getOwnBookings,
};

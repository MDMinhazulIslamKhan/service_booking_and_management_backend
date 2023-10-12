import { Model, Types } from 'mongoose';

export type IFeedback = {
  userId: Types.ObjectId;
  feedback: string;
};

export type FeedbackModel = Model<IFeedback, Record<string, unknown>>;

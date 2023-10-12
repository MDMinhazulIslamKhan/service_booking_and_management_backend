import { Schema, model } from 'mongoose';
import { FeedbackModel, IFeedback } from './feedback.interface';

const feedbackSchema = new Schema<IFeedback>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    feedback: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Feedback = model<IFeedback, FeedbackModel>('Feedback', feedbackSchema);

export default Feedback;

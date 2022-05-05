import { prisma } from '@database/prisma';

import {
  Feedback,
  FeedbackData,
  IFeedbacksRepository,
} from '../IFeedbacksRepository';

export class PrismaFeedbacksRepository implements IFeedbacksRepository {
  public async create(data: FeedbackData): Promise<Feedback> {
    const feedback = await prisma.feedback.create({
      data,
    });

    return feedback as Feedback;
  }
}

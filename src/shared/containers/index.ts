import { container } from 'tsyringe';

import { IFeedbacksRepository } from '@modules/feedbacks/repositories/IFeedbacksRepository';
import { PrismaFeedbacksRepository } from '@modules/feedbacks/repositories/prisma/PrismaFeedbacksRepository';
import { IMailService } from '@services/MailService';
import { NodemailerMailService } from '@services/nodemailer/NodemailerMailService';

container.registerSingleton<IFeedbacksRepository>(
  'PrismaFeedbacksRepository',
  PrismaFeedbacksRepository,
);

container.registerSingleton<IMailService>(
  'NodemailerMailService',
  NodemailerMailService,
);

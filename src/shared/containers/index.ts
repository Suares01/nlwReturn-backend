import { IFeedbacksRepository } from 'src/modules/feedbacks/repositories/IFeedbacksRepository';
import { PrismaFeedbacksRepository } from 'src/modules/feedbacks/repositories/prisma/PrismaFeedbacksRepository';
import { container } from 'tsyringe';

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

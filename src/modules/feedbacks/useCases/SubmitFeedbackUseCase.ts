import { inject, injectable } from 'tsyringe';

import { IFeedbacksRepository } from '@modules/feedbacks/repositories/IFeedbacksRepository';
import { IMailService } from '@services/MailService';
import { UnprocessableEntityError } from '@shared/errors/internalErrors';

interface ISubmitFeedbackRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

@injectable()
export class SubmitFeedbackUseCase {
  constructor(
    @inject('PrismaFeedbacksRepository')
    private feedbacksRepository: IFeedbacksRepository,
    @inject('NodemailerMailService')
    private mailService: IMailService,
  ) {}

  public async execute({
    comment,
    type,
    screenshot,
  }: ISubmitFeedbackRequest): Promise<void> {
    if (!type) throw new UnprocessableEntityError('Type is required.');

    if (!comment) throw new UnprocessableEntityError('Comment is required.');

    if (screenshot && !screenshot.startsWith('data:image/png;base64'))
      throw new UnprocessableEntityError('Invalid screenshot format.');

    await this.feedbacksRepository.create({ comment, type, screenshot });

    await this.mailService.sendMail({
      subject: 'Novo Feedback',
      body: [
        `<div style="font-family: sans-serif; color: #222;">`,
        `<h3>Feedback</h3>`,
        '<div style="font-family: sans-serif; font-size: 16px; color: #111;">',
        `<p>Tipo: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot ? `<img src="${screenshot}" />` : '',
        '</div>',
        `</div>`,
      ].join('\n'),
    });
  }
}

import 'reflect-metadata';

import { UnprocessableEntityError } from '@shared/errors/internalErrors';

import { SubmitFeedbackUseCase } from '../SubmitFeedbackUseCase';

describe('Submit feedback', () => {
  const createFeedbackSpy = jest.fn();
  const sendMailSpy = jest.fn();

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy },
  );

  it('should be able to submit a feedback', async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: 'BUG',
        comment: 'Bugou tudo',
        screenshot: 'data:image/png;base64,bugoutudo.png',
      }),
    ).resolves.not.toThrow();
    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit feedback without type', async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: '',
        comment: 'Bugou tudo',
        screenshot: 'data:image/png;base64,bugoutudo.png',
      }),
    ).rejects.toBeInstanceOf(UnprocessableEntityError);

    await expect(
      submitFeedbackUseCase.execute({
        type: '',
        comment: 'Bugou tudo',
        screenshot: 'data:image/png;base64,bugoutudo.png',
      }),
    ).rejects.toThrow(new UnprocessableEntityError('Type is required.'));
  });

  it('should not be able to submit feedback without comment', async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: 'BUG',
        comment: '',
        screenshot: 'data:image/png;base64,bugoutudo.png',
      }),
    ).rejects.toBeInstanceOf(UnprocessableEntityError);

    await expect(
      submitFeedbackUseCase.execute({
        type: 'BUG',
        comment: '',
        screenshot: 'data:image/png;base64,bugoutudo.png',
      }),
    ).rejects.toThrow(new UnprocessableEntityError('Comment is required.'));
  });

  it('should not be able to submit feedback with invalid screenshot', async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: 'BUG',
        comment: 'Bugou tudo',
        screenshot: 'bugoutudo.png',
      }),
    ).rejects.toBeInstanceOf(UnprocessableEntityError);

    await expect(
      submitFeedbackUseCase.execute({
        type: 'BUG',
        comment: 'Bugou tudo',
        screenshot: 'bugoutudo.png',
      }),
    ).rejects.toThrow(
      new UnprocessableEntityError('Invalid screenshot format.'),
    );
  });
});

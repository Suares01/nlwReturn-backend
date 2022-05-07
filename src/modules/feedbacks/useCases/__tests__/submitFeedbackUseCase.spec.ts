import 'reflect-metadata';

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
    ).rejects.toThrow();
  });

  it('should not be able to submit feedback without comment', async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: 'BUG',
        comment: '',
        screenshot: 'data:image/png;base64,bugoutudo.png',
      }),
    ).rejects.toThrow();
  });

  it('should not be able to submit feedback with invalid screenshot', async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: 'BUG',
        comment: 'Bugou tudo',
        screenshot: 'bugoutudo.png',
      }),
    ).rejects.toThrow();
  });
});

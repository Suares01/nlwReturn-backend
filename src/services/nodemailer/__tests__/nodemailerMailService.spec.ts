import { NodemailerMailService } from '../NodemailerMailService';

describe('NodemailerMailService', () => {
  const nodemailerMailService = new NodemailerMailService();

  it('should send an email with success', async () => {
    const { response } = await nodemailerMailService.sendMail({
      body: '<p>Test</p>',
      subject: 'Test',
    });

    expect(response.split(' ')[0]).toBe('250');
  });
});

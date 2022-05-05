import config from 'config';
import nodemailer from 'nodemailer';

import { IMailService, IMailServiceData } from '@services/MailService';

import { INodemailerConfig } from '../../../config/types.d';

export class NodemailerMailService implements IMailService {
  private nodemailerConfig = config.get<INodemailerConfig>(
    'App.mailService.nodemailer',
  );

  private transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: this.nodemailerConfig.user,
      pass: this.nodemailerConfig.pass,
    },
  });

  public async sendMail({ body, subject }: IMailServiceData): Promise<void> {
    await this.transport.sendMail({
      from: 'Equipe NLW <oi@nwl.com>',
      to: 'Equipe de Suporte <lucas.trabalho7.ls@gmail.com>',
      subject,
      html: body,
    });
  }
}

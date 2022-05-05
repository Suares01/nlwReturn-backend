export interface IMailServiceData {
  subject: string;
  body: string;
}

export interface IMailService {
  sendMail(data: IMailServiceData): Promise<void>;
}

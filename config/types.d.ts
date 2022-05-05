export interface INodemailerConfig {
  user: string;
  pass: string;
}

export interface IMailServiceConfig {
  nodemailer: INodemailerConfig;
}

export interface IAppConfig {
  port: number;
  mailService: IMailServiceConfig;
}

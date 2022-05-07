export interface INodemailerConfig {
  user: string;
  pass: string;
}

export interface IMailServiceConfig {
  nodemailer: INodemailerConfig;
}

export interface IAppConfig {
  mailService: IMailServiceConfig;
}

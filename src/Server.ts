import 'reflect-metadata';
import '@shared/containers';

import config from 'config';
import express from 'express';

import * as database from '@database/prisma';

import router from './routes';

class Server {
  constructor(private port = config.get<number>('App.port')) {}

  public app = express();

  public start(): void {
    this.app.listen(this.port, () =>
      console.log(`Server ir running on port ${this.port}`),
    );
  }

  public async close(): Promise<void> {
    await database.disconnect();
  }

  public async prepareServer(): Promise<void> {
    this.setUpExpress();
    await database.connect();
    this.setUpRoutes();
  }

  private setUpExpress(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private setUpRoutes(): void {
    this.app.use(router);
  }
}

const APIServer = new Server();

export default APIServer;

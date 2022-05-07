import 'reflect-metadata';
import '@shared/containers';
import 'express-async-errors';

import config from 'config';
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';

import * as database from '@database/prisma';

import { InternalErrorHandler } from './middlewares/InternalErrorHandler';
import router from './routes';

class Server {
  constructor(private port = config.get<number>('App.port')) {}

  public app = express();

  public server = createServer(this.app);

  public start(): void {
    this.server.listen(this.port, () =>
      console.log(`Server ir running on port ${this.port}`),
    );
  }

  public async close(): Promise<void> {
    await database.disconnect();

    await new Promise((resolve, reject) => {
      this.server.close((error) => {
        return error ? reject(error) : resolve(true);
      });
    });
  }

  public async prepareServer(): Promise<void> {
    this.setUpExpress();
    await database.connect();
    this.setUpRoutes();
    this.setUpErrorMiddlewares();
  }

  private setUpExpress(): void {
    this.app.use(
      cors({
        origin: '',
      }),
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private setUpRoutes(): void {
    this.app.use(router);
  }

  private setUpErrorMiddlewares(): void {
    this.app.use(InternalErrorHandler);
  }
}

const APIServer = new Server();

export default APIServer;

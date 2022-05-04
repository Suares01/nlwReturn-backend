import config from 'config';
import express from 'express';

export class Server {
  constructor(private port = config.get<number>('App.port')) {}

  public app = express();

  public start(): void {
    this.app.listen(this.port, () =>
      console.log(`Server ir running on port ${this.port}`),
    );
  }
}

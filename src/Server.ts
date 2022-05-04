import config from 'config';
import express from 'express';

class Server {
  constructor(private port = config.get<number>('App.port')) {}

  public app = express();

  public start(): void {
    this.app.listen(this.port, () =>
      console.log(`Server ir running on port ${this.port}`),
    );
  }

  public prepareServer(): void {
    this.setUpExpress();
  }

  private setUpExpress(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
}

const APIServer = new Server();

export default APIServer;

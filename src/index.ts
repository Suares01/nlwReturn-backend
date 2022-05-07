import API from './Server';

const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];

process.on('unhandledRejection', (reason, promise) => {
  console.error(
    `App exiting due to an unhandled promise: ${reason} reason: ${promise}`,
  );

  throw reason;
});

process.on('uncaughtException', (error) => {
  console.error(`App exiting due to an uncaught exception: ${error}`);

  process.exit(1);
});

(async () => {
  try {
    await API.prepareServer();
    API.start();

    exitSignals.forEach((signal) => {
      process.on(signal, async () => {
        await API.close();
        console.log(`App exited with success`);
        process.exit(0);
      });
    });
  } catch (error) {
    console.error(`App exiting with error: ${error}`);
    process.exit(1);
  }
})();

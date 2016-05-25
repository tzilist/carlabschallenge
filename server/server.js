import express from 'express';
import cluster from 'cluster';
import os from 'os';
import cors from 'cors';
import factGet from './utils/factGet';
import recent from './utils/recent';

const app = express();
const cpus = os.cpus().length;

/**
* Create cluster of node servers, one for each cpu. This should allow
* for greater throughput during concurrent processing. It would be preferable
* to use PM2 here, however, this is a quick fix for now.
**/
if (cluster.isMaster) {
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
  // let us know when a worker has crashed/etc.
  cluster.on('exit', (worker, code, signal) => {
    if (signal) {
      console.log(`worker was killed by signal: ${signal}`);
    } else if (code !== 0) {
      console.log(`worker exited with error code: ${code}`);
    } else {
      console.log('worker success!');
    }
  });
} else {
  app.use(cors());

  app.get('/fact', factGet);

  app.get('/recent/:number', recent);

  app.get('*', (req, res) => {
    res.status(404).send('This isn\'t an appropriate path, please go to /fact or /recent/:number');
  });
  // set to be ready for production or development here, will log which port is open on start
  app.listen(process.env.PORT || 8080, () => {
    console.log('Now listening on %s', process.env.port || 8080);
  });
}

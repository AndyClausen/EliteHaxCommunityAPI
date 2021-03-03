/**
 * Module dependencies.
 */
import { wrap } from 'async-middleware';
import * as compression from 'compression';
import * as cors from 'cors';
import * as express from 'express';
import { Router } from 'express';
import * as logger from 'morgan';
import * as path from 'path';

/**
 * Configs
 */
import loadConfig from '../config-loader';

/**
 * Routes middleware
 */

/**
 * Other
 */
import DbHandler from '../db/db-handler';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.bootstrapApp();
  }

  private async bootstrapApp() {
    await loadConfig();

    this.loadMiddleware();

    const router = express.Router();

    this.loadRoutes(router);
    this.start();
  }

  private loadMiddleware() {
    DbHandler.config();
    this.express.set('port', process.env.PORT || 1337);
    this.express.use(compression());
    this.express.use(logger('dev'));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(cors());
  }

  /**
   * App features (routes / endpoints).
   */
  private loadRoutes(router: Router): void {
    // router.use('/api', userIsRequired, initCache);
    router.get('/', (req, res) => {
      res.send('Hello world!');
    })

    this.express.use(router);

    const pathToFEBuild = path.join(__dirname, '../../frontend/');
    this.express.use('/', express.static(pathToFEBuild));
    this.express.get('*', (req, res) => res.sendFile(`${pathToFEBuild}/index.html`));
  }

  private start() {
    /**
     * Start Express server.
     */
    this.express.listen(this.express.get('port'), () => {
      console.log(
        '  App is running at http://localhost:%d \
        in %s mode',
        this.express.get('port'),
        this.express.get('env')
      );
    });
  }
}

export const app = new App().express;

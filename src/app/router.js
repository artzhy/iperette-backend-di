const { Router } = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = ({ config }) => {
  const router = Router();

  const apiRouter = Router();

  apiRouter
    .use(cors())
    .use(bodyParser.json())
    .use(morgan('combined'));
  /*
     * Add your API routes here
     *
     * You can use the `controllers` helper like this:
     * apiRouter.use('/users', controller(controllerPath))
     *
     * The `controllerPath` is relative to the `interfaces/http` folder
     */
  /*
  apiRouter.use('/users', controller('user/UsersController'));

  router.use('/api', apiRouter);

  router.use(errorHandler);
*/
  return router;
};

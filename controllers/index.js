const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);

//if we make a request to an endpoint that doesn't exist 404 error
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;

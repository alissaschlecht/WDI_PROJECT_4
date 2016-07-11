var express        = require('express'),
    router         = express.Router(),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override');

var bikesController = require('../controllers/bikes');

  router.route('/bikes')
        .get(bikesController.getAllBikes)

  // router.route('/bikes/:id')
  //       .get(bikesController.getBike)

var partsController = require('../controllers/parts');

  router.route('/parts')
        .get(partsController.getAllParts)

  // router.route('/parts/:id')
  //       .get(partsController.getPart)

// var pathsController = require('../controllers/paths');

//   router.route('/paths')
//         .get(pathsController.getAllPaths)

//   // router.route('/paths/:id')
//   //       .get(pathsController.getPath)

module.exports = router
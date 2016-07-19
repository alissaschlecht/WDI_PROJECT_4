var express        = require('express'),
    router         = express.Router(),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override');

var bikesController = require('../controllers/bikes');

router.route('/bikes')
      .get(bikesController.getAllBikes)
      .post(bikesController.createBike);

  router.route('/bikes/:id')
      .get(bikesController.getBike)
      .put(bikesController.updateBike)
      .delete(bikesController.removeBike)




var partsController = require('../controllers/parts');

  router.route('/parts')
        .get(partsController.getAllParts)
        .post(partsController.createPart);

  router.route('/parts/:id')
        .get(partsController.getPart)
        .patch(partsController.updatePart)
        .delete(partsController.removePart);


var authenticationController = require("../controllers/authentication");

router.route('/users')
      .get(authenticationController.getUsers);


// var infoController = require('../controllers/info');

//   router.route('/parts')
//         .get(infoController.getAllInfo)
//         .post(infoController.createInfo);

//   router.route('/info/:id')
//         .get(infoController.getInfo)
//         .patch(infoController.updateInfo)
//         .delete(infoController.removeInfo)


module.exports = router
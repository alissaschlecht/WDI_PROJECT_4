var Bike = require('../models/Bike');

// GET ALL
function getAllBikes(request, response) {
  Bike.find(function(error, bikes) {
    if(error) response.status(404).send(error);

    response.status(200).send(bikes);
  }).select('-__v');
}

//GET ONE
function getBike(request, response) {
  var id = request.params.id;

  Bike.findById({_id: id}, function(error, bike) {
    if(error) response.status(404).send(error);

    response.status(200).send(bike);
  }).select('-__v');
}

// POST
function createBike(request, response) {
  console.log('in POST');
  console.log('body:',request.body);

  var bike = new Bike(request.body);

  bike.save(function(error) {
    if(error) response.json({messsage: 'Could not ceate bike b/c:' + error});

    response.json({bike: bike});
  });
}


function updateBike(request, response) {
  var id = request.params.id;

  Bike.findById({_id: id}, function(error, bike) {
    if(error) response.json({message: 'Could not find bike b/c:' + error});

    if(request.body.name) bike.name = request.body.name;

    bike.save(function(error) {
      if(error) response.json({messsage: 'Could not update bike b/c:' + error});

      response.json({message: 'Bike successfully updated', bike: bike});
    });
  }).select('-__v');
}

function removeBike(request, response) {
  var id = request.params.id;

  Bike.remove({_id: id}, function(error) {
    if(error) response.json({message: 'Could not delete bike b/c:' + error});

    response.json({message: 'Bike successfully deleted'});
  }).select('-__v');
}



module.exports = {
  getAllBikes: getAllBikes,
  getBike: getBike,
  createBike: createBike,
  updateBike: updateBike,
  removeBike: removeBike
}

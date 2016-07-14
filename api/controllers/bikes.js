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

  Bike.findById({_id: id})
  .populate('frontWheel')
  .populate('rearWheel')
  .populate('crank')
  .populate('seat')
  .populate('handlebars')
  .exec(function(error, bike) {
    if(error) response.status(404).send(error);

    response.status(200).send({bike: bike});
  });
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

  Bike.findByIdAndUpdate(id, request.body, {new: true})
  .populate('frontWheel')
  .populate('rearWheel')
  .populate('crank')
  .populate('seat')
  .populate('handlebars')
  .exec( function(err, bike) {
    
    if(err) response.json({message: 'Could not find bike b/c:' + err});
    response.json({bike: bike});

  });
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

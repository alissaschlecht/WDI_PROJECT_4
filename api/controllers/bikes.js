var Bike = require('../models/Bike');

// GET ALL
function getAllBikes(request, response) {
  Bike.find(function(error, bikes) {
    if(error) response.status(404).send(error);

    response.status(200).send(bikes);
  }).select('-__v');
}

// GET ONE
// function getBike(request, response) {
//   var id = request.params.id;

//   Bike.findById({_id: id}, function(error, bike) {
//     if(error) response.status(404).send(error);

//     response.status(200).send(bike);
//   }).select('-__v');
// }


module.exports = {
  getAllBikes: getAllBikes
  // getBike: getBike
}
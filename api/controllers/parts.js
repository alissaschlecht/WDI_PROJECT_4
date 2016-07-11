var Part = require('../models/Part');

// GET ALL PARTS
function getAllParts(request, response) {
  Part.find(function(error, parts) {
    if(error) response.status(404).send(error);

    response.status(200).send(parts);
  }).select('-__v');
}

module.exports = {
  getAllParts: getAllParts
}
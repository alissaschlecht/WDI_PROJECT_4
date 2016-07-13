var Part = require('../models/Part');

// GET ALL PARTS
function getAllParts(request, response) {
  Part.find(function(error, parts) {
    if(error) response.status(404).send(error);

    response.status(200).send(parts);
  }).select('-__v');
}

// POST
function createPart(request, response) {
  console.log('in POST');
  console.log('body:',request.body);

  var part = new Part(request.body);

  part.save(function(error) {
    if(error) response.json({messsage: 'Could not ceate part b/c:' + error});

    response.json({part: part});
  });
}

// GET
function getPart(request, response) {
  var id = request.params.id;

  Part.findById({_id: id}, function(error, part) {
    if(error) response.json({message: 'Could not find part b/c:' + error});

    response.json({part: part});
  }).select('-__v');
}

function updatePart(request, response) {
  var id = request.params.id;

  Part.findById({_id: id}, function(error, part) {
    if(error) response.json({message: 'Could not find part b/c:' + error});

    if(request.body.name) part.name = request.body.name;
    // if(request.body.location) criminal.location = request.body.location;
    // if(request.body.status) criminal.status = request.body.status;

    part.save(function(error) {
      if(error) response.json({messsage: 'Could not update part b/c:' + error});

      response.json({message: 'Part successfully updated', part: part});
    });
  }).select('-__v');
}

function removePart(request, response) {
  var id = request.params.id;

  Part.remove({_id: id}, function(error) {
    if(error) response.json({message: 'Could not delete part b/c:' + error});

    response.json({message: 'Part successfully deleted'});
  }).select('-__v');
}

module.exports = {
  getAllParts: getAllParts,
  createPart: createPart,
  getPart: getPart,
  updatePart: updatePart,
  removePart: removePart
}
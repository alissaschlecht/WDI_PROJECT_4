var Paths = require('../models/Path');

// GET ALL PATHS
function getAllPaths(request, response) {
  Path.find(function(error, paths) {
    if(error) response.status(404).send(error);

    response.status(200).send(paths);
  }).select('-__v');
}


module.exports = {
  getAllPaths: getAllPaths
}
var User = require('../models/User');

// GET ALL
function getUsers(request, response) {
  User.find(function(error, users) {
    if(error) response.status(404).send(error);

    response.status(200).send({ users: users});
  })
}


module.exports = {
  getUsers: getUsers
}

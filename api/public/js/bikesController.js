angular.module('buildBikes')
       .controller('BikesController', BikesController);

BikesController.$inject = ['$http'];

function BikesController($http){
  var self = this;
  self.all = [];
  self.addBike = addBike;
  self.newBike = {};
  self.getBikes = getBikes;
  self.deleteBike = deleteBike;
  self.selectBike = selectBike;

  getParts();
  function getBikes(){
    $http
      .get('http://localhost:3000/bikes')
      .then(function(response){
        self.all = response.data.bikes;
    });
  }

  function addBike(){

    if(self.newBike._id) {

      $http
        .patch('http://localhost:3000/bikes/' + self.newBike._id, self.newBike)
        .then(function(response){
          getBikes();
      });

    } else {

      $http
        .post('http://localhost:3000/bikes', self.newBike)
        .then(function(response){
          getBikes();
      });

    }
  
    self.newBike = {};
  }

  function deleteBike(bike){
    $http
      .delete("http://localhost:3000/bikes/" + bike._id)
      .then(function(response){
        var index = self.all.indexOf(bike);
        self.all.splice(index, 1);
      });
  }

  function selectCriminal(bike) {

    self.newBike = bike;

  }

}
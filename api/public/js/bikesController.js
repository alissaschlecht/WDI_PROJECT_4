angular.module('buildBikes')
       .controller('BikesController', BikesController);

BikesController.$inject = ['$http'];

function BikesController($http){
  
  var self = this;
  self.showBikes = showBikes;
  self.saveBike  = saveBike;
  self.getParts  = getParts;
  self.dropped   = dropped;
  self.parts     = [];
  self.allBikes  = [];
  showBikes();

  // self.newBike = {
  //   name: "New Bike2",
  //   color: "blue",
  //   rearWheel : {},
  //   frontWheel: {},
  //   crank: {},
  //   seat: {},
  //   handlebars: {}
  // };

  self.newBike = {};

  function dropped(value) {
    console.log(self.newBike);
  }

  function getParts() {

      $http
        .get('http://localhost:3000/parts')
        .then(function(response){

          self.parts = response.data;
      });

  }

  getParts();
  // getBike("578762c540daf5b234527825");

  function saveBike(){
      if(self.newBike._id) {
          $http
            .put('http://localhost:3000/bikes/' + self.newBike._id, self.newBike)
            .then(function(response){ 
              self.newBike = response.data.bike;
              console.log(self.newBike);
          });

      } else {
          $http
            .post('http://localhost:3000/bikes', self.newBike)
            .then(function(response){ 
              self.newBike = response.data.bike;
          });

      }  
  }

  function getBike(id) {
      $http
        .get('http://localhost:3000/bikes/' + id)
        .then(function(response){

          self.newBike = response.data.bike;
      });
  }

  function showBikes() {
      $http
        .get('http://localhost:3000/bikes/')
        .then(function(response){

          self.allBikes = response.data;
          console.log(self.allBikes);
      });

  }

}
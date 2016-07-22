angular.module('buildBikes')
       .controller('BikesController', BikesController);

BikesController.$inject = ['$http'];

function BikesController($http){
  
  var self = this;
  self.spinWheel = spinWheel;
  self.showBikes = showBikes;
  self.saveBike  = saveBike;
  self.getParts  = getParts;
  self.dropped   = dropped;
  self.selectBike = selectBike;
  self.parts     = [];
  self.bikes  = [];
  showBikes();

  self.newBike = {};

  function dropped(value) {
    console.log(self.newBike);
  }

  self.beforeDrop = function() {
     console.log('hello');
      };

  function getParts() {

      $http
        .get('/parts')
        .then(function(response){

          self.parts = response.data;
      });

  }

  getParts();
  // getBike("578762c540daf5b234527825");

  function saveBike(){
      if(self.newBike._id) {
          $http
            .put('/bikes/' + self.newBike._id, self.newBike)
            .then(function(response){ 
              self.newBike = response.data.bike;
              console.log(self.newBike);
          });

      } else {
          $http
            .post('/bikes', self.newBike)
            .then(function(response){ 
              self.newBike = response.data.bike;
          });

      }  
  }

  function getBike(id) {
      $http
        .get('/bikes/' + id)
        .then(function(response){

          self.newBike = response.data.bike;
      });
  }

  function showBikes() {
      $http
        .get('/bikes/')
        .then(function(response){

          self.bikes = response.data;
          console.log(self.allBikes);
      });

  }

  function selectBike(bike) {

    self.newBike = bike;

  }

  function spinWheel(){

    spinWheels1 = document.getElementsByClassName('frontWheel');
    spinWheels2 = document.getElementsByClassName('rearWheel');
    spinWheels1[0].classList.add('spinWheel');
    spinWheels2[0].classList.add('spinWheel');

    console.log("lalal")

    // var frontWheel = document.getElementById('frontWheel');
    // var rearWheel = document.getElementById('backWheel');


  }

}
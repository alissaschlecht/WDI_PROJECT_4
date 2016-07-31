angular.module('buildBikes')
       .controller('BikesController', BikesController);

BikesController.$inject = ['$http'];

function BikesController($http){
  
  var self = this;
  self.spinWheel = spinWheel;
  self.showBikes = showBikes;
  self.getPartCategory = getPartCategory;
  self.saveBike  = saveBike;
  self.deleteBike = deleteBike;
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

  // self.beforeDrop = function() {
  //    console.log('hello');
  //     };

  function getParts() {

      $http
        .get('/parts')
        .then(function(response){
          self.parts = response.data;
      });

  }

  function getPartCategory(category){
   $http
     .get('http://localhost:3000/category/' + category)
     .then(function(response){
       self.parts = response.data;
     })
  }

  function saveBike(){
      if(self.newBike._id) {
          $http
            .put('/bikes/' + self.newBike._id, self.newBike)
            .then(function(response){ 
              self.newBike = response.data.bike;
          }); 

      } else {
          $http
            .post('/bikes', self.newBike)
            .then(function(response){ 
              self.newBike = response.data.bike;
          });

      } 
    showBikes(); 
    // getParts();
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
      });

  }

  function selectBike(bike) {

    self.newBike = bike;

  }

  function deleteBike(bike){
    $http
      .delete('/bikes/' + bike._id)
      .then(function(response){
        var index = self.bikes.indexOf(bike);
        self.bikes.splice(index, 1);
      });
  }

  function spinWheel(){

    spinWheels1 = document.getElementsByClassName('frontWheel');
    spinWheels2 = document.getElementsByClassName('rearWheel');
    spinWheels1[0].classList.add('spinWheel');
    spinWheels2[0].classList.add('spinWheel');

  }

}
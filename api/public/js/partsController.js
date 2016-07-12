angular.module('dragDrop')
       .controller('PartsController', PartsController)
       .filter('to_trusted', ['$sce', function($sce){
              return function(text) {
                  return $sce.trustAsHtml(text);
              };
          }]);

PartsController.$inject = ['$http'];
function PartsController($http){

  var self             = this;
  self.parts           = [];
  self.part            = {};

  function getParts(){
    $http
    .get('http://localhost:3000/parts')
    .then(function(response){
      self.parts = response.data;
    });
  }

  getParts();
}


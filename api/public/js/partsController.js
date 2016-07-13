angular.module('dragDrop')
       .controller('PartsController', PartsController)
       .filter('to_trusted', ['$sce', function($sce){
              return function(text) {
                  return $sce.trustAsHtml(text);
              };
          }]);

 PartsController.$inject = ['$http'];
 function PartsController($http){
   var self = this;
   self.all = [];
   self.addPart = addPart;
   self.newPart = {};
   self.getParts = getParts;
   self.deletePart = deletePart;
   self.selectPart = selectPart;

   getParts();
   function getParts(){
     $http
       .get('http://localhost:3000/parts')
       .then(function(response){
         self.all = response.data.parts;
     });
   }

   function addPart(){

     if(self.newPart._id) {

       $http
         .patch('http://localhost:3000/parts/' + self.newPart._id, self.newPart)
         .then(function(response){
           getParts();
       });

     } else {

       $http
         .post('http://localhost:3000/parts', self.newPart)
         .then(function(response){
           getParts();
       });

     }
   
     self.newPart = {};
   }

   function deletePart(part){
     $http
       .delete("http://localhost:3000/parts/" + part._id)
       .then(function(response){
         var index = self.all.indexOf(part);
         self.all.splice(index, 1);
       });
   }

   function selectPart(part) {

     self.newPart = part;

   }

 }



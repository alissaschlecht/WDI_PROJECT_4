angular.module('buildBikes')
       .controller('PartsController', PartsController)
       .filter('to_trusted', ['$sce', function($sce){
              return function(text) {
                  return $sce.trustAsHtml(text);
              };
          }]);

 PartsController.$inject = ['$http'];
 function PartsController($http, CurrentUser){
   var self = this;
   self.all = [];
   self.getPartCategory = getPartCategory;
   // self.addPart = addPart;
   // self.newPart = {};
   // self.getParts = getParts;
   // self.deletePart = deletePart;
   // self.selectPart = selectPart;
   // var newPart = new Image();
   // self.newPart;


   // getParts();
   // function getParts(){
   //   $http
   //     .get('http://localhost:3000/parts')
   //     .then(function(response){
   //       self.all = response.data;
   //   });
   // }

   getPartCategory("seat");
   function getPartCategory(category){
    $http
      .get('http://localhost:3000/category/' + category)
      .then(function(response){
        self.all = response.data;
      })
   }

   // function addPart(){

   //   if(self.newPart._id) {

   //     $http
   //       .patch('http://localhost:3000/parts/' + self.newPart._id, self.newPart)
   //       .then(function(response){
   //         // getParts();
   //     });

   //   } else {

   //    newPart.id = "pic"
   //    newPart.src = document.getElementById('pwCanvasMain').toDataURL();

   //     $http
   //       .post('http://localhost:3000/parts', self.newPart)
   //       .then(function(response){
   //         // getParts();
   //     });

   //   }
   
   //   self.newPart = {};
   // }

   // function deletePart(part){
   //   $http
   //     .delete("http://localhost:3000/parts/" + part._id)
   //     .then(function(response){
   //       var index = self.all.indexOf(part);
   //       self.all.splice(index, 1);
   //     });
   // }

   // function selectPart(part) {

   //   self.newPart = part;

   // }

 }



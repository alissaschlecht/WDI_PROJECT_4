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


   getPartCategory("seat");
   function getPartCategory(category){
    $http
      .get('http://localhost:3000/category/' + category)
      .then(function(response){
        self.all = response.data;
      })
   }

 }



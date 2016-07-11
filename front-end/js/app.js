var app = angular.module('dragDrop', []);

app.controller('PartsController', PartsController);
PartsController.$inject = ['$http'];
function PartsController($http){

  var self             = this;
  self.parts           = [];
  self.part            = {};
  // self.getParts        = getParts;


  function getParts(){
    $http
    .get('http://localhost:3000/parts')
    .then(function(response){
      self.parts = response.data;
    });
  }

  getParts();
}

// ============================ DRAG AND DROP ============================================

app.directive('draggable', function() {
  return function(scope, element) {
    // this gives us the native JS object
    var el = element[0];
    
    el.draggable = true;
    
    el.addEventListener(
      'dragstart',
      function(e) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('Text', this.id);
        this.classList.add('drag');
        return false;
      },
      false
    );
    
    el.addEventListener(
      'dragend',
      function(e) {
        this.classList.remove('drag');
        return false;
      },
      false
    );
  }
});

app.directive('droppable', function() {
  return {
    scope: {
      drop: '&',
      bin: '='
    },
    link: function(scope, element) {
      // again we need the native object
      var el = element[0];
      
      el.addEventListener(
        'dragover',
        function(e) {
          e.dataTransfer.dropEffect = 'move';
          // allows us to drop
          if (e.preventDefault) e.preventDefault();
          this.classList.add('over');
          return false;
        },
        false
      );
      
      el.addEventListener(
        'dragenter',
        function(e) {
          this.classList.add('over');
          return false;
        },
        false
      );
      
      el.addEventListener(
        'dragleave',
        function(e) {
          this.classList.remove('over');
          return false;
        },
        false
      );
      
      el.addEventListener(
        'drop',
        function(e) {
          // Stops some browsers from redirecting.
          if (e.stopPropagation) e.stopPropagation();
          
          this.classList.remove('over');
          
          var binId = this.id;
          var item = document.getElementById(e.dataTransfer.getData('Text'));

          var itemId = item.id;
          if(itemId == binId  && this.children.length == 0){
            this.appendChild(item);
            // call the passed drop function
            scope.$apply(function(scope) {
              var fn = scope.drop();
              if ('undefined' !== typeof fn) {            
                fn(item.id, binId);
              }
            });
          }
          return false;
        },
        false
      );
    }
  }
});

app.controller('DragDropCtrl', function($scope) {
  $scope.handleDrop = function(item, bin) {
    // alert('Item ' + item + ' has been dropped into ' + bin);
  }
});


// app.directive('draggable', function() {
//   return function(scope, element) {
//     // this gives us the native JS object
//     var el = element[0];
    
//     el.draggable = true;
    
//     el.addEventListener(
//       'dragstart',
//       function(e) {
//         e.dataTransfer.effectAllowed = 'move';
//         e.dataTransfer.setData('Text', this.id);
//         this.classList.add('drag');
//         return false;
//       },
//       false
//     );
    
//     el.addEventListener(
//       'dragend',
//       function(e) {
//         this.classList.remove('drag');
//         return false;
//       },
//       false
//     );
//   }
// });

// app.directive('droppable', function() {
//   return {
//     scope: {
//       drop: '&',
//       bin: '='
//     },
//     link: function(scope, element) {
//       // again we need the native object
//       var el = element[0];
      
//       el.addEventListener(
//         'dragover',
//         function(e) {
//           e.dataTransfer.dropEffect = 'move';
//           // allows us to drop
//           if (e.preventDefault) e.preventDefault();
//           this.classList.add('over');
//           return false;
//         },
//         false
//       );
      
//       el.addEventListener(
//         'dragenter',
//         function(e) {
//           this.classList.add('over');
//           return false;
//           console.log("entering drag event");
//         },
//         false
//       );
      
//       el.addEventListener(
//         'dragleave',
//         function(e) {
//           this.classList.remove('over');
//           return false;
//         },
//         false
//       );
      
//       el.addEventListener(
//         'drop',
//         function(e) {
//           // Stops some browsers from redirecting.
//           if (e.stopPropagation) e.stopPropagation();
          
//           this.classList.remove('over');
          
//           var binId  = this.id;
//           var itemId = item.id;         
//           var item = document.getElementById(e.dataTransfer.getData('Text'));

//           // if(itemId == binId){
//             this.appendChild(item);
//             scope.$apply(function(scope) {
//               var func = scope.drop();
//               if ('undefined' !== typeof func) {            
//                 func(item.id, binId);
//               }
//             }); 
//           // }
//           return false;
//         },
//         false
//       );
//     }
//   }
// });

// app.controller('DragDropCtrl', function($scope) {
//   $scope.handleDrop = function(item, bin) {
//     // console.log(item +" has been dropped");
//   }
// });


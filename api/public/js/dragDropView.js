angular.module('dragDrop')
       .directive('draggable', draggable)
       .directive('droppable', droppable)

function draggable() {
  return function(scope, element) {
    // this gives us the native JS object
    var el       = element[0];
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
};


function droppable() {
  var count = 0;
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
          // this.classList.add('over');
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
          
          var binId = this.id;
          var item  = document.getElementById(e.dataTransfer.getData('Text'));
          var svg   = item.firstElementChild;

          var itemId = item.id;
          if(itemId == binId  && this.children.length == 0){

  // APPEND ITEM AND CHANGE CLASSES
            this.appendChild(item);
            this.classList.remove('over');
            svg.classList.remove('small');
            count ++;

            switch(svg.id) {
                case 'seat':
                    svg.classList.add('seat');
                    break;
                case 'handlebar':
                    svg.classList.add('handlebar');
                    break;
                case 'gears':
                    svg.classList.add('gears');
                    break;
                case 'backWheel':
                    svg.classList.add('backWheel');
                    break;
                case 'frontWheel':
                    svg.classList.add('frontWheel');
                    break;
                case 'pedal':
                    svg.classList.add('pedal');
                    break;
                case 'crank':
                    svg.classList.add('crank');
                    break;
                case 'cog':
                    svg.classList.add('cog');
                    break;
            }
            scope.$apply(function(scope) {
              var fn = scope.drop();
              if ('undefined' !== typeof fn) {            
                fn(item.id, binId);
              }
            });
          }
          if (count == 5){
            spinWheels = document.getElementsByClassName('wheel');
            spinWheels[0].classList.add('spinWheel');
            spinWheels[1].classList.add('spinWheel');
          }

          // console.log(this);
          var container = document.getElementById('bikeContainer');
          console.log(container);


    // STORE SESSION 
          var storeBike = { "bikeContainer" : container };
          if (typeof(Storage) !== "undefined") {

            // Put the object into storage
            localStorage.setItem('storeBike', JSON.stringify(storeBike));

            // Retrieve the object from storage
            var retrievedBike = localStorage.getItem('storeBike');

            console.log('retrievedBike: ', JSON.parse(retrievedBike));
          }

          return false;
        },
        false
      );
    }
  }



};



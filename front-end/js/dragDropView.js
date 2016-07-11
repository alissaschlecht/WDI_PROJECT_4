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
          var item  = document.getElementById(e.dataTransfer.getData('Text'));

          var itemId = item.id;
          if(itemId == binId  && this.children.length == 0){
            this.appendChild(item);
            count ++;
            scope.$apply(function(scope) {
              var fn = scope.drop();
              if ('undefined' !== typeof fn) {            
                fn(item.id, binId);
              }
            });
          }
          if (count == 5){
            console.log("five!");
            // spinWheels = document.getElementsByClassName('wheel');
            // spinWheels[0].classList.add('spinWheel');
            // spinWheels[1].classList.add('spinWheel');
            // make wheels spin
          }
          return false;
        },
        false
      );
    }
  }
};



angular.module('buildBikes')
       .controller('AnimateController', AnimateController)
       .directive('animate', animate)

function AnimateController($scope){

// var bikes = document.getElementById('backgroundImage');

// bikes.animate({"left":"100%"}, "slow");

$scope.startScroll = function(){
  
  var fadeOut = document.getElementById('backgroundImage');

  fadeOut.classList.add('animated');
  fadeOut.classList.add('fadeOutLeftBig');
  
}

// startScroll();

}

function animate(){


}


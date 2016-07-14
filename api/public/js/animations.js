angular.module('buildBikes')
       .controller('AnimateController', AnimateController)
      

function AnimateController($scope){


  // $scope.first = false;
  $scope.second = true;


// var bikes = document.getElementById('backgroundImage');

// bikes.animate({"left":"100%"}, "slow");

$scope.startScroll = function(){
  


  var fadeOut = document.getElementById('backgroundImage1');
  var fadeOut2 = document.getElementById('firstLineText');

  fadeOut.classList.add('animated');
  fadeOut.classList.add('fadeOutLeftBig');
  fadeOut2.classList.add('animated');
  fadeOut2.classList.add('fadeOutLeftBig');

  var fadeIn = document.getElementById('backgroundImage1');
  var fadeIn2 = document.getElementById('secondLineText');

  fadeIn.classList.add('animated');
  fadeIn.classList.add('fadeInRightBig');
  fadeIn2.classList.add('animated');
  fadeIn2.classList.add('fadeInRightBig');

  $scope.first = true;
  $scope.second = false;
}


}



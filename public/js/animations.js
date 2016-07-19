angular.module('buildBikes')
       .controller('AnimateController', AnimateController)

      

function AnimateController($scope, $timeout){

  $scope.first = 'inline';
  $scope.second = 'none';

  $timeout(function() {
    var fadeOut = document.getElementById('backgroundImage1');
    var fadeOut2 = document.getElementById('firstLineText');

    fadeOut.classList.add('animated');
    fadeOut.classList.add('fadeOutLeftBig');
    fadeOut2.classList.add('animated');
    fadeOut2.classList.add('fadeOutLeftBig');

    $scope.second = 'inline';
   
    var fadeIn = document.getElementById('backgroundImage2');
    var fadeIn2 = document.getElementById('secondLineText');

    fadeIn.classList.add('animated');
    fadeIn.classList.add('fadeInRightBig');
    fadeIn2.classList.add('animated');
    fadeIn2.classList.add('fadeInRightBig');
    

  }, 5000);
  
}



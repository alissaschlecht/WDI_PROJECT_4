angular.module('buildBikes')
       .controller('colorPickerCtrl', colorPickerCtrl)

// // =========== COLOR WHEEL ============================


  // app.directive 



 //  canvas.onmousemove = (function(e) {
 //    var canvasOffset = canvas.offset();
 //    var canvasX = Math.floor(e.pageX - canvasOffset.left);
 //    var canvasY = Math.floor(e.pageY - canvasOffset.top);

 //    var imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
 //    var pixel = imageData.data;

 //    console.log(pixel);
 //  });

 // }


function colorPickerCtrl($scope){

  var canvas = document.getElementById('picker');
  var ctx = canvas.getContext('2d');

  var image = new Image();
  var imageColor;
  image.src = 'https://color.adobe.com/build2.0.0-buildNo/resource/img/kuler/color_wheel_730.png';
  image.style.width = '50px';

  image.onload = function () {
    ctx.drawImage(image, 0, 0, 250, 250);
  }

  $scope.colorPicker = function(){
    imageColor;
  }
}


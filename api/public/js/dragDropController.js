angular.module('buildBikes')
       .controller('DragDropCtrl', DragDropCtrl);

function DragDropCtrl($scope , CurrentUser) {
  
  CurrentUser

  this.bike = {
    
      user: CurrentUser

  };

  this.newPart = {

    userId: CurrentUser

  }

};



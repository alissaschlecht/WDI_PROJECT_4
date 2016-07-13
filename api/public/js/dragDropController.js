angular.module('dragDrop')
       .controller('DragDropCtrl', DragDropCtrl);

function DragDropCtrl($scope , CurrentUser) {
  
  CurrentUser

  this.bike = {
    
      user: CurrentUser

  };

  this.newPart = {

    user: CurrentUser

  }

};



angular.module('buildBikes', ['ngSanitize', 'ui.router', 'ngAnimate', 'ngDragDrop'])
       .constant('API', '/api')
       .config(function($stateProvider, $urlRouterProvider) {
  
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "./partials/home.html",
    })
    .state('bikes', {
      url: "/bikes",
      templateUrl: "./partials/new.html"
    })
    $urlRouterProvider.otherwise("/");
});



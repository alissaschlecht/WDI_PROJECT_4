angular.module('dragDrop', ['ngSanitize', 'ui.router'])
       .config(function($stateProvider, $urlRouterProvider) {
  
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "./partials/home.html",
    })
    .state('bikes', {
      url: "/bikes",
      templateUrl: "./partials/bikes.html",
    })
    .state('gears', {
      url: "/gears",
      templateUrl: "./partials/gears.html"
    })
    .state('brakes', {
      url: "/brakes",
      templateUrl: "./partials/brakes.html"
    })
    $urlRouterProvider.otherwise("/");
});



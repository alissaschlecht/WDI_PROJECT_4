angular
.module("dayWithAlex", [
  "ui.router",
  "ngResource",
  "angular-jwt"
])
.config(Router)
.config(setUpInterceptor)
.factory("User", userFactory)
.factory("AuthInterceptor", AuthInterceptor)
.service("TokenService", TokenService)
.service("CurrentUserService", CurrentUserService)
.controller("usersIndexController", usersIndexCtrl)
.controller("registerController", registerCtrl)
.controller("loginController", loginCtrl)
.controller("mainController", mainCtrl);

setUpInterceptor.$inject = ["$httpProvider"];
function setUpInterceptor($httpProvider){
  return $httpProvider.interceptors.push("AuthInterceptor");
}

Router.$inject = ["$stateProvider", "$locationProvider", "$urlRouterProvider"];
function Router($stateProvider, $locationProvider, $urlRouterProvider){
  $locationProvider.html5Mode(true);

  $stateProvider
  .state("home", {
    url: "/",
    templateUrl: "/html/home.html",
  })
  .state("register", {
    url: "/register",
    templateUrl: "/html/register.html",
    controller: "registerController",
    controllerAs: "register"
  })
  .state("login", {
    url: "/login",
    templateUrl: "/html/login.html",
    controller: "loginController",
    controllerAs: "login"
  })
  .state("usersIndex", {
    url: "/users",
    templateUrl:  "/html/users/index.html",
    controller:   "usersIndexController",
    controllerAs: "usersIndex"
  });

  $urlRouterProvider.otherwise("/");
}

AuthInterceptor.$inject = ["TokenService"];
function AuthInterceptor(TokenService) {
  return {
    request: function(config){
      var token = TokenService.getToken();
      if (config.url.indexOf("/api") === 0 && token){
        config.headers.Authorization = "Bearer " + token;
      }
      return config;
    },
    response: function(res){
      if (res.config.url.indexOf("/api") === 0 && res.data.token){
        TokenService.setToken(res.data.token);
      }
      return res;
    }
  };
}

TokenService.$inject = ["$window", "jwtHelper"];
function TokenService($window, jwtHelper){
  var self = this;

  self.setToken    = setToken;
  self.getToken    = getToken;
  self.decodeToken = decodeToken;
  self.clearToken  = clearToken;

  function setToken(token){
    return $window.localStorage.setItem("auth-token", token);
  }

  function getToken(){
    return $window.localStorage.getItem("auth-token");
  }

  function clearToken(){
    return $window.localStorage.removeItem("auth-token");
  }

  function decodeToken(){
    var token = self.getToken();
    return token ? jwtHelper.decodeToken(token) : null;
  }

}

CurrentUserService.$inject = ["$rootScope", "TokenService"];
function CurrentUserService($rootScope, TokenService){
  var currentUser = TokenService.decodeToken();
  if (currentUser) {
    currentUser =  currentUser._doc;
  }

  return{
    saveUser: function(user){
      saveUser = user;
      $rootScope.$broadcast("loggedIn");
    },
    getUser: function(){
      return currentUser;
    }, 
    clearUser: function(){
      currentUser = null;
      $rootScope.$broadcast("loggedOut");
      TokenService.clearToken();
    }
  };
}

userFactory.$inject =["$resource"];
function userFactory($resource){
  return $resource("/api/users/:id", {}, {
    'query': { method: "GET", isArray: false },
    'register': {
      url: "/api/register",
      method: "POST"
    },
    'login': {
      url: "/api/login",
      method: "POST"
    }
  });
}

usersIndexCtrl.$inject = ["User"];
function usersIndexCtrl(User){
  var vm     = this;
  User.query(function(data){
    vm.users = data.users;
  });
}

registerCtrl.$inject = ["User", "$state"];
function registerCtrl(User, $state){
  var vm      = this;
  vm.register = function(){
    User.register(vm.user, function(data){
      var user = data.user ? data.user : null;
      if(user) {
        CurrentUserService.saveUser(user);
        $state.go("usersIndex");
      }
    });
  };
}

loginCtrl.$inject = ["$scope", "User", "CurrentUserService", "$state"];
function loginCtrl($scope, User, CurrentUserService, $state){
  var vm   = this;
  vm.login = function(){
   User.login(vm.user, function(data){
    var user = data.user ? data.user : null;
    if(user) {
      // $scope.$parent.main.user = user;
      CurrentUserService.saveUser(user);
      $state.go("usersIndex");
    }
   });
  }
}

mainCtrl.$inject = ["$rootScope", "CurrentUserService", "$state"];
function mainCtrl($rootScope, CurrentUserService, $state){
  var vm  = this;
  vm.user = CurrentUserService.getUser();

  vm.logout = function(){
    CurrentUserService.clearUser();
  };

  $rootScope.$on("loggedIn", function(){
    vm.user = CurrentUserService.getUser();
    $state.go("home");
  });

  $rootScope.$on("loggedOut", function(){
    vm.user = null;
  });
}



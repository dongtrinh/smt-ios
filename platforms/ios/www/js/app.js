// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic','ngCordova'])

.run(function($ionicPlatform,$rootScope) {
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
   $ionicConfigProvider.views.maxCache(0);
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
  })
    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'SignupCtrl'
  })
  .state('my-account', {
		url: '/my-account',
		templateUrl: 'templates/tab-user.html',
		controller: 'MyAccCtrl'
    })
	.state('notify', {
		url: '/notify',
		templateUrl: 'templates/notification.html',
		controller: 'NotifyCtrl'
    })
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:
  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
      }
    }
  })
  .state('tab.tonnagelist', {
    url: '/tonnagelist',
    views: {
      'tab-tonnagelist': {
        templateUrl: 'templates/tab-tonnagelist.html',
        controller: 'TonnagelistCtrl'
      }
    }
  })
   .state('tab.tonnagedetail', {
      url: "/tonnagedetail/:tonnageId",
      views: {
        'tab-tonnagelist': {
          templateUrl: "templates/tab-tonnagedetail.html",
		  controller: 'TonnageDetailCtrl'
        }
      }
    })
	.state('tab.cargolist', {
		url: '/cargolist',
		views: {
		  'tab-cargolist': {
			templateUrl: 'templates/tab-cargolist.html',
			controller: 'CargolistCtrl'
		  }
		}
    })
	.state('tab.cargodetail', {
      url: "/cargodetail/:cargoId",
      views: {
        'tab-cargolist': {
          templateUrl: "templates/tab-cargodetail.html",
		  controller: 'CargoDetailCtrl'
        }
      }
    })
	.state('tab.bunker', {
		url: '/bunker',
		views: {
		  'tab-bunker': {
			templateUrl: 'templates/tab-bunker.html',
			controller: 'BunkerCtrl'
		  }
		}
    })
	.state('tab.vessel', {
		url: '/vessel',
		views: {
		  'tab-vessel': {
			templateUrl: 'templates/tab-vessel.html',
			controller: 'VesselCtrl'
		  }
		}
    })
	
   

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

})
.controller('NavCtrl', function($scope, $ionicSideMenuDelegate, $state) {
  $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.showRightMenu = function () {
    $ionicSideMenuDelegate.toggleRight();
  };
})
.controller('NavRightMenu', function($scope,$state,$ionicHistory) {
  $scope.logout = function () {
	localStorage.removeItem("loginId");
	window.location.replace("#/login");
  };	
})	
.config(['$ionicConfigProvider', function($ionicConfigProvider) {

$ionicConfigProvider.tabs.position('bottom'); //other values: top

}]);

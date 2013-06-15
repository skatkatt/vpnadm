'use strict';

angular.module('vpnadm',['ui.bootstrap']).
	
	config(['$routeProvider',function($routeProvider) {
		$routeProvider.
			when('/login',	{ templateUrl: 'partials/login.html', 	controller: LoginCtrl }).
			when('/home',	{ templateUrl: 'partials/home.html', 	controller: MainCtrl }).
		    //when('/settings',{ 		templateUrl: 'partials/settings', 	controller: SettingsCtrl }).
			otherwise( { redirectTo: '/login' } );
	}]).
	
	factory('login', function ($rootScope,$location) {
		$rootScope.login = {};

		var users = [
			{
				name 		: 'skatkatt',
				password	: 'naab',
				level		: 'admin',
			},
			{
				name		: 'bodji',
				password	: 'naab',
				level		: 'noob',
			}
		];
		
		$rootScope.login.do = function(login,password){
			$.each(users, function(i,user){
				if ( user.name == login && user.password == password )
				{
					console.log("User " + user.name + " logged in");
					$rootScope.login.user = user;
					$location.path('home');
					return false;
				}
			});
		}

		$rootScope.login.verify = function(){
			if( ! $rootScope.login.user )
			{
				$location.path('login');
			}
		}
		
		return $rootScope.login;
});

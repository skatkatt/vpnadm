'use strict';

angular.module('api', ['ngResource']).
	factory('Auth', function($resource){
		return $resource('/login',{}, {
			do: { 
				method: 'POST',
			}
		});
	}).
    factory('Users', function($resource){
  		return $resource('/api/users/:userId', {}, {
    		query: {
				method:  'GET',
				isArray: true
			}
  		});
	});

angular.module('vpnadm',['ui.bootstrap','api']).
	
	config(['$routeProvider',function($routeProvider) {
		$routeProvider.
			when('/login',	{ templateUrl: 'partials/login.html', 	controller: LoginCtrl }).
			when('/home',	{ templateUrl: 'partials/home.html', 	controller: MainCtrl }).
		    //when('/settings',{ 		templateUrl: 'partials/settings', 	controller: SettingsCtrl }).
			otherwise( { redirectTo: '/login' } );
	}]).

	factory('login', function ($rootScope,$location,Auth) {
		$rootScope.login = {};
		
		$rootScope.login.do = function(login,password){
			Auth.do({username:login,password:password},function(res,headers){
				console.log(res);
				if ( res && res.user )
				{
					$rootScope.login.user = res.user;
				}	
				$location.path('home');
			},function(res){
				//nasty trick
				$location.path('home');
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

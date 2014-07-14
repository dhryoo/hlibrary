'use strict';

/**
 * @ngdoc overview
 * @name hl4App
 * @description
 * # hl4App
 *
 * Main module of the application.
 */
angular
  .module('hl4App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/book', {
        templateUrl: 'views/book.html',
        controller: 'BookCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
   .constant('AUTH_EVENTS',{
       loginSuccess:'auth-login-success',
       loginFailed:'auth-login-failed',
       logoutSuccess:'auth-login-success',
       sessionTimeout:'auth-session-timeout',
       notAuthenticated:'auth-not-authenticated',
       notAuthorized:'auth-not-authorized'
   })
   .constant('USER_ROLES', {
       all: '*',
       admin: 'admin',
       editor: 'editor',
       guest: 'guest'
   })
    .run(function ($rootScope, AUTH_EVENTS, AuthService) {
        $rootScope.$on('$stateChangeStart', function (event, next) {
            console.log('state chage start');
            var authorizedRoles = next.data.authorizedRoles;
            if (!AuthService.isAuthorized(authorizedRoles)) {
                event.preventDefault();
                if (AuthService.isAuthenticated()) {
                    // user is not allowed
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                } else {
                    // user is not logged in
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                }
            }
        });
        $rootScope.$on(AUTH_EVENTS.loginSuccess, function (event,menu) {
            console.log('in event success');
            $rootScope.$broadcast(AUTH_EVENTS.Authorization);
        });

        $rootScope.$on(AUTH_EVENTS.loginFailed, function (event,menu) {
            console.log('in event fail');
            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        });
    })
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push([
            '$injector',
            function ($injector) {
                return $injector.get('AuthInterceptor');
            }
        ]);
    })
    .factory('AuthInterceptor', function ($rootScope, $q,AUTH_EVENTS) {
        return {
            responseError: function (response) {
                $rootScope.$broadcast({
                    401: AUTH_EVENTS.notAuthenticated,
                    403: AUTH_EVENTS.notAuthorized,
                    419: AUTH_EVENTS.sessionTimeout,
                    440: AUTH_EVENTS.sessionTimeout
                }[response.status], response);
                return $q.reject(response);
            }
        };
    })
;

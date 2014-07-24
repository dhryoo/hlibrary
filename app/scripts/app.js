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
    'ui.bootstrap',
    'dialogs.main',
    'pascalprecht.translate'

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
      .when('/profile/:author_name/:post_id', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })
      .when('/book', {
        templateUrl: 'views/book.html',
        controller: 'BookCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
    .config(['dialogsProvider','$translateProvider',function(dialogsProvider,$translateProvider){
        dialogsProvider.useBackdrop('static');
        dialogsProvider.useEscClose(false);
        dialogsProvider.useCopy(false);
        dialogsProvider.setSize('sm');

        $translateProvider.translations('es',{
            DIALOGS_ERROR: "Error",
            DIALOGS_ERROR_MSG: "Se ha producido un error desconocido.",
            DIALOGS_CLOSE: "Cerca",
            DIALOGS_PLEASE_WAIT: "Espere por favor",
            DIALOGS_PLEASE_WAIT_ELIPS: "Espere por favor...",
            DIALOGS_PLEASE_WAIT_MSG: "Esperando en la operacion para completar.",
            DIALOGS_PERCENT_COMPLETE: "% Completado",
            DIALOGS_NOTIFICATION: "Notificacion",
            DIALOGS_NOTIFICATION_MSG: "Notificacion de aplicacion Desconocido.",
            DIALOGS_CONFIRMATION: "Confirmacion",
            DIALOGS_CONFIRMATION_MSG: "Se requiere confirmacion.",
            DIALOGS_OK: "Bueno",
            DIALOGS_YES: "Si",
            DIALOGS_NO: "No"
        });

        $translateProvider.preferredLanguage('en-US');
    }])

    /*
    .config(function (ezfbProvider) {
        ezfbProvider.setLocale('ko_KR');
    })
    .config(function (ezfbProvider) {
        ezfbProvider.setInitParams({
            // This is my FB app id for plunker demo app
            appId: '512046832258790',

            // Module default is `v1.0`.
            // If you want to use Facebook platform `v2.0`, you'll have to add the following parameter.
            // https://developers.facebook.com/docs/javascript/reference/FB.init/v2.0
            version: 'v2.0'
        });
    });
    */
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

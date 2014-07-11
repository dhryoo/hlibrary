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
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/book', {
        templateUrl: 'views/book.html',
        controller: 'BookCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

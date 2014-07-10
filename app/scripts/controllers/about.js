'use strict';

/**
 * @ngdoc function
 * @name hl4App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the hl4App
 */
angular.module('hl4App')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

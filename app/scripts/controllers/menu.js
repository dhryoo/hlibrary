'use strict';

/**
 * @ngdoc function
 * @name hl4App.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the hl4App
 */
angular.module('hl4App')
  .controller('MenuCtrl', function ($scope) {
    $scope.menuIndex = 1;
    $scope.setMenuIndex = function (selectedIndex) {
        console.log("called");
        $scope.menuIndex = selectedIndex;
    };
    $scope.isSelected = function (index) {

        return $scope.menuIndex == index;
    }

  });

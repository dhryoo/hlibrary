'use strict';

/**
 * @ngdoc function
 * @name hl4App.controller:ApplicationCtrl
 * @description
 * # ApplicationCtrl
 * Controller of the hl4App
 */
angular.module('hl4App')
  .controller('ApplicationCtrl', function ($scope,USER_ROLES,AuthService) {
        $scope.currentUser = null;
        $scope.userRoles = USER_ROLES;
        $scope.isAuthorized = AuthService.isAuthorized;


        $scope.setCurrentUser = function (user) {
            $scope.currentUser = user;
        }

  });

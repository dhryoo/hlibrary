'use strict';

/**
 * @ngdoc function
 * @name hl4App.controller:NoticeinfoCtrl
 * @description
 * # NoticeinfoCtrl
 * Controller of the hl4App
 */
angular.module('hl4App')
  .controller('NoticeinfoCtrl', ['$scope','$modalInstance','data',function ($scope,$modalInstance,data) {
        $scope.notice = data;

        $scope.close = function () {
            $modalInstance.close();
        };

  }]);

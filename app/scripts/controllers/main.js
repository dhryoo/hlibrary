'use strict';

/**
 * @ngdoc function
 * @name hl4App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hl4App
 */
angular.module('hl4App')
  .controller('MainCtrl', function ($scope,postData) {

        $scope.posts = [];



        postData.teacherListJSON().then(function (result) {
            $scope.posts = result.data.posts;
            console.log($scope.posts);
        })
  });

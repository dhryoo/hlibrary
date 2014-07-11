'use strict';

/**
 * @ngdoc function
 * @name hl4App.controller:BookCtrl
 * @description
 * # BookCtrl
 * Controller of the hl4App
 */
angular.module('hl4App')
  .controller('BookCtrl', ['$scope','postData','$window',function ($scope,postData,$window) {
    $scope.posts = [];
    //$scope.$window = $window;
    $scope.open_book = function (url) {
        $window.open(url,'galleryWindowSample', 'width=1200,height=700,menubar=no,toolbar=no,location=no,scrollbars=yes');
    }

    postData.bookListJSON().then(function (result) {
        $scope.posts = result.data.posts;
        console.log($scope.posts);
    });
  }]);

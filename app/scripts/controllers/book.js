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


        /**
         * book array variable
         * @type {Array}
         */
        $scope.posts = [];

        /**
         * 인자로 받은 url을 window open을 이용해서 새로운 창으로 띄운다.
         * @param url
         */
        $scope.open_book = function (url) {
            $window.open(url,'galleryWindowSample', 'width=1200,height=700,menubar=no,toolbar=no,location=no,scrollbars=yes');
        }

        /**
         * 책정보를 postData 를 이용해서 가져와서 변수에 저장한다.
         */
        postData.bookListJSON().then(function (result) {
            $scope.posts = result.data.posts;
            console.log($scope.posts);
        });


  }]);

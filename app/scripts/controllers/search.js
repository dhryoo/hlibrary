'use strict';

/**
 * @ngdoc function
 * @name hl4App.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the hl4App
 */
angular.module('hl4App')
  .controller('SearchCtrl',['$scope','$location','$routeParams','postData', function ($scope,$location,$routeParams,postData) {



        $scope.keyword = {};
        $scope.posts = [];


        /**
         * 최초 페이지 로딩시에만 호출되는 페이지
         */
        $scope.init = function () {
            $scope.keyword.one = ($location.search()).keyword;
            $scope.search_result();
        };


        /**
         * 검색 명령을 받으면 호출 되는 함수
         */
        $scope.$on('menu_search', function (event, search_keyword) {
            $scope.keyword.one = search_keyword;
            $scope.search_result();
        });


        /**
         * postData 를 이용해서 검색 결과를 읽어온다.
         */
        $scope.search_result = function () {

            var search_keyword = $scope.keyword.one;
            console.log(search_keyword);

            postData.getSearchResult(search_keyword).then(function (result) {
                $scope.posts = result.data.posts;
                $scope.keyword.one = '';
            });
        };


        $scope.init();

  }]);

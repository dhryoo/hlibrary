'use strict';

/**
 * @ngdoc function
 * @name hl4App.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the hl4App
 */
angular.module('hl4App')
  .controller('ProfileCtrl',['$scope','postData','$window','$routeParams', function ($scope,postData,$window,$routeParams) {




        $scope.author_name ="";
        $scope.post_id ="";

        $scope.books = [];
        $scope.teacher = {};
        $scope.schedules = [];
        $scope.author_id = 9;
        $scope.teacher_can_day = [];
        $scope.teacher_region = [];

        $scope.open_book = function (url) {
            $window.open(url,'galleryWindowSample', 'width=1200,height=700,menubar=no,toolbar=no,location=no,scrollbars=yes');

        };
        $scope.go_counsil = function () {
        };
        $scope.close = function () {
           // $modalInstance.close();

        }


        var init = function () {

            $scope.author_name = $routeParams.author_name;
            $scope.post_id = $routeParams.post_id;


            postData.getTeacherInfo($scope.post_id).then(function (result) {
                $scope.teacher = result.data.post;

                console.log(result.data.post);
                var can_day_temp = result.data.post.custom_fields.teacher_can_day[0];
                var region_temp = result.data.post.custom_fields.teacher_region[0];
                //var can_day = can_day_temp..replace(/[^"]+;[^"]+/g, '').replace(/^"*|"*$/g, '').split('""');
                var can_day = can_day_temp.replace(/[^"]+:|;[^"]+/g, '').replace(/^"*|"*$/g, '').split('""');
                var region = region_temp.replace(/[^"]+:|;[^"]+/g, '').replace(/^"*|"*$/g, '').split('""');
                $scope.can_day = can_day;
                $scope.teacher_region =region ;


               // $scope.teacher_can_day = JSON.parse(result.data.post.custom_fields.teacher_can_day);
            });

            postData.getTeacherBook($scope.author_name).then(function (result) {
                $scope.books = result.data.posts;
            });
            postData.getTeacherSchedule($scope.author_name).then(function (result) {
                console.log(result.data.posts);
                $scope.schedules = result.data.posts;
            });
            /*
            postData.getTest().then(function (result) {
                console.log(result);
            });
            */




        };

        init();





        $scope.applyInfo = function () {
            console.log('aa')

        }


  }]);

'use strict';

/**
 * @ngdoc function
 * @name hl4App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hl4App
 */
angular.module('hl4App')
  .controller('MainCtrl',['$rootScope','$scope','postData','dialogs',
        function ($rootScope,$scope,postData,$dialogs) {


        $scope.posts = [];
        $scope.teacher_info = {};

        var modalInstance = null;

        postData.teacherListJSON().then(function (result) {

            $scope.posts = result.data.posts;

            shuffleArray($scope.posts);
        });


        $scope.showProfile = function (teacher_id,teacher_post_id) {
            $scope.teacher_info.teacher_id = teacher_id;
            $scope.teacher_info.teacher_post_id = teacher_post_id;

            //var modalInstance = $dialogs.create('views/profile.html','ProfileCtrl',$scope.teacher_info,{size:'lg',keyboard: true,backdrop: false,windowClass: 'profile-dialog'});
            modalInstance = $dialogs.create('views/profile.html','ProfileCtrl',$scope.teacher_info,{size:'lg',keyboard: true,backdrop: false,windowClass: 'profile-dialog'});
            //$scope.launch('profile');
        }


        var shuffleArray = function(array) {
            var m = array.length, t, i;

            // While there remain elements to shuffle
            while (m) {
                // Pick a remaining element…
                i = Math.floor(Math.random() * m--);

                // And swap it with the current element.
                t = array[m];
                array[m] = array[i];
                array[i] = t;
            }

            return array;
        }



  }]);

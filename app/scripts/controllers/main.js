'use strict';

/**
 * @ngdoc function
 * @name hl4App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hl4App
 */
angular.module('hl4App')
  .controller('MainCtrl',['$rootScope','$scope','postData','dialogs', function ($rootScope,$scope,postData,$dialogs) {


        /**
         * 교사 목록 정보를 저장할 변수
         * @type {Array}
         */
        $scope.posts = [];

        /**
         * 선택된 교사 상세 정보를저장한 변수
         */
        $scope.teacher_info = {};

        var modalInstance = null;

        /**
         * 교사 정보를 읽어온 후 shuffle 을 한다.
         */
        postData.teacherListJSON().then(function (result) {


            console.log(result);
            $scope.posts = result.data.posts;

            shuffleArray($scope.posts);
        });


        /**
         * 상세 정보를 클릭하면 교사정보를  ProfileCtrl이 알수 있도록  teacher_info 변수에 넣은후상세 정보 dialog를 띄운다.
         * @param teacher_id 교사 id
         * @param teacher_post_id  교
         */
        $scope.showProfile = function (teacher_id,teacher_post_id) {
            $scope.teacher_info.teacher_id = teacher_id;
            $scope.teacher_info.teacher_post_id = teacher_post_id;

            //var modalInstance = $dialogs.create('views/profile.html','ProfileCtrl',$scope.teacher_info,{size:'lg',keyboard: true,backdrop: false,windowClass: 'profile-dialog'});
            modalInstance = $dialogs.create('views/profile.html','ProfileCtrl',$scope.teacher_info,{size:'lg',keyboard: true,backdrop: false,windowClass: 'profile-dialog'});
            //$scope.launch('profile');
        }


        /**
         * 교사 정보를 매번 다른 순서로 나오게 하기 위해 처음에 섞는다
         * @param array
         * @returns {*}
         */
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

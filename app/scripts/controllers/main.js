'use strict';

/**
 * @ngdoc function
 * @name hl4App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hl4App
 */
angular.module('hl4App')
  .controller('MainCtrl',['$rootScope','$scope','postData',function ($rootScope,$scope,postData) {

        $scope.posts = [];
        postData.teacherListJSON().then(function (result) {
            $scope.posts = result.data.posts;
            console.log($scope.posts);
        });



        /*
        function getTeacher(teacherID)
        {
           for(teacher in $scope.posts)
           {
               if(teacher.id ==teacherID )
               {
                   return teacher;
               }

           }
        }
        */



        $scope.showDetail = function (id) {
//            var teacher = getTeacher(id);
 //           console.log(teacher);
           $rootScope.$emit('openDetail','aa');
        }



  }]);

'use strict';

/**
 * @ngdoc function
 * @name hl4App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hl4App
 */
angular.module('hl4App')
  .controller('MainCtrl',['$rootScope','$scope','postData','ModalService',function ($rootScope,$scope,postData,ModalService) {

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
          // $rootScope.$emit('openDetail','aa');
           ModalService.showModal();
            /*
            var custName = "aabb";
            var modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Delete Customer',
                headerText: 'Delete ' + custName + '?',
                bodyText: 'Are you sure you want to delete this customer?'
            };

            DialogService.showModal({}, modalOptions).then(function (result) {
            });
            */
        }



  }]);

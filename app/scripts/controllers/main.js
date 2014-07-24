'use strict';

/**
 * @ngdoc function
 * @name hl4App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hl4App
 */
angular.module('hl4App')
  .controller('MainCtrl',['$rootScope','$scope','postData','ModalService','ProfileService','$translate','dialogs',
        function ($rootScope,$scope,postData,ModalService,ProfileService,$translate,dialogs) {


        $scope.posts = [];
        $scope.teacher_info = {};

        postData.teacherListJSON().then(function (result) {

            $scope.posts = result.data.posts;

            shuffleArray($scope.posts);
        });


        $scope.showProfile = function (teacher_id,teacher_post_id) {
            $scope.teacher_info.teacher_id = teacher_id;
            $scope.teacher_info.teacher_post_id = teacher_post_id;
            $scope.launch('profile');
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


        var _progress = 33;



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
           ProfileService.showModal();
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
        };
        $scope.launch = function(which){
            switch(which){
                case 'error':
                    dialogs.error();
                    break;
                case 'wait':
                    var dlg = dialogs.wait(undefined,undefined,_progress);
                    _fakeWaitProgress();
                    break;
                case 'notify':
                    dialogs.notify();
                    break;
                case 'login':
                    var dlg = dialogs.create('views/login.html','LoginCtrl',$scope.custom,{size:''});
                    break;

                case 'profile':
                    var dlg = dialogs.create('views/profile.html','ProfileCtrl',$scope.teacher_info,{size:'lg',keyboard: true,backdrop: false,windowClass: 'profile-dialog'});
                    /*
                    dlg.result.then(function(name){
                        $scope.name = name;
                    },function(){
                        if(angular.equals($scope.name,''))
                            $scope.name = 'You did not enter in your name!';
                    });
                    */
                    break;

                case 'confirm':
                    var dlg = dialogs.confirm();
                    dlg.result.then(function(btn){
                        $scope.confirmed = 'You confirmed "Yes."';
                    },function(btn){
                        $scope.confirmed = 'You confirmed "No."';
                    });
                    break;
                case 'custom':
                    var dlg = dialogs.create('/dialogs/custom.html','customDialogCtrl',{},{size:'lg',keyboard: true,backdrop: false,windowClass: 'my-class'});
                    dlg.result.then(function(name){
                        $scope.name = name;
                    },function(){
                        if(angular.equals($scope.name,''))
                            $scope.name = 'You did not enter in your name!';
                    });
                    break;
                case 'custom2':
                    var dlg = dialogs.create('/dialogs/custom2.html','customDialogCtrl2',$scope.custom,{size:'lg'});
                    break;
            }
        }; // end launch

        var _fakeWaitProgress = function(){
            $timeout(function(){
                if(_progress < 100){
                    _progress += 33;
                    $rootScope.$broadcast('dialogs.wait.progress',{'progress' : _progress});
                    _fakeWaitProgress();
                }else{
                    $rootScope.$broadcast('dialogs.wait.complete');
                }
            },1000);
        };



  }]);

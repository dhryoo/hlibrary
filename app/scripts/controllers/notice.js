'use strict';

/**
 * @ngdoc function
 * @name hl4App.controller:NoticeCtrl
 * @description
 * # NoticeCtrl
 * Controller of the hl4App
 */
angular.module('hl4App')
  .controller('NoticeCtrl', ['$scope','postData','dialogs',function ($scope,postData,$dialogs) {

    $scope.notice = {};
    $scope.noticeInfo = {};
    $scope.post_id = "";


    var modalInstance = null;


    $scope.openNotice = function () {
        var modalInstance= $dialogs.create('views/notice-info.html','NoticeinfoCtrl',$scope.notice,{size:'lg',keyboard: true,backdrop: false,windowClass: 'profile-dialog'});
    };






    var init = function () {
        postData.getNotice().then(function (result) {
            $scope.notice = result.data.posts[0];
        });
    };
    init();
  }]);

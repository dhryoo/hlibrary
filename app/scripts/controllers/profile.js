'use strict';

/**
 * @ngdoc function
 * @name hl4App.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the hl4App
 */


angular.module('hl4App')
  .controller('ProfileCtrl',['$rootScope','$scope','$modal','$log', function ($rootScope,$scope,$modal,$log) {
        $scope.items = ['item1', 'item2', 'item3'];

        $scope.openDetail = function (size) {
            var modalInstance = $modal.open({
                templateUrl: '../views/profile.html',
                controller: ModalInstanceCtrl,
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };


        /*
        $rootScope.$on('openDetail', function(event, args) {
            $scope.open();
        });
        */

        $rootScope.$on('openDetail', function(event, args) {
            $scope.openDetail();
        });
  }]);




var ModalInstanceCtrl = function ($scope, $modalInstance, items) {

    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};

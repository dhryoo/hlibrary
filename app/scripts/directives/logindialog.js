'use strict';

/**
 * @ngdoc directive
 * @name hl4App.directive:loginDialog
 * @description
 * # loginDialog
 */
angular.module('hl4App')
  .directive('loginDialog', function (AUTH_EVENTS) {
    return {
        restrict: 'A',
        template: '<div ng-if="visible" ng-include="../view/login.html">',
        link: function (scope) {
            var showDialog = function () {
                scope.visible = true;
            };

            scope.visible = false;
            scope.$on(AUTH_EVENTS.notAuthenticated, showDialog);
            scope.$on(AUTH_EVENTS.sessionTimeout, showDialog)
        }
    };
});

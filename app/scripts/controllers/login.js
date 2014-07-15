'use strict';

/**
 * @ngdoc function
 * @name hl4App.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the hl4App
 */
angular.module('hl4App')
  .controller('LoginCtrl', ['$scope','$rootScope','AUTH_EVENTS','AuthService','Session',function ($scope,$rootScope,AUTH_EVENTS,AuthService,Session) {
        $scope.credentials = {
            username:'',
            password:''
        };
        $scope.message = '';

        $scope.login = function ()
        {

            var getNonce = function () {

                return AuthService
                    .getAuthNonce()
                    .then(function (result) {
                       //$scope.credentials.nonce = result.data.nonce;
                       return result.data.nonce;
                    });
            };

            var loginProcess = function (nonce) {
                $scope.credentials.nonce = nonce;

                return AuthService
                    .authLogin($scope.credentials)
                    .then(function (result) {
                        if(result.data.status == 'error')
                        {
                            $scope.message = result.data.error;
                        }
                        else
                        {
                            Session.create(result.data.id,result.data.username,result.data.cookie,'editor');
                        }

                        return result.data;
                    })
            };


            var broadCastLogin = function (user) {
                console.log('in broadCastLogin');
                if(user.status =='error')
                {
                    console.log(' in error');
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                }
                else
                {
                    console.log(' in success');
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    $scope.setCurrentUser(user);

                }
            }

            getNonce().then(loginProcess).then(broadCastLogin);

           // AuthService.login(credentials);

            /*
            postData.getAuthNonce().then(function (result)
            {
                var data = result.data;
                if(data.status !== "ok")
                {
                    console.log('get nonce failedd');
                    return;
                }

                credentials.nonce = data.nonce;
                console.log(credentials);



            });
            */

        };

        $scope.selected = {
   //         item: $scope.items[0]
        };

        $scope.ok = function () {
            $modalInstance.close($scope.selected.item);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };



  }]);

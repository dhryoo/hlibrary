'use strict';

/**
 * @ngdoc function
 * @name hl4App.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the hl4App
 */
angular.module('hl4App')
  .controller('LoginCtrl', function ($scope,$rootScope,AUTH_EVENTS,AuthService,Session) {
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
                            console.log(result.data);

                            Session.create(result.data.id,result.data.username,result.data.cookie,'editor');


                            return result.data;
                            /*
                            $scope.message = 'ok';
                            Session.create(result.data.id,res.user_id,res.user.role);
                            return res.user;
                            */

                        }
                    })
            };


            var broadCastLogin = function () {

            }

            getNonce().then(loginProcess);

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
  });

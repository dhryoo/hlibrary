'use strict';

/**
 * @ngdoc function
 * @name hl4App.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the hl4App
 */
angular.module('hl4App').controller('LoginCtrl', ['$scope', '$rootScope', 'AUTH_EVENTS', 'AuthService', 'Session', '$modalInstance',
    function ($scope, $rootScope, AUTH_EVENTS, AuthService, Session, $modalInstance) {
        /**
         *  login.html 에서 사용되는 로그인 정보를 저장한 변수
         */
        $scope.credentials =
        {
            username: '',
            password: ''
        };
        $scope.message = '';


        /**
         * called when close button clikced
         */
        $scope.close = function () {
            $modalInstance.close();
        };

        /**
         * 로그인 처리 함수
         * 처음에는 nonce 를얻고 noce 를 가지고 login 시도를 한다.
         * 로그인 성공시 broadcast를 통해 로그인 여부를 전체 app에 알린다.
         */
        $scope.login = function () {
            /**
             * get nonce for login
             */
            var getNonce = function () {
                return AuthService
                    .getAuthNonce()
                    .then(function (result) {
                        return result.data.nonce;
                    });
            };

            /**
             * login process with nonce
             * @param nonce
             * @returns {*}
             */
            var loginProcess = function (nonce) {
                $scope.credentials.nonce = nonce;
                return AuthService
                    .authLogin($scope.credentials)
                    .then(function (result) {
                        console.log(result);
                        if (result.data.status == 'error') {
                            $scope.message = result.data.error;
                        }
                        else {
                            Session.create(result.data.id, result.data.username, result.data.cookie, 'editor');
                        }

                        return result.data;
                    })
            };


            /**
             * set user info and broadcast authroized news all the application.
             * @param user
             */
            var broadCastLogin = function (user) {
                console.log('in broadCastLogin');
                console.log(user.status);
                if (user.status == 'error') //로그인 실패
                {
                    console.log(' in error');
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                }
                else //로그인 성공
                {
                    console.log(' in success');
                    AuthService.setCurrentUser(user);
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    $modalInstance.close();
                }
            };

            getNonce().then(loginProcess).then(broadCastLogin);

        };

        /**
         * close dialog
         */
        $scope.ok = function () {
            $modalInstance.close();
        };

        /**
         * dismiss login dialog
         */
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        /**
         * 회웝가입 버튼을 누르면 AuthService에서 이벤트를 발생하도록 하고 dialog 는 닫는다.
         */
        $scope.goRegist = function () {
            AuthService.sendRegisterMessage();
            $modalInstance.dismiss('cancel');
        };


        /*
         $scope.$on(AUTH_EVENTS.Authorization, function (event,data) {
         console.log('receive login');
         });
         */


    }]);

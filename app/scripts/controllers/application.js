'use strict';

/**
 * @ngdoc function
 * @name hl4App.controller:ApplicationCtrl
 * @description
 * # ApplicationCtrl
 * Controller of the hl4App
 * 메뉴쪽 관련해서 관련 있는 Controller
 */
angular.module('hl4App')
    .controller('ApplicationCtrl', ['$rootScope', '$scope', 'USER_ROLES', 'AuthService', '$state', 'dialogs', 'AUTH_EVENTS', 'postData', '$location'
        , function ($rootScope, $scope, USER_ROLES, AuthService, $state, $dialogs, AUTH_EVENTS, postData, $location) {
            $scope.currentUser = null;
            $scope.userRoles = USER_ROLES;
            //$scope.isAuthorized = AuthService.isAuthorized;
            $scope.isAuthorized = false;

            //이곳에서 $state 를 넘겨주어야 제대로 메뉴에서 $state 체크를 할수 있다.
            $scope.$state = $state;


            $scope.keywords = {search: ''};

            var modalInstance = null;


            /**
             * show login Dialog Form
             */
            $scope.showLogin = function () {
                console.log('ok login');
                modalInstance = $dialogs.create('views/login.html', 'LoginCtrl', $scope, {size: 'lg', keyboard: true, backdrop: false });
            };


            /**
             * 사용자 정보를 scope 네에 저장한다.
             * @param user
             */
            $scope.setCurrentUser = function (user) {
                console.log('in setCurrentUser');
                console.log(user);
                $scope.currentUser = user;
                console.log('user');
            }

            /**
             * 로그아웃 버튼을 클릭하면 호출 된다. 사용자 정보를 삭제한다.
             */
            $scope.logOut = function () {
                $scope.currentUser = null;
                $scope.userRoles = null;
                $scope.isAuthorized = false;
                AuthService.logout();
            };

            /**
             * 로그인 성공시 호출된다.
             */
            $scope.$on(AUTH_EVENTS.loginSuccess, function (event, menu) {
                console.log('로그온 신호 감지');
                $scope.isAuthorized = true;
                //$rootScope.$broadcast(AUTH_EVENTS.Authorization);
            });


            /**
             * 로그인 성공시 호출되나 현재는 안쓴다.
             */
            $scope.$on(AUTH_EVENTS.Authorization, function (event, data) {
//            $scope.isAuthorized = AuthService.isAuthorized;
//            console.log('Authorization 로그온 신호 감지');
                //$scope.isAuthorized = true;
            });

            $scope.$on(AUTH_EVENTS.logoutSuccess, function (event, data) {
                console.log('로그 아웃 신호 감지 2');
                $scope.isAuthorized = false;
            });

            /**
             * 로그아웃시 호출된다. isAuthorized 변수를 무효화 시킨다.
             */
            $scope.$on(AUTH_EVENTS.notAuthenticated, function (event, data) {
                console.log('로그 아웃 신호 감지 1');
                $scope.isAuthorized = false;
            });

            /**
             * 회원가입 페이지 event가 발생을 하면 이곳에서 응답해 준다.
             */
            $scope.$on('go_regist', function (event, data) {
                console.log('회웝가입 신호 감지');
                $location.path('register');
            });


            /**
             * 상단 검색 버튼 눌었을때 처리 함수
             */


            $scope.submit = function () {
                console.log($state.current.name);
                if ($state.current.name == 'search') {
                    console.log('im in search mode');
                    var search_keyword = $scope.keywords.search;
                    $rootScope.$broadcast('menu_search', search_keyword);
                }
                else {
                    var search_keyword = $scope.keywords.search;
                    $location.path('search').search({keyword: search_keyword});
                    $rootScope.$broadcast('menu_search', search_keyword);
                }


            };


        }]);

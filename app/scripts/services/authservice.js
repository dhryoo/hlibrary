'use strict';

/**
 * @ngdoc service
 * @name hl4App.AuthService
 * @description
 * # AuthService
 * Factory in the hl4App.
 * Auth를 위한 factory
 *  로그인 시 아래와 같은 방법으로 처리를 한다.
 *  http://www.hlibrary.kr/press/?json=core.get_nonce&controller=posts&method=create_post
 *  http://www.hlibrary.kr/press/?json=auth.get_nonce&controller=posts&method=generate_auth
 *  http://www.hlibrary.kr/press/api/get_nonce/?controller=auth&method=generate_auth_cookie
 *  http://www.hlibrary.kr/press/api/auth/generate_auth_cookie/?nonce=f4320f4a67&username=Catherine&password=password-here
 *  http://www.hlibrary.kr/press/api/auth/generate_auth_cookie/?nonce=ccd2ae96c3&username=dhryoo&password=ryoo2000
 */
angular.module('hl4App')
  .factory('AuthService',['$http','Session','$rootScope','AUTH_EVENTS', function ($http,Session,$rootScope,AUTH_EVENTS) {
    // Service logic/FIL

        /**
         * 접속된 사용자 정보를 저장하기 위한 변수
         */
        var currentUser = null;

        var baseURL = "http://www.hlibrary.kr/press/api/";

        var authService = {};


        /**
         * 인자로 넘어온 사용자 정보를 저장한다
         * @param user
         */
        authService.setCurrentUser = function (user) {
            currentUser = user;
        };


        /**
         * 로그아웃시 호출되는데 아마도 안쓸거 같고 나중에 지우기 바란다.
         */
        authService.logout = function () {
            currentUser = null;
        }

        /**
         * 사용자 정보를 기반으로 Wordpress 서버쪽에 로그인 처리를 요청한다
         * @param credentials
         * @returns {HttpPromise}
         */
        authService.authLogin = function (credentials)
        {
            var loginURL = 'http://www.hlibrary.kr/press/api/auth/generate_auth_cookie/?callback=JSON_CALLBACK&nonce='+credentials.nonce+'&username='+credentials.username+'&password='+credentials.password;
            return $http.jsonp(loginURL);
        };


        /**
         * nonce를 얻는 함수
         * @returns {HttpPromise}
         */
        authService.getAuthNonce = function () {
            var newURL = 'http://www.hlibrary.kr/press/api/get_nonce/?controller=auth&method=generate_auth_cookie&callback=JSON_CALLBACK';
            return $http.jsonp(newURL);
        };


        /**
         * 예제에는 이렇게 사용하는 방법이 나왔으나 좀 이해가 안되니 사용한하면 지우기 바람
         * @returns {boolean}
         */
        authService.isAuthenticated = function () {
            return !!Session.username;
        };


        /**
         * check user's validataion
         * @param authorizedRoles
         * @returns {boolean}
         *  원본은 이렇게 생겼다//authService.isAuthorized = function (authorizedRoles) {
         */
        authService.isAuthorized = function () {
            return authService.isAuthenticated();
        };


        /**
         * call when logout button clicked
         */
        authService.logout = function () {
            Session.destory();
            $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
        };

        return authService;
  }]);

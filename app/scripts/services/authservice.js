'use strict';

/**
 * @ngdoc service
 * @name hl4App.AuthService
 * @description
 * # AuthService
 * Factory in the hl4App.
 */
angular.module('hl4App')
  .factory('AuthService', function ($http,Session) {
    // Service logic/FIL
    // ...
    //get nonce
    //http://www.hlibrary.kr/press/?json=core.get_nonce&controller=posts&method=create_post
    //http://www.hlibrary.kr/press/?json=auth.get_nonce&controller=posts&method=generate_auth
    //http://www.hlibrary.kr/press/api/get_nonce/?controller=auth&method=generate_auth_cookie
    //http://www.hlibrary.kr/press/api/auth/generate_auth_cookie/?nonce=f4320f4a67&username=Catherine&password=password-here
    //http://www.hlibrary.kr/press/api/auth/generate_auth_cookie/?nonce=ccd2ae96c3&username=dhryoo&password=ryoo2000


        //$http.jsonp(newURL).success(function (result) {

    var baseURL = "http://www.hlibrary.kr/press/api/";

    var authService = {};
    authService.authLogin = function (credentials)
    {
        var loginURL = 'http://www.hlibrary.kr/press/api/auth/generate_auth_cookie/?callback=JSON_CALLBACK&nonce='+credentials.nonce+'&username='+credentials.username+'&password='+credentials.password;
        return $http.jsonp(loginURL);


        /*
        return $http
            .post('/login',credentials)
            .then(function (res) {
                Session.create(res.id,res.user_id,res.user.role);
                return res.user;

            });
            */
    };


    authService.getAuthNonce = function () {
        var newURL = 'http://www.hlibrary.kr/press/api/get_nonce/?controller=auth&method=generate_auth_cookie&callback=JSON_CALLBACK';
        return $http.jsonp(newURL);
    }
    authService.isAuthenticated = function () {


        console.log('in is Authenitcated');
        console.log(Session);

        return !!Session.username;
    };
    authService.isAuthorized = function (authorizedRoles) {

        console.log('in is isAuthorized');
        console.log(authorizedRoles);
        if(!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
        }

        return (authService.isAuthenticated() && authorizedRoles.indexOf(Session.userRole) !== -1);
    };

    return authService;







  });

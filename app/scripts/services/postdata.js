'use strict';

/**
 * @ngdoc service
 * @name hl4App.postData
 * @description
 * # postData
 * Factory in the hl4App.
 */
angular.module('hl4App')
  .factory('postData', ['$q','$http',function ($q,$http) {


        var baseURL = 'http://www.hlibrary.kr/press/?callback=JSON_CALLBACK&';


        var dataAPI = {};


        /**
         * 교사 목록 읽어오기
         * @returns {*}
         */
        dataAPI.teacherListJSON = function () {
            var param = 'json=get_category_posts&category_id=2&include=attachments,title,tags,comment_count,custom_fields&custom_filelds=teacher_name,teacher_picture,teacher_introduce,teacher_profile,teacher_portfolio_count';

            var newURL = baseURL + param;


            console.log(newURL);



            var deferred = $q.defer();
            deferred.resolve(
                $http.jsonp(newURL).success(function (result) {

                    return result.post;
                }));
            return deferred.promise;

        };

        /**
         * ebook 읽어오기
         * @returns {*}
         */
         dataAPI.bookListJSON = function () {
            var param = 'json=get_category_posts&category_id=6&include=attachments,title,comment_count,custom_fields&custom_filelds=book_url,book_image';
            var newURL = baseURL + param;
            var deferred = $q.defer();
            deferred.resolve(
                $http.jsonp(newURL).success(function (result) {
                    return result.post;
                }));
            return deferred.promise;

        };

        //http://www.hlibrary.kr/press/?callback=JSON_CALLBACK&json=get_author_posts&slug=ebook&author_id=8&include=attachments,title,comment_count,custom_fields&custom_filelds=book_url,book_image%27
        /**
         * 특정교사의 책 읽어오기
         * @param author_name
         * @returns {*}
         */
         dataAPI.getTeacherBook = function (author_name) {
            var param = 'json=get_author_posts&category_slug=xebook&author_id=8&category_id=2&include=attachments,title,comment_count,custom_fields,category_id&custom_filelds=book_url,book_image';
    //        var newURL = baseURL + param;
            var newURL = 'http://www.hlibrary.kr/press/api/get_author_posts?author_name='+author_name+'&cat=6&callback=JSON_CALLBACK';
            var deferred = $q.defer();
            deferred.resolve(
                $http.jsonp(newURL).success(function (result) {
                    return result.post;
                }));
            return deferred.promise;
        };


        /**
         * 특정교사의 최근 schedule 3개 읽어오기
         * @param author_name
         * @returns {*}
         */
         dataAPI.getTeacherSchedule = function (author_name) {
    //        var param = 'json=get_author_posts&category_slug=xebook&author_id=8&category_id=2&include=attachments,title,custom_fields&custom_filelds=start_date,end_date';
    //        var newURL = baseURL + param;
            var newURL = 'http://www.hlibrary.kr/press/api/get_author_posts?author_name='+author_name+'&cat=10&include=title,content,custom_fields&custom_fields=start_date,end_date&callback=JSON_CALLBACK&count=3';
            var deferred = $q.defer();
            deferred.resolve(
                $http.jsonp(newURL).success(function (result) {
                    return result.post;
                }));
            return deferred.promise;
        };


        /**
         * 공지사항 읽어오기
         * @returns {*}
         */
         dataAPI.getNotice = function () {
            var param = 'json=get_category_posts&category_id=11&count=1';
            var newURL = baseURL + param;
            var deferred = $q.defer();
            deferred.resolve(
                $http.jsonp(newURL).success(function (result) {
                    return result.post;
                }));
            return deferred.promise;

        };

        /**
         * 하나의 포스트 정보를 읽어오기
         * @param post_id
         * @returns {*}
         */
         dataAPI.getPostInfo = function (post_id) {
            var param = 'json=get_post&post_id='+post_id;
            var newURL = baseURL + param;
            var deferred = $q.defer();
            deferred.resolve(
                $http.jsonp(newURL).success(function (result) {
                    return result.post;
                }));
            return deferred.promise;
        };

        /**
         * used for search the post
         * @param keyword
         * @returns {*}
         */
         dataAPI.getSearchResult = function (keyword) {
            var param = 'json=get_search_results&page=1&count=10&search='+keyword;
            var newURL = baseURL + param;


             console.log(newURL);
            var deferred = $q.defer();
            deferred.resolve(
                $http.jsonp(newURL).success(function (result) {
                    return result.post;
                }));
            return deferred.promise;
        };











          dataAPI.getTest = function () {
            var newURL = 'http://www.ibookie.org/index.php?document_srl=5106&module=zoard&act=dispZoardContentFileList&mid=ilibrary';
            var deferred = $q.defer();
            deferred.resolve(
                $http.jsonp(newURL).success(function (result) {
                    return result.post;
                }));
            return deferred.promise;


          }

        /**
         * 한명의 교사 정보를 post id를 이용해서 읽어온다.
         * http://www.hlibrary.kr/press/api/get_post/?id=285
         * @param post_id
         * @returns {*}
         */
        dataAPI.getTeacherInfo = function (post_id) {
            var newURL = 'http://www.hlibrary.kr/press/api/get_post/?id='+post_id+'&callback=JSON_CALLBACK&include=title,attachments,comments,custom_fields';
            var deferred = $q.defer();
            deferred.resolve(
                $http.jsonp(newURL).success(function (result) {
                    return result.post;
                }));
            return deferred.promise;
        };


        /**
         * 책목록을 읽어오기
         * @param url
         * @returns {*}
         */
        dataAPI.getBookJSON = function (url) {
            url ="http://batangso.com/index.php?document_srl=1982128&act=dispBoardContentView&callback=JSON_CALLBACK";
            var deferred = $q.defer();
            deferred.resolve(
                $http.get(url).success(function (result) {
                    return result;
                }));
            return deferred.promise;
        };
        return dataAPI;

  }]);

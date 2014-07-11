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

    var teacherListJSON = function () {
        var param = 'json=get_category_posts&category_id=2&include=attachments,title,tags,custom_fields&custom_filelds=teacher_name,teacher_picture,teacher_introduce,teacher_profile,teacher_portfolio_count';

        var newURL = baseURL + param;


        console.log(newURL);

        var deferred = $q.defer();
        deferred.resolve(
            $http.jsonp(newURL).success(function (result) {
                return result.post;
            }));
        return deferred.promise;
        
    };

     var bookListJSON = function () {
        var param = 'json=get_category_posts&category_id=6&include=attachments,title,custom_fields&custom_filelds=book_url,book_image';
        var newURL = baseURL + param;
        console.log(newURL);
        var deferred = $q.defer();
        deferred.resolve(
            $http.jsonp(newURL).success(function (result) {
                return result.post;
            }));
        return deferred.promise;

    };



    return {
        teacherListJSON : teacherListJSON,
        bookListJSON : bookListJSON
    };

//    // Public API here
//    return {
//      someMethod: function () {
//        return meaningOfLife;
//      }
//    };

  }]);

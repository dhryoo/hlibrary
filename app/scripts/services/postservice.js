'use strict';

/**
 * @ngdoc service
 * @name hl4App.postService
 * @description
 * # postService
 * Service in the hl4App.
 * 워드 프레스에서 작성된 책,강사,커맨트,기타 정보를 읽어오는 서비스
 */
angular.module('hl4App')
  .service('Postservice',['$http',function Postservice($http) {

        var baseURL = 'http://www.hlibrary.kr/press/?callback=JSON_CALLBACK&';


//        var datas = [];

        /*
        this.getPost = function () {
            var param = 'json=get_category_posts&slug=teacherList&&include=attachments,title,tags,custom_fields&custom_filelds=teacher_name,teacher_picture,teacher_introduce,teacher_profile';

            var newURL = baseURL + param;
            var responsePromise = $http.jsonp(newURL);
            responsePromise.success(function(data) {
//                console.log(data.posts);


                return data.posts;

            });
            responsePromise.error(function() {
                console.log('in error');
            });
            */
//        }





  }]);

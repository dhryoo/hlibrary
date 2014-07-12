'use strict';

/**
 * @ngdoc service
 * @name hl4App.Session
 * @description
 * # Session
 * Service in the hl4App.
 */
angular.module('hl4App')
  .service('Session', function Session() {

        this.create  = function (id,username,cookie,userrole) {
            this.id = id;
            this.username = username;
            this.cookie = cookie;
            this.userrole = userrole;
        };

        this.destory = function () {

            this.id = null;
            this.username = null;
            this.cookie = null;
            this.userrole = null;
        };
        return this;

  });

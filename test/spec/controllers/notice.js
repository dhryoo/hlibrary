'use strict';

describe('Controller: NoticeCtrl', function () {

  // load the controller's module
  beforeEach(module('hl4App'));

  var NoticeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NoticeCtrl = $controller('NoticeCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

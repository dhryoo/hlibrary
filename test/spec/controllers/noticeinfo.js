'use strict';

describe('Controller: NoticeinfoCtrl', function () {

  // load the controller's module
  beforeEach(module('hl4App'));

  var NoticeinfoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NoticeinfoCtrl = $controller('NoticeinfoCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

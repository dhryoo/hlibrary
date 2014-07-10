'use strict';

describe('Service: postData', function () {

  // load the service's module
  beforeEach(module('hl4App'));

  // instantiate service
  var postData;
  beforeEach(inject(function (_postData_) {
    postData = _postData_;
  }));

  it('should do something', function () {
    expect(!!postData).toBe(true);
  });

});

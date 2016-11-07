var expect = require('chai').expect;
var Calculate = require('../src/js/modules/calculate');

describe('Calculate Module', function () {

    it('should return a target minute ventilation based on values', function () {
        var values = {
          currentMv: 10,
          co2: 50,
          targetCo2: 40
        };

        var expected = Calculate.findTargetMv(values);

        expect(expected).to.be.equal(12.5);
    });

});
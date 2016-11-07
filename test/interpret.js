/**
 * Created by cole570 on 8/31/16.
 */
var expect = require('chai').expect;
var Interpret = require('../src/js/modules/interpret');

describe('Interpret Module', function () {

    var vals;

    beforeEach(function () {
        vals = Interpret.getRefVals();
    });

    it('should return an object of abg reference values', function () {
        expect(vals).to.be.an('object');
        expect(vals).to.have.all.keys(['bicarb', 'ph', 'co2']);
        expect(vals.bicarb).to.have.all.keys(['low', 'normal', 'high']);
    });

});
var expect = require('chai').expect;
var Form = require('../src/js/modules/form');

describe('Form module', function() {
    var num, num2, num3, validState, values;

  beforeEach(function() {
    num = '7.24';
    num2 = '40';
    num3 = 'a';

    validState = {
      ph: false,
      co2: false,
      bicarb: false,
      currentMv: false,
      targetCo2: false
    };

     values = {
      ph: '7.4',
      co2: '40',
      bicarb: '24',
      currentMv: '10',
      targetCo2: '35'
    };
  });

  it('should return true if number matches regular expression', function() {
    expect(Form.test.isValidNumber(num)).to.equal(true);
    expect(Form.test.isValidNumber(num2)).to.equal(true);
    expect(Form.test.isValidNumber(num3)).to.equal(false);
  });

  it('should return parsed floating point numbers', function() {
    expect(Form.test.parseValues(num)).to.equal(7.24);
    expect(Form.test.parseValues(num2)).to.equal(40);
  });

  it('should return true if all keys are true', function() {

    var validState1 = {
      ph: true,
      co2: true,
      bicarb: true,
      currentMv: true,
      targetCo2: true
    };

    var validState2 = {
      ph: true,
      co2: true,
      bicarb: true,
      currentMv: true,
      targetCo2: false
    };

    expect(Form.test.allFieldsValid(validState)).to.equal(false);
    expect(Form.test.allFieldsValid(validState1)).to.equal(true);
    expect(Form.test.allFieldsValid(validState2)).to.equal(false);
  });

  it('should return an array of values and valid state', function() {
    expect(Form.test.isValid(values, validState)).to.be.eql([
        { ph: 7.4, co2: 40, bicarb: 24, currentMv: 10, targetCo2: 35 },
        { ph: true, co2: true, bicarb: true, currentMv: true, targetCo2: true }
      ]);
  });
  
});
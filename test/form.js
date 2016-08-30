var expect = require('chai').expect;
var Form = require('../src/js/modules/form');

describe('Form module', function() {
    var validState, values;

  beforeEach(function() {

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

  it('should return true if a value is valid', function() {

    var val = '7.24';
    var val2 = '40';
    var val3 = 'a';
    var val4 = '&7.4';
    var val5 = ' 6.2';

    expect(Form.isValidNumber(val)).to.equal(true);
    expect(Form.isValidNumber(val2)).to.equal(true);
    expect(Form.isValidNumber(val3)).to.equal(false);
    expect(Form.isValidNumber(val4)).to.equal(false);
    expect(Form.isValidNumber(val5)).to.equal(false);

  });

  it('should update validState and return the updated validState object', function() {

    var field = 'ph';
    var state = true;

    expect(validState.ph).to.equal(false);

    var newState = Form.updateState(field, state, validState); 
    expect(newState.ph).to.equal(true);

  });

  it('should return true if currentMv and targetCo2 are empty', function() {
    var currentValues = {
      ph: '7.4',
      co2: '40',
      bicarb: '22',
      currentMv: '10',
      targetCo2: '35'
    };

    var emptyValues = {
      ph: '7.4',
      co2: '40',
      bicarb: '22',
      currentMv: '',
      targetCo2: ''
    };

    var oneEmptyValue = {
      ph: '7.4',
      co2: '40',
      bicarb: '22',
      currentMv: '',
      targetCo2: '35'
    };
    
    var result = Form.optionalFieldsEmpty(currentValues);
    expect(result).to.equal(false);

    result = Form.optionalFieldsEmpty(emptyValues);
    expect(result).to.equal(true);

    result = Form.optionalFieldsEmpty(oneEmptyValue);
    expect(result).to.equal(false);
  });

  it('should return parsed floating point numbers', function() {

    var result = Form.parseValues(values);

    expect(result).to.be.an('object');

  });
  
});
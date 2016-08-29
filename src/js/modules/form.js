var Form = (function() {

  function isValidNumber(e, val) {
    var regExFloat = /^[0-9]\d*(\.\d+)?$/;
    var isValid = regExFloat.test(val);

    toggleErrorMsg(isValid);
    updateState(e.target.name, isValid, validState);

    return isValid;   
  }

  function toggleErrorMsg(state) {
    state ? $errorMsg.hide() : $errorMsg.show();
  }

  function updateState(field, state, validState) {
    validState[field] = state;

    return validState;
  }

  function allValid(e, validState) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    var valid = true;

    $.each(validState, function(key, val) {
      if (!val) valid = false; 
    });

    valid ? prepareValues(valid) : toggleErrorMsg(false);

    return valid;
  }

  function prepareValues(valid) {
    var currentValues = parseValues(getFormValues());
    emitEvent(currentValues);

    return currentValues;
  }

  function emitEvent(currentValues) {
    EVT.emit("values-validated", currentValues);
  }

  function getFormValues() {
    return {
      ph: ph.value,
      co2: co2.value,
      bicarb: bicarb.value,
      currentMv: currentMv.value,
      targetCo2: targetCo2.value
    };
  }

  function parseValues(values) {
    
    var parsedVals = $.each(values, function(key, val) {
       values[key] = parseFloat(values[key]);
    });

    return parsedVals;
  }

  var validState = {
    ph: false,
    co2: false,
    bicarb: false,
    currentMv: false,
    targetCo2: false
  };
    
  var $errorMsg;

  function init() {

    $('form').on('click', "[type='submit']", function(e) {
      allValid.call(this, e, validState);
    });

    $('form').on('keyup', "input[type='text']", function(e) {
      isValidNumber.call(this, e, this.value);
    });

    $('form').on('blur', "input[type='text']", function(e) {
      isValidNumber.call(this, e, this.value);
    });

    $errorMsg = $('.error-msg');

  }

  return {

    init: init,
   
  };

})();

module.exports = Form;
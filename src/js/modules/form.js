var Form = (function() {

  function isValidNumber(e) {
    var regExFloat = /^[0-9]\d*(\.\d+)?$/;
    var isValid = regExFloat.test(this.value);

    toggleErrorMsg(isValid);
    updateState(e.target.name, isValid);   
  }

  function toggleErrorMsg(state) {
    state ? $errorMsg.hide() : $errorMsg.show();
  }

  function updateState(field, state) {
    validState[field] = state;
  }

  function allValid(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    var valid = true;

    $.each(validState, function(key, val) {
      if (!val) valid = false; 
    });

    sendValues(valid);
  }

  function sendValues(valid) {
    var currentValues = {};

    if (valid) {
      currentValues = parseValues(getFormValues());
      EVT.emit("values-validated", currentValues);
    } else {
      $errorMsg.show();
    }
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

    $('form').on('click', "[type='submit']", allValid);
    $('form').on('keyup', "input[type='text']", isValidNumber);
    $('form').on('blur', "input[type='text']", isValidNumber);
    $errorMsg = $('.error-msg');

  }

  return {

    init: init,
   
  };

})();

// module.exports = Form;
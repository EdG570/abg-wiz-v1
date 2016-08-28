var Form = (function() {

  function isValidNumber(e) {
    var regExFloat = /^[0-9]\d*(\.\d+)?$/;
    var isValid = regExFloat.test(this.value);

    isValid ? $errorMsg.hide() : $errorMsg.show();
    updateState(e.target.name, isValid);   
  }

  function updateState(field, state) {
    validState[field] = state;
  }

  function allValid(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    var inValid = false;
    var currentValues = {};

    $.each(validState, function(key, val) {
      if (!val) inValid = true; 
    });

    if (!inValid) {
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
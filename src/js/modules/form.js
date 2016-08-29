var Form = (function() {

  function isValidNumber(val) {
    var regExFloat = /^[0-9]\d*(\.\d+)?$/;
    var isValid = regExFloat.test(val);

    return isValid;   
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

    Object.keys(validState).forEach(function(key) {
      if (!validState[key] && (key === 'currentMv' || key === 'targetMv') && valid === true) {
        valid = optionalFieldsEmpty();
      } else if (!validState[key] && (key === 'ph' || key === 'bicarb' || key === 'co2')) { 
        valid = false;
      }
    });

    return valid;
  }

  function optionalFieldsEmpty() {
    if (currentMv.value === '' && targetCo2.value === '') {
      return true;
    } 

    return false;
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

    Object.keys(values).forEach(function(key) {
      values[key] = parseFloat(values[key]);
    });
    
    return values;
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
      var isValid = allValid.call(this, e, validState);
      isValid ? prepareValues(isValid) : Ui.toggleErrorMsg(isValid, $errorMsg);
    });

    $('form').on('keyup', "input[type='text']", function(e) {
      var isValid = isValidNumber.call(this, this.value);
      Ui.toggleErrorMsg(isValid, $errorMsg);
      updateState(e.target.name, isValid, validState);
    });

    $('form').on('blur', "input[type='text']", function(e) {
      isValidNumber.call(this, e, this.value);
    });

    $errorMsg = $('.error-msg');

  }

  return {

    init: init,
    isValidNumber: isValidNumber,
    updateState: updateState,
    getFormValues: getFormValues,
    parseValues: parseValues
   
  };

})();

module.exports = Form;
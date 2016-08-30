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
        valid = optionalFieldsEmpty(getCurrentValues());
      } else if (!validState[key] && (key === 'ph' || key === 'bicarb' || key === 'co2')) { 
        valid = false;
      }
    });

    return valid;
  }

  function optionalFieldsEmpty(currentValues) {
    if (currentValues.currentMv === '' && currentValues.targetCo2 === '') {
      return true;
    } 

    return false;
  }

  function getCurrentValues() {
    return {
      ph: ph.value,
      co2: co2.value,
      bicarb: bicarb.value,
      currentMv: currentMv.value,
      targetCo2: targetCo2.value
    };
  }

  function emitEvent(currentValues) {
    EVT.emit("values-validated", currentValues);
  }

  function parseValues(values) {

    Object.keys(values).forEach(function(key) {
      values[key] = parseFloat(values[key]);
    });
    
    return values;
  }

  validState = {
    ph: false,
    co2: false,
    bicarb: false,
    currentMv: false,
    targetCo2: false
  };
    
  var $errorMsg, validState, currentValues;

  function init() {

    $('form').on('click', "[type='submit']", function(e) {
      var isValid = allValid.call(this, e, validState);
      isValid ? currentValues = parseValues(getCurrentValues()) : Ui.toggleErrorMsg(isValid, $errorMsg);
      if (isValid) emitEvent(currentValues);
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
    parseValues: parseValues,
    optionalFieldsEmpty: optionalFieldsEmpty
   
  };

})();

module.exports = Form;
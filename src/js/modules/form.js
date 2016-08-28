var Form = (function() {

  function getValues(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    var formValues = $('form').serializeArray();
    assignValues(formValues);
  }

  function assignValues(formValues) {
    var values = {
      ph: formValues[0].value,
      co2: formValues[1].value,
      bicarb: formValues[2].value,
      currentMv: formValues[3].value,
      targetCo2: formValues[4].value
    };

    validate(values);
  }

  function validate(values) { 
    var validState = {
      ph: false,
      co2: false,
      bicarb: false,
      currentMv: false,
      targetCo2: false
    };

    var valuesAndState = isValid(values, validState);
    var currentState = valuesAndState[1];
    var currentValues = valuesAndState[0];

    if (allFieldsValid(currentState)) {
      $errorMsg.hide();
      EVT.emit("values-validated", currentValues);
    }
  }

  function isValid(values, validState) {
    var result = [];

    for (var val in values) {
      if (isValidNumber(values[val])) {
        values[val] = parseValues(values[val]);
        validState[val] = true;
      } 
      else {
        validState[val] = false;
        $errorMsg.show();
      }
    }
    
    result.push(values);
    result.push(validState);

    return result;
  }

  function allFieldsValid(validState) {
    for (var field in validState) {
      if (validState[field] === false) {
        return false;
      } 
    }

    return true;
  }

  function isValidNumber(value) {
    var regExFloat = /^[0-9]\d*(\.\d+)?$/;
    return regExFloat.test(value);
  }

  function parseValues(value) {
    value = parseFloat(value);

    return value;
  }
    
  var $errorMsg;

  function init() {

    $('form').on('click', "[type='submit']", getValues);
    $errorMsg = $('.error-msg');

  }

  return {

    init: init,
    test: {
      isValidNumber: isValidNumber,
      parseValues: parseValues,
      allFieldsValid: allFieldsValid,
      isValid: isValid,
      getValues: getValues
    }
  };

})();

module.exports = Form;

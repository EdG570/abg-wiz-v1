var Form = (function() {

  function getValues(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    var values = {
      ph: $ph.val(),
      co2: $co2.val(),
      bicarb: $bicarb.val(),
      currentMv: $currentMv.val(),
      targetCo2: $targetCo2.val()
    };

    validate(values);
  }

  function validate(values) { 
    var currentValues = setValidState(values);

    if (allFieldsValid()) {
      $errorMsg.hide();
      finalVals = currentValues;
    }
  }

  function setValidState(values) {
    var regExFloat = /^[0-9]\d*(\.\d+)?$/;

    for (var val in values) {
      if (values[val].match(regExFloat)) {
        values[val] = parseValues(values[val]);
        validState[val] = true;
      } 
      else {
        validState[val] = false;
        $errorMsg.show();
      }
    }

    return values;
  }

  function parseValues(value) {
    value = parseFloat(value);

    return value;
  }

  function allFieldsValid() {
    for (var field in validState) {
      if (validState[field] === false) {
        return false;
      } 
    }

    return true;
  }
    
  var $ph, $co2, $bicarb, $currentMv, $targetCo2, $errorMsg, finalVals;
  var validState = {
    ph: false,
    co2: false,
    bicarb: false,
    currentMv: false,
    targetCo2: false
  };

  function init() {
    $('form').on('click', "[type='submit']", getValues);

    $ph = $('#ph');
    $co2 = $('#co2');
    $bicarb = $('#bicarb');
    $currentMv = $('#currentMv');
    $targetCo2 = $('#targetCo2');
    $errorMsg = $('.error-msg');
    finalVals = null;
  }

  return {

    init: init,
    finalVals: finalVals

  };

})();

$(document).ready(function() { Form.init(); });
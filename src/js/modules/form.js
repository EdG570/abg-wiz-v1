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
    for (var val in values) {
      if (values[val] === '') {
        throw Error('Please fill in all fields');
      }
    }

    parseValues(values);
  }

  function parseValues(values) {
    for (var val in values) {
      if (val === "ph" || val === "currentMv") {
        values[val] = parseFloat(values[val]);
        console.log(typeof values[val]);
      }
    }
  }

  var $ph, $co2, $bicarb, $currentMv, $targetCo2;

  function init() {

    $('form').on('click', "[type='submit']", getValues);

    $ph = $('#ph');
    $co2 = $('#co2');
    $bicarb = $('#bicarb');
    $currentMv = $('#currentMv');
    $targetCo2 = $('#targetCo2');

  }

  return {

    init: init

  };

})();

$(document).ready(function() { Form.init(); });
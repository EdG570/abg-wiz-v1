var Adjust = (function() {

  function findTargetMv(values) {
    var mv = values.currentMv;
    var targetCo2 = values.targetCo2;
    var co2 = values.co2;

    var targetMV = (mv * co2) / (targetCo2);
    $('#mv-result').append('<h3>Your target MV to obtain a PaCO2 of ' + targetCo2 + ' is ' + targetMV + ' L/min.</h3>');
  }


  function init() {

    EVT.on("abg-interpreted", findTargetMv);

  }

  return {

    init: init

  };

})();

$(document).ready(function() { Adjust.init(); });
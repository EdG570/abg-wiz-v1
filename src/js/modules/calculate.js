var Calculate = (function() {

  function findTargetMv(values) {
    var mv = values.currentMv;
    var co2 = values.co2;
    targetCo2 = values.targetCo2;
     
    targetMv = (mv * co2) / (targetCo2);
    targetMv = Math.round(targetMv * 10) / 10;

    return targetMv;
  }

  var $calcResult, targetMv, targetCo2;

  function init() {

    $calcResult = $('#calc-result');
    targetMv = null;

    EVT.on("abg-interpreted", function(values) {
      findTargetMv(values);
      Ui.appendElement($calcResult, '<h3>Your target MV to obtain a PaCO2 of ' + targetCo2 + ' is ' + targetMv + ' L/min.</h3>');
    });

  }

  return {

    init: init,
    findTargetMv: findTargetMv

  };

})();

module.exports = Calculate;

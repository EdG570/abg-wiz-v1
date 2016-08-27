var Adjust = (function() {

  function findTargetMv(values) {
    var mv = values.currentMv;
    var targetCo2 = values.targetCo2;
    var co2 = values.co2;

    var targetMv = (mv * co2) / (targetCo2);
    targetMv = Math.round(targetMv * 10) / 10;
    Ui.appendElement($('#mv-result'), '<h3>Your target MV to obtain a PaCO2 of ' + targetCo2 + ' is ' + targetMv + ' L/min.</h3>');
  }


  function init() {

    EVT.on("abg-interpreted", findTargetMv);

  }

  return {

    init: init

  };

})();

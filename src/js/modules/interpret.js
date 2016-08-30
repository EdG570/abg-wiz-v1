var Interpret = (function() {

  // Reference value ranges for arterial blood gas analysis
  function getRefVals() {

    return {

      bicarb: {
        low: (bicarb < 22),
        normal: (bicarb >= 22 && bicarb <= 26),
        high: (bicarb > 26)
      },

      ph: {
        low: (ph < 7.35),
        normal: (ph >= 7.35 && ph <= 7.45),
        high: (ph > 7.45)
      },

      co2: {
        low: (co2 < 35),
        normal: (co2 >= 35 && co2 <= 45),
        high: (co2 > 45)
      }

    };

  }

  function analyze(values) { 

    var abg = getRefVals();
    var $interpret = $('#interpret-result');
    abgValues = values;
    bicarb = values.bicarb;
    ph = values.ph;
    co2 = values.co2;
   
    if( abg.ph.normal && abg.co2.normal && abg.bicarb.normal ) {
      Ui.appendElement($interpret, "<h3>Normal Blood Gas</h3>");
    }

    else if( abg.ph.low && abg.co2.high && abg.bicarb.normal ) {
      Ui.appendElement($interpret, "<h3>Acute Respiratory Acidosis</h3>");
    }

    else if( abg.ph.low && abg.co2.high && abg.bicarb.high ) {
      Ui.appendElement($interpret, "<h3>Partially Compensated Respiratory Acidosis</h3>");
    }

    else if( abg.ph.low && abg.co2.high && abg.bicarb.low ) {
      Ui.appendElement($interpret, "<h3>Combined Metabolic & Respiratory Acidosis</h3>");
    }

    else if( abg.ph.normal && abg.co2.high && abg.bicarb.high ) {
      Ui.appendElement($interpret, "<h3>Compensated Respiratory Acidosis</h3>");
    }

    else if( abg.ph.high && abg.co2.low && abg.bicarb.normal ) {
      Ui.appendElement($interpret, "<h3>Acute Respiratory Alkalosis</h3>");
    }

    else if( abg.ph.high && abg.co2.low && abg.bicarb.high ) {
      Ui.appendElement($interpret, "<h3>Combined Respiratory & Metabolic Alkalosis</h3>");
    }

    else if( abg.ph.high && abg.co2.low && abg.bicarb.low ) {
      Ui.appendElement($interpret, "<h3>Partially Compensated Respiratory Alkalosis</h3>");
    }

    else if( abg.ph.normal && abg.co2.low && abg.bicarb.low ) {
      Ui.appendElement($interpret, "<h3>Compensated Respiratory Alkalosis</h3>");
    }

    else if( abg.ph.low && abg.co2.normal && abg.bicarb.low ) {
      Ui.appendElement($interpret, "<h3>Acute Metabolic Acidosis</h3>");
    }

    else if( abg.ph.low && abg.co2.low && abg.bicarb.low ) {
      Ui.appendElement($interpret, "<h3>Partially Compensated Metabolic Acidosis</h3>");
    }

    else if( abg.ph.normal && abg.co2.low && abg.bicarb.low ) {
      Ui.appendElement($interpret, "<h3>Partially Compensated Metabolic Acidosis</h3>");
    }

    else if( abg.ph.high && abg.co2.normal && abg.bicarb.high ) {
      Ui.appendElement($interpret, "<h3>Acute Metabolic Alkalosis</h3>");
    }

    else if( abg.ph.high && abg.co2.high && abg.bicarb.high ) {
      Ui.appendElement($interpret, "<h3>Partially Compensated Metabolic Alkalosis</h3>");
    }

    else if( abg.ph.normal && abg.co2.high && abg.bicarb.high ) {
      Ui.appendElement($interpret, "<h3>Compensated Metabolic Acidosis</h3>");
    }

    else {
      Ui.appendElement($interpret, "<h3>Unable to analyze. Note that anomalies won't be covered.</h3>");
    }

    sendValuesIfValid(values);
    
  }

  function sendValuesIfValid(currentValues) {
    if (!isNaN(currentValues.currentMv) && !isNaN(abgValues.targetCo2)) {
      EVT.emit("abg-interpreted", abgValues);
    }
  }
        
  var bicarb, co2, ph, currentMv, targetCo2, abgValues;

  function init() {
    EVT.on("values-validated", analyze);
    
    bicarb = null;
    co2 = null;
    ph = null;
    currentMv = null;
    targetCo2 = null;
    abgValues = null;
  }

  return {

    init: init

  };

})();

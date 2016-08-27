var Analysis = (function() {

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

    bicarb = values.bicarb;
    ph = values.ph;
    co2 = values.co2;

    var abg = getRefVals();
        
    if( abg.ph.normal && abg.co2.normal && abg.bicarb.normal ) {
      $('#analysis').after("<h3>Normal Blood Gas</h3>");
    }

    else if( abg.ph.low && abg.co2.high && abg.bicarb.normal ) {
      $('#analysis').after("<h3>Acute Respiratory Acidosis</h3>");
    }

    else if( abg.ph.low && abg.co2.high && abg.bicarb.high ) {
      $('#analysis').after("<h3>Partially Compensated Respiratory Acidosis</h3>");
    }

    else if( abg.ph.low && abg.co2.high && abg.bicarb.low ) {
      $('#analysis').after("<h3>Combined Metabolic & Respiratory Acidosis</h3>");
    }

    else if( abg.ph.normal && abg.co2.high && abg.bicarb.high ) {
      $('#analysis').after("<h3>Compensated Respiratory Acidosis</h3>");
    }

    else if( abg.ph.high && abg.co2.low && abg.bicarb.normal ) {
      $('#analysis').after("<h3>Acute Respiratory Alkalosis</h3>");
    }

    else if( abg.ph.high && abg.co2.low && abg.bicarb.high ) {
      $('#analysis').after("<h3>Combined Respiratory & Metabolic Alkalosis</h3>");
    }

    else if( abg.ph.high && abg.co2.low && abg.bicarb.low ) {
      $('#analysis').after("<h3>Partially Compensated Respiratory Alkalosis</h3>");
    }

    else if( abg.ph.normal && abg.co2.low && abg.bicarb.low ) {
      $('#analysis').after("<h3>Compensated Respiratory Alkalosis</h3>");
    }

    else if( abg.ph.low && abg.co2.normal && abg.bicarb.low ) {
      $('#analysis').after("<h3>Acute Metabolic Acidosis</h3>");
    }

    else if( abg.ph.low && abg.co2.low && abg.bicarb.low ) {
      $('#analysis').after("<h3>Partially Compensated Metabolic Acidosis</h3>");
    }

    else if( abg.ph.normal && abg.co2.low && abg.bicarb.low ) {
      $('#analysis').after("<h3>Partially Compensated Metabolic Acidosis</h3>");
    }

    else if( abg.ph.high && abg.co2.normal && abg.bicarb.high ) {
      $('#analysis').after("<h3>Acute Metabolic Alkalosis</h3>");
    }

    else if( abg.ph.high && abg.co2.high && abg.bicarb.high ) {
      $('#analysis').after("<h3>Partially Compensated Metabolic Alkalosis</h3>");
    }

    else if( abg.ph.normal && abg.co2.high && abg.bicarb.high ) {
      $('#analysis').after("<h3>Compensated Metabolic Acidosis</h3>");
    }

    else {
      $('#analysis').after("<h3>Unable to analyze. Please enter valid abg parameters.</h3>");
    }

    EVT.emit("abg-interpreted", values);
  }
        
  var bicarb, co2, ph;

  function init() {
    EVT.on("values-validated", analyze);

    bicarb = null;
    co2 = null;
    ph = null;
  }

  return {

    init: init

  };

})();

$(document).ready(function() { Analysis.init(); });
/********************************************************************************
// Controlling function for the lights
*/

$(document).ready(function () {
  var lightRun = new LightRun();
  lightRun.render($('.lights'));
  lightRun.strandPattern('thirdOff', lightRun.lightIntervalIndex);
  lightRun.lightInterval = setInterval(function() { lightRun.advanceLightRun(); }, 500);
});
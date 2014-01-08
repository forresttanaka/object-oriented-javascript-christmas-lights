/********************************************************************************
// Utility to return random number between min and max
*/

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


/********************************************************************************
// Light object tracks an individual light
*/

// Constructor with the vertical coordinate within a strand.
function Light(y) {
  this.lit = false;
  this.y = y;
  this.el = null;
  this.lightColors = ['#ff8080', '#80ff80', '#8080ff', '#ffff40'];
}

// Insert the HTML for a light into the parent element, el, which should be a strand
// Give a little randomness so it looks like real lights
Light.prototype.render = function (el) {
  var randomColor = this.lightColors[getRandomInt(0, this.lightColors.length - 1)];
  this.el = $('<div class="light"></div>').appendTo(el).css({left: getRandomInt(-3, 3), top: this.y, color: randomColor});
};

// Turn on (on == true) or turn off (on == false) a light
Light.prototype.light = function(on) {
  if (on) {
    this.el.addClass('lit');
    this.lit = true;
  } else {
    this.el.removeClass('lit');
    this.lit = false;
  }
};



/********************************************************************************
// Strand object tracks an individual strand of lights
*/

// Constructor with horizontal coordinate of a strand within a light run
function Strand(x) {
  this.light = [];
  this.x = x;
  this.pattern = '';

  var max = getRandomInt(5, 7);
  for (var y = 0; y < max; y++) {
    this.light[y] = new Light(y * 20);
  }
}

// Insert HTML for a strand into parent element, el
Strand.prototype.render = function(el) {
  var strand = $('<div class="strand"></div>').appendTo(el).css({left: this.x, top: 0});
  for (var l = 0; l < this.light.length; l++) {
    this.light[l].render(strand);
  }
};

// Set a light pattern for a strand
//   allOn: Turn on all lights in a strand
//   allOff: Turn off all lights in a strand
Strand.prototype.lightPattern = function(pattern) {
  var l;

  switch (pattern) {
    case 'allOn':
      for (l = 0; l < this.light.length; l++) {
        this.light[l].light(true);
      }
      break;
    case 'allOff':
      for (l = 0; l < this.light.length; l++) {
        this.light[l].light(false);
      }
      break;
    default:
      break;
  }
  this.pattern = pattern;
};

Strand.prototype.getLightPattern = function () {
  return this.pattern;
};



/********************************************************************************
// LightRun tracks a run of light strands
*/

// Constructor creates all the strands
function LightRun() {
  this.strand = [];
  this.lightInterval = null;
  this.lightIntervalIndex = 0;

  for (var s = 0; s < 20; s++) {
    this.strand[s] = new Strand(s * 60);
  }
}

// Insert the HTML for all the strands into the element, el
LightRun.prototype.render = function(el) {
  for (var s = 0; s < this.strand.length; s++) {
    this.strand[s].render(el);
  }
};

// Set the pattern of an entire strand
LightRun.prototype.strandPattern = function (pattern, index) {
  var l;

  switch (pattern) {
    case 'allOn':
      for (l = 0; l < this.strand.length; l++) {
        this.strand[l].lightPattern('allOn');
      }
      break;
    case 'allOff':
      for (l = 0; l < this.strand.length; l++) {
        this.strand[l].lightPattern('allOff');
      }
      break;
    case 'thirdOff':
      for (l = 0; l < this.strand.length; l++) {
        var allPattern = ((l - index) % 3) ? 'allOn' : 'allOff';
        this.strand[l].lightPattern(allPattern);
      }
      break;
    default:
      break;
  }
};

LightRun.prototype.advanceLightRun = function () {
  this.strandPattern('thirdOff', ++this.lightIntervalIndex);
};



lightRun = {

  strand: [],

  render: function(el) {
    for (var i = 0; i < 20; i++) {
      this.strand[i](el);
    }
  }

};
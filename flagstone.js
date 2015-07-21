/*
 Copyright 2014-2015 by CLEARWAVE DESIGNS, LLC.
 
 Licensed under the Apache License, Version 2.0
 http://www.apache.org/licenses/LICENSE-2.0
 
 Author:        Adam Carson
 Website:       http://clearwavedesigns.com
 Dependencies:  jquery.js (1.8.3+)
 
 Name(s):       FlagstoneJS (flagstone.js)
 Version:       1.2.20150720
 Slogan:        "Responsive tiling."
 Description:   Responsively tiles HTML elements left to right, top to bottom, and where there's the most room.
 */

var FLAGSTONE = function(settings) {

  var that = this;

  var o = settings || {};
  // AREA (CONTAINER)
  this.areaStr = o.area || '[flagstones]';
  this.area = $(this.areaStr);
  this.areaMargin = o.margin || o.margin === 0 ? o.margin : o.areaMargin || o.areaMargin === 0 ? o.areaMargin : 10;
  this.areaWidth = this.area.outerWidth();
  this.areaHeight = this.area.outerHeight();
  // MIN WIDTH
  this.minWidth = o.minWidth || 280;
  // COLUMNS
  this.maxColumns = o.maxColumns || 1920;
  this.calcColumns = Math.floor(this.areaWidth / this.minWidth);
  this.columns = this.calcColumns > this.maxColumns ? this.maxColumns : this.calcColumns;
  // MARGIN
  this.margin = o.margin || o.margin === 0 ? o.margin : 10;
  // FLAGSTONES
  this.flagstonesStr = o.flagstones || '[flagstone]';
  this.flagstones = $(this.flagstonesStr);
  this.flagstonesMargin = o.margin || o.margin === 0 ? o.margin : o.flagstonesMargin || o.flagstonesMargin === 0 ? o.flagstonesMargin : 10;
  this.flagstoneHeights = [];
  this.flagstoneWidth = (this.areaWidth / this.columns) - ((this.margin * (this.columns + 1)) / this.columns);
  // DIRECTION
  this.direction = o.direction ? o.direction.toLowerCase() : 'left';
  // ANIMATION
  this.duration = o.duration / 1000 || 0;
  this.jqueryAnimation = o.jqueryAnimation;
  // RESIZE/RESET DELAY
  this.resizeDelay = o.resizeDelay || 0;
  // HIDE (for Developers as well when then are injecting new content onto their page, so they can hide the flagstones before they get a change to re-calculate);
  this.hide = function() {
    // Must use "that" because "this" binding only works inside the function and not when call by the Dev outside of it using their instance of it
    this.area.addClass('flagstones-hidden');
  };

  // RUN
  this.run = function() {
    var columnHeights = new Array(this.columns);
    for (var i = 0, l = this.flagstoneHeights.length; i < l; i++) {
      if (i < this.columns) {
        // First "row"
        for (var ii = 0, ll = this.columns; ii < ll; ii++) {
          if (this.jqueryAnimation) {
            this.flagstones.eq(ii).animate({
              'top': this.areaMargin + 'px',
              'left': this.direction === 'right' ? 'auto' : (this.flagstoneWidth * ii + (ii ? this.flagstonesMargin * ii + this.areaMargin : this.areaMargin)) + 'px',
              'right': this.direction === 'left' ? 'auto' : (this.flagstoneWidth * ii + (ii ? this.flagstonesMargin * ii + this.areaMargin : this.areaMargin)) + 'px'
            }, this.duration * 1000);
          } else {
            this.flagstones.eq(ii).css({
              'top': this.areaMargin + 'px',
              'left': this.direction === 'right' ? 'auto' : (this.flagstoneWidth * ii + (ii ? this.flagstonesMargin * ii + this.areaMargin : this.areaMargin)) + 'px',
              'right': this.direction === 'left' ? 'auto' : (this.flagstoneWidth * ii + (ii ? this.flagstonesMargin * ii + this.areaMargin : this.areaMargin)) + 'px'
            });
          }
          columnHeights[ii] = this.flagstoneHeights[ii] + this.areaMargin;
        }
      } else {
        // Every other "row"
        var smallestColumnHeight = Math.min.apply(null, columnHeights);
        var smallestColumn = columnHeights.indexOf(smallestColumnHeight);
        if (this.jqueryAnimation) {
          this.flagstones.eq(i).animate({
            'top': (smallestColumnHeight + this.flagstonesMargin) + 'px',
            'left': this.direction === 'right' ? 'auto' : (this.flagstoneWidth * smallestColumn + (smallestColumn ? this.flagstonesMargin * smallestColumn + this.areaMargin : this.areaMargin)) + 'px',
            'right': this.direction === 'left' ? 'auto' : (this.flagstoneWidth * smallestColumn + (smallestColumn ? this.flagstonesMargin * smallestColumn + this.areaMargin : this.areaMargin)) + 'px'
          }, this.duration * 1000);
        } else {
          this.flagstones.eq(i).css({
            'top': (smallestColumnHeight + this.flagstonesMargin) + 'px',
            'left': this.direction === 'right' ? 'auto' : (this.flagstoneWidth * smallestColumn + (smallestColumn ? this.flagstonesMargin * smallestColumn + this.areaMargin : this.areaMargin)) + 'px',
            'right': this.direction === 'left' ? 'auto' : (this.flagstoneWidth * smallestColumn + (smallestColumn ? this.flagstonesMargin * smallestColumn + this.areaMargin : this.areaMargin)) + 'px'
          });
        }
        columnHeights[smallestColumn] += this.flagstoneHeights[i] + this.flagstonesMargin;
      }
      this.area.css('height', (Math.max.apply(null, columnHeights) || this.flagstoneHeights[0] + this.areaMargin) + this.areaMargin + 'px');
    }
    setTimeout(function() {
      that.area.removeClass('flagstones-hidden');
    }, 0);
  };
  // RESIZE AND RESET
  this.resetDelay1;
  this.resetDelay2;
  this.resetDelay3;
  this.reset = function() {
    // Must use "that" because "this" binding only works inside the function and not when call by the Dev outside of it using their instance of it
    that.areaWidth = that.area.outerWidth();
    if (that.areaWidth < that.minWidth + (this.areaMargin ? that.areaMargin * 2 : 0)) {
      that.areaWidth = that.minWidth;
    }
    that.calcColumns = Math.floor(that.areaWidth / that.minWidth);
    that.columns = that.calcColumns > that.maxColumns ? that.maxColumns : that.calcColumns;
    that.flagstoneWidth = (that.areaWidth / that.columns) - ((that.flagstonesMargin * (that.columns - 1) + (that.areaMargin * 2)) / that.columns);
    while (that.flagstoneHeights.length > 0) {
      that.flagstoneHeights.pop();
    }
    that.flagstones.each(function() {
      var self = $(this);
      if (that.jqueryAnimation) {
        self.animate({
          'width': that.flagstoneWidth + 'px'
        }, that.duration * 1000);
      } else {
        self.css('width', that.flagstoneWidth + 'px');
      }
      that.flagstoneHeights.push(self.outerHeight());
    });
    that.run();
  };
  // DYNAMIC CONTENT RESET / HARD RESET
  this.hardReset = function() {
    // Must use "that" because "this" binding only works inside the function and not when call by the Dev outside of it using their instance of it
    that.hide();
    setTimeout(function() {
      that.flagstones = $(that.flagstonesStr);
      that.reset();
    }, 0);
  };
  // INITIALIZE THE oECT
  this.init = function() {
    this.hide();
    var head = $('head');
    // Setup box-sizing
    head.append('<style>' + this.areaStr + '{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;min-width:' + (this.minWidth + (this.margin * 2)) + 'px;}' + this.flagstonesStr + '{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;top:0px;' + this.direction + ':0px;}' + this.areaStr + '.flagstones-hidden{visibility:hidden;}</style>');
    // Setup CSS animation if enabled
    if (!this.jqueryAnimation) {
      head.append('<style>' + this.areaStr + '{-webkit-transition-duration:' + that.duration + 's;-moz-transition-duration:' + that.duration + 's;-ms-transition-duration:' + that.duration + 's;-o-transition-duration:' + that.duration + 's;transition-duration:' + that.duration + 's;}' + this.flagstonesStr + '{-webkit-transition-duration:' + that.duration + 's;-moz-transition-duration:' + that.duration + 's;-ms-transition-duration:' + that.duration + 's;-o-transition-duration:' + that.duration + 's;transition-duration:' + that.duration + 's;}</style>');
    };
    // Resize listener
    $(window).on('resize', function() {
      // if (!that.duration) {}
      clearTimeout(that.resetDelay1);
      clearTimeout(that.resetDelay2);
      clearTimeout(that.resetDelay3);
      that.resetDelay1 = setTimeout(that.reset.bind(that), that.resizeDelay);
      that.resetDelay2 = setTimeout(that.reset.bind(that), that.duration + that.resizeDelay + 1000); // Makes CSS & jQuery animation top align correctly
      that.resetDelay3 = setTimeout(that.reset.bind(that), that.duration + that.resizeDelay + 2000); // Makes CSS & jQuery animation top align correctly
    });
    // Run reset to calculate and run flagstone!
    setTimeout(this.reset.bind(this), 0);
    // Reset immediately after resources have loaded to get correct heights
    setTimeout(function() {
      that.area.find('img,iframe,video,audio,oect,embed').on('load', function() {
        that.reset();
      });
    }, 0);
  };
  this.init();
}; // end FLAGSTONEJS

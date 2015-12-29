/*!
 * Scalem v1.2.0 - A responsive text jQuery plugin
 * Copyright 2014, Tom Doan (http://www.tohodo.com/)
 *
 * Scalem by Tom Doan is licensed under the MIT License.
 * Read a copy of the license in the LICENSE file or at
 * http://choosealicense.com/licenses/mit
 */

(function($) {
  $.fn.scalem = function(oOptions) {
    var oSettings = $.extend({
        ratio: 1,        // Scale ratio (1 = 100%)
        reference: null, // Text will scale relative to this element
        styles: ''       // List of styles to scale (useful for buttons)
      }, oOptions),
      updateStyles = function(o, e) {
        var $o = $(o),
          $oP = $o.parent(),
          // Create clone to get true text width
          $o2 = $o.clone().css({
            'width': 'auto',
            'display': 'none',
            'white-space': 'nowrap'
          }),
          // If data attribute exists, use that instead
          $ref = $(o.getAttribute('data-scale-reference') || oSettings.reference),
          // Array of styles to scale
          aStyles = ('' + (o.getAttribute('data-scale-styles') || oSettings.styles)).split(' '),
          // Scale ratio
          nRatio = Math.max(parseFloat(o.getAttribute('data-scale-ratio') || oSettings.ratio), 0),
          // Reference width (set to parent width by default)
          nRefWidth = ($ref.length) ? $ref.width() : $oP.width(),
          nTargetWidth,
          // Text width
          nTextWidth;
        // Validate ratio
        if (isNaN(nRatio)) nRatio = 1;
        // Account for scrollbar?
        if ($oP[0].scrollHeight>$oP.height()) nRefWidth -= 17;
        nTargetWidth = nRefWidth * nRatio;
        // Append clone to body to get inline width
        $o2.appendTo('body');
        nTextWidth = $o2.width();
        // Exit if something doesn't look right
        if (nTargetWidth===0 || nTextWidth===nRefWidth) {
          $o2.remove();
          return;
        }
        // Scale the text! (6px is minimum font size to get accurate ratio)
        for (var i=Math.round((6/$o2.css('font-size', '6px').width())*nTargetWidth), o2=$o2[0]; i<nTargetWidth; ++i) {
          // Update font-size using native method for better performance
          // (see http://jsperf.com/style-vs-csstext-vs-setattribute)
          o2.style.fontSize = i + 'px';
          if ($o2.width() / nRefWidth > nRatio) {
            $o.css('font-size', (i-1) + 'px');
            break;
          }
        }
        // Clean up
        $o2.remove();
        // Scale additional styles
        if (aStyles[0]) {
          var nScale = $o.width() / nTextWidth,
            oStyles = {};
          for (var i=0, imax=aStyles.length; i<imax; ++i) {
            if (!aStyles[i]) continue;
            oStyles[aStyles[i]] = ((aStyles[i]==='width') ? nTargetWidth : Math.round(parseFloat($o.css(aStyles[i])) * nScale)) + 'px';
          }
          $o.css(oStyles);
        }
      };
    return this.each(function() {
      // This scope is required for the resize handler
      var o = this;
      // Set font size on load
      updateStyles(o);
      // Update CSS styles upon resize
      $(window).resize(function(e) {
        updateStyles(o, e);
      });
    });
  };
}(jQuery));
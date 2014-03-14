/*!
* Scalem v1.0 - A responsive text jQuery plugin
* Copyright 2014, Tom Doan (http://www.tohodo.com/)
*
* Scalem by Tom Doan is licensed under the MIT License.
* Read a copy of the license in the LICENSE file or at
* http://choosealicense.com/licenses/mit
*/

(function($) {
  $.fn.scalem = function(oOptions) {
    var oSettings = $.extend({
        ratio: .5,
        reference: null,  /* Text will scale relative to this element */
        styles: ''  /* List of styles to scale (useful for buttons) */
      }, oOptions),
      setFontSize = function(o, e) {
        var $o = $(o),
          /* Create clone to get true text width */
          $o2 = $o.clone().css({'display':'none', 'white-space':'nowrap'}),
          /* If data attribute exists, use that instead */
          $ref = o.getAttribute('data-scale-reference') ? $(o.getAttribute('data-scale-reference')) : $(oSettings.reference),
          /* Array of styles to scale */
          aStyles = (o.getAttribute('data-scale-styles') || oSettings.styles).split(' '),
          /* Scale ratio */
          nRatio = parseFloat(o.getAttribute('data-scale-ratio')) || oSettings.ratio,
          /* Reference width (set to parent width by default) */
          nRefWidth = ($ref.length > 0) ? $ref.width() : $o.parent().width(),
          nTargetWidth = nRefWidth * nRatio,
          /* Text font size */
          nTextWidth;
        // Append clone to body to get true inline width
        $o2.appendTo('body');
        nTextWidth = $o2.width();
        // Exit if something doesn't look right
        if (nTargetWidth === 0 || nTextWidth === nRefWidth) return;
        // Scale the text! (6px is minimum font size to get accurate ratio)
        for (var i=Math.round((6/$o2.css('font-size', '6px').width())*nTargetWidth); i<nTargetWidth; i++) {
          $o2.css('font-size', i + 'px');
          if ($o2.width() / nRefWidth > nRatio) {
            $o.css('font-size', (i - 1) + 'px');
            break;
          }
        }
        // Clean up
        $o2.remove();
        // Scale additional styles
        if (aStyles[0]) {
          var nScale = $o.width() / nTextWidth,
            oStyles = {};
          for (var i=0, imax=aStyles.length; i<imax; i++) {
            if (!aStyles[i]) continue;
            oStyles[aStyles[i]] = Math.round(parseFloat($o.css(aStyles[i])) * nScale) + 'px';
          }
          $o.css(oStyles);
        }
      };
    return this.each(function() {
      // This scope required for resize handler
      var o = this;
      // Update font size upon resize
      $(window).resize(function(e) {
        setFontSize(o, e);
      });
      // Set font size on load
      setFontSize(o);
    });
  };
}(jQuery));

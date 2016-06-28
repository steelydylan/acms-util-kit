/*
 * jQuery Highlight plugin
 *
 * Based on highlight v3 by Johann Burkard
 * http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html
 *
 * Code a little bit refactored and cleaned (in my humble opinion).
 * Most important changes:
 *  - has an option to highlight only entire words (wordsOnly - false by default),
 *  - has an option to be case sensitive (caseSensitive - false by default)
 *  - highlight element tag and class names can be specified in options
 *
 * Usage:
 *   // wrap every occurrance of text 'lorem' in content
 *   // with <span class='highlight'> (default options)
 *   $('#content').highlight('lorem');
 *
 *   // search for and highlight more terms at once
 *   // so you can save some time on traversing DOM
 *   $('#content').highlight(['lorem', 'ipsum']);
 *   $('#content').highlight('lorem ipsum');
 *
 *   // search only for entire word 'lorem'
 *   $('#content').highlight('lorem', { wordsOnly: true });
 *
 *   // don't ignore case during search of term 'lorem'
 *   $('#content').highlight('lorem', { caseSensitive: true });
 *
 *   // wrap every occurrance of term 'ipsum' in content
 *   // with <em class='important'>
 *   $('#content').highlight('ipsum', { element: 'em', className: 'important' });
 *
 *   // remove default highlight
 *   $('#content').unhighlight();
 *
 *   // remove custom highlight
 *   $('#content').unhighlight({ element: 'em', className: 'important' });
 *
 *
 * Copyright (c) 2009 Bartek Szopka
 *
 * Licensed under MIT license.
 *
 */

jQuery.extend({
    highlight: function (node, re, nodeName, className) {
        if (node.nodeType === 3) {
            var match = node.data.match(re);
            if (match) {
                var highlight = document.createElement(nodeName || 'span');
                highlight.className = className || 'highlight';
                var wordNode = node.splitText(match.index);
                wordNode.splitText(match[0].length);
                var wordClone = wordNode.cloneNode(true);
                highlight.appendChild(wordClone);
                wordNode.parentNode.replaceChild(highlight, wordNode);
                return 1; //skip added node in parent
            }
        } else if ((node.nodeType === 1 && node.childNodes) && // only element nodes that have children
                !/(script|style)/i.test(node.tagName) && // ignore script and style nodes
                !(node.tagName === nodeName.toUpperCase() && node.className === className)) { // skip if already highlighted
            for (var i = 0; i < node.childNodes.length; i++) {
                i += jQuery.highlight(node.childNodes[i], re, nodeName, className);
            }
        }
        return 0;
    }
});

jQuery.fn.unhighlight = function (options) {
    var settings = { className: 'highlight', element: 'span' };
    jQuery.extend(settings, options);

    return this.find(settings.element + "." + settings.className).each(function () {
        var parent = this.parentNode;
        parent.replaceChild(this.firstChild, this);
        parent.normalize();
    }).end();
};

jQuery.fn.highlight = function (words, options) {
    var settings = { className: 'highlight', element: 'span', caseSensitive: false, wordsOnly: false };
    jQuery.extend(settings, options);
    
    if (words.constructor === String) {
        words = [words];
    }
    words = jQuery.grep(words, function(word, i){
      return word != '';
    });
    words = jQuery.map(words, function(word, i) {
      return word.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    });
    if (words.length == 0) { return this; };

    var flag = settings.caseSensitive ? "" : "i";
    var pattern = "(" + words.join("|") + ")";
    if (settings.wordsOnly) {
        pattern = "\\b" + pattern + "\\b";
    }
    var re = new RegExp(pattern, flag);
    
    return this.each(function () {
        jQuery.highlight(this, re, settings.element, settings.className);
    });
};


(function($){
	var point = -1;
	$.fn.extend({
		searchable:function(){
			if(!$(this).hasClass("js-searchable")){
				$(this).addClass("js-searchable")
			}
			$(this).wrap("<div class='js-searchableForm'></div>")
			.after("<button class='js-searchableDismiss'>&times;</button>")
			.after("<button class='js-searchableNext'>&gt;</button>")
			.after("<button class='js-searchablePrev'>&lt;</button>")
		},
	});
	$(window).keydown(function(e){
		if(e.keyCode == 70 && e.metaKey){
			$(".js-searchableForm").css("display","block");
			$(".js-searchable").focus();
			e.preventDefault();
		}
	});
	$(document).on("click",".js-searchableDismiss",function(){
		$(this).parent(".js-searchableForm").css("display","none");
		$("body").unhighlight();
	});
	$(document).on("click",".js-searchableNext",function(){
		point = (point + 1) % $(".highlight").length;
		$('html, body').animate({ scrollTop:$(".highlight").css("backgroundColor","red").eq(point).css("backgroundColor","yellow").position().top-50},0)
	});
	$(document).on("click",".js-searchablePrev",function(){
		if(point == 0 || point == -1){
			point = $(".highlight").length - 1;
		}else{
			point--;
		}
		$('html, body').animate({ scrollTop:$(".highlight").css("backgroundColor","red").eq(point).css("backgroundColor","yellow").position().top-50},0)
	});
	$(document).on('change keyup paste',".js-searchable",function(){
		var val = $(".js-searchable").val();
		point = -1;
		$("body").unhighlight();
		$("body").highlight(val);
	});
	var $searchable = $("<input type='text' class='js-searchable'>");
	$("body").append($searchable);
	$searchable.searchable();
})(jQuery);
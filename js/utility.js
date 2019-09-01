$(document).ready(function() {
	// Check for Mobile
	$.Mobile = ($('body').hasClass('webkit-mobile') || (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/Android/i)));
	 
	// SVG support SVG
	if(!Modernizr.svg) {
		var images = $('img[data-fallback]');
		images.each(function(i) {
			$(this).attr('src', $(this).data('fallback'));
		});
	}  
});

$(document).ready(function() {
	console.log( "ready!" );
});
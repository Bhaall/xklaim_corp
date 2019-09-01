(function($) {

	var $window = $(window),
		$body = $('body'),
		$stickyNav = $('header#global'),
		$heading = $('#content #heading');

	var elTop = 200,
		secOne = $heading.offset().top;

	$window.scroll(function() {
		var browserTop = $window.scrollTop();
		$stickyNav.toggleClass('sticky', browserTop >= elTop);
		$body.toggleClass('secOne', browserTop >= secOne);
	});
	
	$(".demo-link").click(function(e){
		e.preventDefault();
		var offset = $($(this).attr('href')).offset().top-75;
		$('html, body').animate({
			scrollTop:offset
		}, 600);
		$('#name').focus();
	});

	var target = location.hash;
	if(target) {
		var offset = $(target).offset().top-75;
		$('html, body').animate({
			scrollTop:offset
		}, 1000);
	}

})(jQuery);
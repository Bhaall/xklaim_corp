(function($) {

	var $window = $(window),
		$body = $('body'),
		$stickyNav = $('header#global'),
		$socialNation = $('#content #social-nation'),
		$prize = $('#content #prize'),
		$opportunity = $('#content #opportunity'),
		$activation = $('#content #activation'),
		$takeAction = $('#content #take-action'),
		$contact = $('#content #contact');

	var elTop = 400,
		secOne = $socialNation.offset().top - 65,
		secTwo = $prize.offset().top - 65,
		secThree = $opportunity.offset().top - 65,
		secFour = $activation.offset().top - 65,
		secFive = $takeAction.offset().top - 65,
		secSix = $contact.offset().top - 400;

	var isiPad = navigator.userAgent.match(/iPad/i) != null;
	var ipadTop = 5700;
	
	function doOnOrientationChange() {
		switch(window.orientation) {  
			case -90:
			case 90:
			ipadTop = 5500;
			break; 
		default:
			ipadTop = 5700;
			break; 
		}
	}

	window.addEventListener('orientationchange', doOnOrientationChange);
	doOnOrientationChange();

	$(document).scroll(function() {
		var browserTop = $(document).scrollTop();
		if (isiPad) { $stickyNav.toggleClass('sticky', browserTop >= elTop && browserTop <= ipadTop); }
		else { $stickyNav.toggleClass('sticky', browserTop >= elTop && browserTop <= 6100); }
		$body.toggleClass('secOne', browserTop >= secOne);
		$body.toggleClass('secTwo', browserTop >= secTwo);
		$body.toggleClass('secThree', browserTop >= secThree);
		$body.toggleClass('secFour', browserTop >= secFour);
		$body.toggleClass('secFive', browserTop >= secFive);
		$body.toggleClass('secSix', browserTop >= secSix);
	});

	$("#scrollNav li a").click(function(event){
		event.preventDefault();
		var offset = $($(this).attr('href')).offset().top;
		var $anchor = $('#' + this.hash.substring(1));
		$('html, body').animate({
			scrollTop:offset - $anchor.attr('data-scrolloffset')
		}, 600);
	});
	
	$(".demo-link").click(function(e){
		e.preventDefault();
		var offset = $($(this).attr('href')).offset().top-75;
		$('html, body').animate({
			scrollTop:offset
		}, 600);
		$('#name').focus();
	});

})(jQuery);
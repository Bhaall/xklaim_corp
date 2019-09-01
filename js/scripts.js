
if (window.XKL) _XKL = XKL;

XKL = {
	settings: {
		$formContact : $("#contactForm"),
		$formTrial : $("#trialForm"),
		$carousel : $(".carousel-inner"),
	},
	init: function(){
		this.initContact(this.settings.$formContact);
		this.initTrial(this.settings.$formTrial);
		this.slideCarousel(this.settings.$carousel);
	},
	slideCarousel: function($carousel) {
		if ($carousel) {
			$carousel.swipe( {
				swipeLeft:function(event, direction, distance, duration, fingerCount) {
					$(this).parent().carousel('next');
				},
				swipeRight: function() {
					$(this).parent().carousel('prev');
				},
			});
		}
	},
	initContact: function(form) {
		$(form).validate({
			focusInvalid: false,
			rules: {
				name: {
					required: true
				},
				email: {
					required: true			
				},
			},
			onkeyup: false,
			focusCleanup: true,
			onfocusout: false,
			errorPlacement: function(error, element) {
				//error.insertBefore( element.parent("div"));
				//$(element).parent("div").addClass("invalidEntry");
			},
			errorClass: "error",
			validClass: "success",
			highlight: function(element, errorClass, validClass) {
				$(element).addClass(errorClass).removeClass(validClass);
			},
			unhighlight: function(element, errorClass, validClass) {
				$(element).removeClass(errorClass).addClass(validClass);
			},
			errorContainer: $(".alertmsg"),
			success: function(element, errorClass, validClass){
				$(element).siblings("div").removeClass(errorClass).addClass(validClass);
			},
			showErrors: function(errorMap, errorList) {
				var message = this.numberOfInvalids() == 1
				? 'Please check the highlighted field.'
				: 'Please check the highlighted fields.';
				$(form).find(".alertmsg").html(message).fadeIn(500);
				this.defaultShowErrors();
			},
			submitHandler: function(form) {
				$(".ui-loader").css("display", "block");
				isSubmitted = true;
				$.ajax({
					url: form.action,
					type: form.method,
					data: $(form).serialize(),
					dataType: "json",
					success: function(response) {
						$(".ui-loader").hide();
						isSubmitted = false;
						$(form).find(".alertmsg").html(response['meta']['message']['title']);
						$(form).find(".alertmsg").fadeIn(500);
					},
					error: function (response) {
						if (response.status == "404") {
							$(".ui-loader").hide();
							$(form).find(".alertmsg").html(response.statusText);
							$(form).find(".alertmsg").fadeIn(500);
							isSubmitted = false;
						}
						else if(response.status == "200"){
							$(".ui-loader").hide();
							isSubmitted = false;
							$(form).find(".alertmsg").html("Thank you!");
							$(form).find(".alertmsg").fadeIn(500);
						}
						else {
							$(".ui-loader").hide();
							$(form).find(".alertmsg").html(response['meta']['message']['title']+ ' ' + response['meta']['message']['subtitle']);
							$(form).find(".alertmsg").fadeIn(500);
							isSubmitted = false;
						}
					}
				});
			}
		});	
	},
	initTrial: function(form) {
		var $first = $(form).find("#firstname");
		$first.focus();
		$(form).validate({
			focusInvalid: false,
			rules: {
				first_name: {
					required: true			
				},
				last_name: {
					required: true				
				},
				email_id: {
					required: true,
					email: true
				},
				telephone_number: {
					required: true			
				},
				enterprise_name: {
					required: true			
				},
				employee_strength: {
					required: true
				},
				is_agreed: {
					required: true
				},
			},
			onkeyup: false,
			focusCleanup: true,
			onfocusout: false,
			errorLabelContainer: "#messageBox",
			wrapper: "li",
			errorPlacement: function(error, element) {
				//error.insertBefore( element.parent("div"));
				//$(element).parent("div").addClass("invalidEntry");
			},
			errorClass: "error",
			validClass: "success",
			highlight: function(element, errorClass, validClass) {
				if($(element).attr('type') == 'radio'){
				    $(element.form).find("input[type=radio]").each(function(which){
					  $(element.form).find("label[for=" + this.id + "]").addClass(errorClass);
					  $(this).addClass(errorClass);
				    });
				}
				else if ($(element).attr('type') == 'checkbox') {
				    $(element.form).find("input[type=checkbox]").each(function(which){
					 $(element.form).find("div[for=" + this.id + "]").addClass(errorClass);
					 $(this).addClass(errorClass);
				    });				
				}
				else {
					$(element.form).find("label[for=" + element.id + "]").addClass(errorClass);
					$(element).addClass(errorClass).removeClass(validClass);
				}
			},
			unhighlight: function(element, errorClass, validClass) {
				if($(element).attr('type') == 'radio'){
				    $(element.form).find("input[type=radio]").each(function(which){
					  $(element.form).find("label[for=" + this.id + "]").removeClass(errorClass);
					  $(this).removeClass(errorClass);
				    });
				}
				else if ($(element).attr('type') == 'checkbox') {
				    $(element.form).find("input[type=checkbox]").each(function(which){
					  $(element.form).find("div[for=" + this.id + "]").removeClass(errorClass);
					  $(this).removeClass(errorClass);
				    });				
				}
				else {
					$(element.form).find("label[for=" + element.id + "]").removeClass(errorClass);
					$(element).removeClass(errorClass).addClass(validClass);
				}
			},
			errorContainer: $(".alertmsg"),
			success: function(element, errorClass, validClass){
				$(element).siblings("div").removeClass(errorClass).addClass(validClass);
			},
			showErrors: function(errorMap, errorList) {
				var message = this.numberOfInvalids() == 1
				? 'Please check the highlighted field.'
				: 'Please check the highlighted fields.';
				$(form).find(".alertmsg").html(message).fadeIn(500);
				this.defaultShowErrors();
			},
			submitHandler: function(form) {
				$(".ui-loader").css("display", "block");
				isSubmitted = true;
				$.ajax({
					url: form.action,
					type: form.method,
					data: $(form).serialize(),
					dataType: "json",
					success: function(response) {
						$(".ui-loader").hide();
						isSubmitted = false;
						window.location.replace("success.html");
					},
					error: function (response) {
						if (response.status == "404") {
							$(".ui-loader").hide();
							$(form).find(".alertmsg").html(response.statusText);
							$(form).find(".alertmsg").fadeIn(500);
							isSubmitted = false;
						}
						else if(response.status == "200"){
							window.location.replace("success.html");
						}
						else {
							$(".ui-loader").hide();
							$(form).find(".alertmsg").html(response['meta']['message']['title']+ ' ' + response['meta']['message']['subtitle']);
							$(form).find(".alertmsg").fadeIn(500);
							isSubmitted = false;
						}
					}
				});
			}
		});	
	},
};

$(document).ready(function(){
	XKL.init();
});
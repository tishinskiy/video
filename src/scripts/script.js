import './video.js'



$(document).ready(function(){
	console.log('READY')

	$(".form-field").focus(function () {

	    $(this).parent().addClass("with-focus");
	});

	$(".form-field").blur(function () {

	    $(this).parent().removeClass("with-focus");
	    if ($(this).val().length >= 1) {
	        $(this).parent().addClass("with-value");
	    } else {
	        $(this).parent().removeClass("with-value");
	    }
	});


	$('.accordeon__caption').on('click', function() {

		const items = $('.accordeon__caption')

		for (let i = 0; i < items.length; i++) {

			if(this === items[i]) {
				$(items[i]).addClass('accordeon__caption--open')
				$(items[i]).next('.accordeon__body').slideDown('fast')

			} else {
				$(items[i]).removeClass('accordeon__caption--open')
				$(items[i]).next('.accordeon__body').slideUp('fast')
			}
		}
	})

})
$('tr[data-url]').click(function() {
	window.location = `${window.location.origin}/${$(this).data('url')}`
	console.log($(this).data('url'))
})

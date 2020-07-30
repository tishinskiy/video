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

		if ($(this).hasClass('accordeon__caption--open')) {
			$(this).removeClass('accordeon__caption--open')
			$(this).next('.accordeon__body').slideUp('fast')
			return false
		}

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

	const fort = $('[data-fort]').attr('data-fort')
	const target = $('.js__statis-body').attr('target')

	$('body').on('click', '.js__stat-row', function(){

		const url = `https://vrk1.ttk.ru/site/default/video-archive?camera=${fort? fort: '10'}&time=${$(this).attr('data-row')}&backPage=1`

		window.open(url, 'example', (!!target && target === '_blank') ? '' : 'width=1024px,height=768px');
	})

})
$('tr[data-url]').click(function() {
	window.location = `${window.location.origin}/${$(this).data('url')}`
	console.log($(this).data('url'))
})

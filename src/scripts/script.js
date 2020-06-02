import './video.js'



$(document).ready(function(){
	console.log('READY')
	// $( function() {
	//     $( "#datepickerStart, #datepickerEnd" ).datepicker();
	//   } );
	// $.datepicker.formatDate( "dd.mm.yyyy" );

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
})
$('[data-url]').click(function() {
	window.location = `${window.location.origin}/${$(this).data('url')}`
	console.log($(this).data('url'))
})

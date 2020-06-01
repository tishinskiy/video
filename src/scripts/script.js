import './video.js'



$(document).ready(function(){
	console.log('READY')
})
$('[data-url]').click(function() {
	window.location = `${window.location.origin}/${$(this).data('url')}`
	console.log($(this).data('url'))
})

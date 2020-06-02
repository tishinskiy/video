console.log('VIDEO');



// const

let canvas = undefined

const draw = (video) => {

	if(video.paused || video.ended) return false;
	if (typeof canvas === 'undefined') {

		canvas = document.createElement("canvas", {})
		$(video).after(canvas)
	}
	const ctx = canvas.getContext("2d");



	const cor = $('#player6')[0].clientHeight / $('#player6')[0].clientWidth //0.5
	const width = video.clientHeight / video.clientWidth > cor ? video.clientWidth : video.clientHeight / cor ;
	const height = width * cor;

	canvas.width = width;
	canvas.height = height;

	const s = width / 100

	$(canvas).css({
		position: 'absolute',
		top: (video.clientHeight - height) / 2 + "px",
		left: (video.clientWidth - width) / 2 + "px",
	})
	ctx.drawImage(video, 0, 0, 1,1);

	if (ctx.getImageData(0, 0, 1, 1).data[3]) {

		ctx.strokeStyle = "#24FF00";
		ctx.lineWidth = 2;
		ctx.strokeRect(38.5 * s, 21 * s, 19 * s, 22 * s);
	}

}


$(document).ready(function(){

	if (!!window.Playerjs && $('[id ^= "player"]').length) {

		$('[id ^= "player"]').each(function(i, item){

			new Playerjs({
				id:"player6",
				file:[
					{
						"id": item.id,
						"file": item.dataset.url
					}
				]
			});

			if (item.dataset.mask != 0) {

				setInterval(function(){draw($(item).find('video')[0])}, Math.floor(1 / 30))
			}
		})
	}

})


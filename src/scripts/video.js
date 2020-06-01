console.log('VIDEO');

const player = new Playerjs({
	id:"player6",
	file:[
		{
			"id":"s5",
			"file":"https://vrk2.ttk.ru:8082/live/stream6/playlist.m3u8"
		}
	]
});

const canvas = document.createElement("canvas", {})
const video = $('#player6 video')[0]
const ctx = canvas.getContext("2d");

$(video).after(canvas)

// const


const draw = () => {
	if(video.paused || video.ended) return false;


	const cor = $('#player6')[0].clientHeight / $('#player6')[0].clientWidth //0.5

	// console.log(video.clientHeight / video.clientWidth < cor)

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
	if (!$('[id ^= "player"]').length) return false
	setInterval(draw, Math.floor(1 / 30))
})


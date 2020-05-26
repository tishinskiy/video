console.log('video');

const canvas = document.createElement("canvas", {})
const video = document.getElementById('video')

const ctx = canvas.getContext("2d");

document.getElementById('video-block').appendChild(canvas)

const draw = () => {
	if(video.paused || video.ended) return false;

	const width = video.clientWidth;
	const height = video.clientHeight;

	canvas.width = width;
	canvas.height = height;

	const s = Math.floor(width / 100)

	ctx.drawImage(video, 0, 0, width, height);
	ctx.fillStyle = "rgba(255, 165, 0, 0.5)";
	ctx.fillRect(2 * s, 2 * s, 10 * s, 10 * s);
}

document.addEventListener('DOMContentLoaded', () => {
	setInterval(draw, Math.floor(1 / 30))
	console.log('ctx', ctx);
})


console.log('canvasNode', canvas);
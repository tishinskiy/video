console.log('AJAX');

const timeToGud = str => {
	const _str = str.split(' ')
	const date = _str[0].split('-')
	return (`${date[2]}.${date[1]}.${date[0]}<br>${_str[1]}`)
}


const secondToTime = sec => {

	const ss = sec%60
	const mm = (sec - ss) / 60

	return mm+':'+ss
}

$(document).ready(() => {

	const check = () => {

		if (!$('[data-row]').length) return false
		const firstRow = $('[data-row]').eq(0)

		$.get('https://vrk1.ttk.ru/rest/v1/last-event')
		.done(function(data) {

			const arr = data.filter(item => {
				return +item.id >= +firstRow.data('row')
			})

			if (!arr.length) return false

			arr.forEach(item => {
				timeToGud(item.date_from)
				const img = $('<img>')

				if (item.status === 'ok') img.attr('src', 'images/svg/ok.svg')

				if (item.status === 'error') img.attr('src', 'images/svg/warn.svg')


				const row = $('<tr>', {
					class: 'js__stat-row',
					'data-row': item.id
				}).append(
					$('<td>', {
						html: timeToGud(item.date_from)
					}),
					$('<td>', {
						'html': timeToGud(item.date_to)
					}),
					$('<td>', {
						class: 'text--right',
						html: secondToTime(item.interval)
					}),
					$('<td>', {
						class: 'text--center',
					}).append(img),
				)

				row.insertBefore(firstRow)
			})

			firstRow.remove()

			if ($('.static-table__wrap').innerHeight() > 500) {
				
				$('.static-table__wrap').css({
					height: '500px',
					'overflow-y': 'scroll'
				})
			}
		})
		.fail(function() {
			// console.log( "error" );
		})
		.always(function() {
			// console.log( "finished" );
		});


	}

	setInterval(check, 1e4)
})
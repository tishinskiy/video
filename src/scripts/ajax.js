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

const dd = {}

$(document).ready(() => {

	const check = () => {

		$.get('https://vrk1.ttk.ru/rest/v1/last-event')
		.done(function(data) {

			const test = data.map(item => {
				const date = new Date(item.date_from)
				return {
					...item,
					_id: date.getTime()/1000
				}
			})

			if (test.length) {

				for (let i = 0; i < test.length; i++) {

					const item = test[i]
					dd[item._id] = item
				}
			}

			const _arr = []

			for (k in dd) {
				_arr.push(dd[k])
			}

			const arr = _arr.sort(function(a, b){
				return b._id - a._id;
			})

			const content = $('<div>')

			if (!arr.length) return false

			arr.forEach(item => {
				timeToGud(item.date_from)
				const img = $('<img>', {
					style: 'width: 18px;'
				})

				if (item.status === 'ok') img.attr('src', 'images/svg/ok.svg')

				if (item.status === 'error') img.attr('src', 'images/svg/warn.svg')


				const row = $('<tr>', {
					class: 'js__stat-row',
					'data-row': item._id
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

				content.append(row)
			})

			$('.js__statis-body').html(content.html())

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


		setTimeout(check, 1e4)
	}
	check()
})
import { Graphics, Sprite } from './pixi.js'
export const cardNames = [
	'A',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	'10',
	'J',
	'Q',
	'K',
]

export const deckOfCards = []

for (let suit in new Array(4).fill()) {
	for (let key in cardNames) {
		deckOfCards.push(cardNames[key] + ':' + suit)
	}
}

export function getRect(x = 0, y = 0, w = 50, h = 50, option = {}) {
	const {
		radius = 10,
		line = 2,
		color = 0xff0000,
		fill = 0xa2e285,
		alpha = 1,
	} = option
	const roundBox = new Graphics()
	roundBox.lineStyle(line, color, alpha)
	roundBox.beginFill(fill)
	roundBox.drawRoundedRect(x, y, w, h, radius)
	roundBox.endFill()
	roundBox.x = 48
	roundBox.y = 190
	return roundBox
}

export function getCards(cash) {
	return deckOfCards.map((name, i) => {
		const card = new Sprite(cash)
		card.position.set(0.7 * i + 50, 0.7 * i + 50)
		card.scale.set(0.305, 0.305)
		return { name, card }
	})
}

export function setPosition(x1, y1, card, speed) {
	let dx, dy
	card.visible = true
	;(function recursion() {
		const { x, y } = card
		if (x1 === x && y1 === y) return
		if (x1 !== dx) {
			if (Math.abs(x - x1) < speed) dx = x1
			else dx = Math.round(x > x1 ? x - speed : x + speed)
		} else {
			if (Math.abs(y - y1) < speed) dy = y1
			else dy = Math.round(y > y1 ? y - speed : y + speed)
		}
		card.position.set(dx, dy || y)
		requestAnimationFrame(recursion)
	})()
}

export function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1))
		;[array[i], array[j]] = [array[j], array[i]]
	}
	return array
}

import * as PIXI from 'pixi.js'

export default PIXI
export const Application = PIXI.Application
export const Sprite = PIXI.Sprite
export const Rectangle = PIXI.Rectangle
export const TextureCache = PIXI.utils.TextureCache
export const Graphics = PIXI.Graphics

export const cardNames: Array<string> = [
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

export const deckOfCards: Array<string> = []

for (let suit in new Array(4).fill(null)) {
	for (let key in cardNames) {
		deckOfCards.push(cardNames[key] + ':' + suit)
	}
}

interface IOption {
	radius?: number
	line?: number
	color?: number
	fill?: number
	alpha?: number
}

export function getRect(
	x = 0,
	y = 0,
	w = 50,
	h = 50,
	option: IOption = {}
): object {
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

export interface ICard {
	name: string
	card: any
}

export function getCards(cash): Array<ICard> {
	return deckOfCards.map((name, i) => {
		const card = new Sprite(cash)
		card.position.set(0.7 * i + 50, 0.7 * i + 50)
		card.scale.set(0.305, 0.305)
		return { name, card }
	})
}

export function setPosition(
	x1: number,
	y1: number,
	card: any,
	speed: number
): void {
	let dx: number, dy: number
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

export function shuffle(array: Array<any>): Array<any> {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1))
		;[array[i], array[j]] = [array[j], array[i]]
	}
	return array
}

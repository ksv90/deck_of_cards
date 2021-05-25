import PIXI, { Application, loader, resources, Sprite } from './modules/pixi.js'
import {
	deckOfCards,
	getRect,
	getCards,
	setPosition,
	shuffle,
} from './modules/assistant.js'

const SHIRT = 'img/shirt.png'
const CARDS = 'img/cards.json'
const SPEED = 10

const app = new Application({
	width: 1200,
	height: 768,
	antialias: true,
	transparent: true,
	resolution: 1,
})
document.body.appendChild(app.view)

let cards = []

loader.add([SHIRT, CARDS]).load(() => {
	const getSprite = resources[CARDS].textures

	cards = getCards(resources[SHIRT].texture)
	const cardsGroup = new PIXI.Container()
	cardsGroup.addChild(...cards.map(({ card }) => card))
	cardsGroup.interactive = true
	cardsGroup.buttonMode = true

	const rect1 = getRect(50 + 35, 230, 220, 308)
	const rect2 = getRect(300 + 35, 230, 220, 308)
	const rect3 = getRect(550 + 35, 230, 220, 308)
	const rect4 = getRect(800 + 35, 230, 220, 308)

	cardsGroup.on('click', () => {
		let j = 0
		openCards.forEach(({ name, card }, i) => {
			const [, suit] = name.split(':')
			if (+suit === 0)
				setTimeout(() => {
					setPosition(53 + 44 + 35, 417, card, SPEED)
					cards[j++].card.visible = false
				}, 30 * i)
			if (+suit === 1)
				setTimeout(() => {
					setPosition(300 + 44 + 35, 417, card, SPEED)
					cards[j++].card.visible = false
				}, 30 * i)
			if (+suit === 2)
				setTimeout(() => {
					setPosition(550 + 44 + 35, 417, card, SPEED)
					cards[j++].card.visible = false
				}, 30 * i)
			if (+suit === 3)
				setTimeout(() => {
					setPosition(800 + 44 + 35, 417, card, SPEED)
					cards[j++].card.visible = false
				}, 30 * i)
		})
	})

	const openCards = shuffle(
		deckOfCards.map((name, i) => {
			const card = new Sprite(getSprite[name])
			card.visible = false
			card.position.set(0.7 * i + 94, 0.7 * i + 49)
			// explorer.position.set(20 * i + 10, 5 * i + 10)
			return { name, card }
		})
	)
	app.stage.addChild(
		rect1,
		rect2,
		rect3,
		rect4,
		...openCards.map(({ card }) => card),
		cardsGroup
	)
})

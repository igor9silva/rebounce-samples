"use strict";

/* Variables */
const balls = {};
const springSystem = new rebound.SpringSystem();

/* Methods */
const random = (min, max) => (Math.floor(Math.random() * (max - min + 1) + min));
const scale = (elem, amount) => {
	const xfrm = 'scale3d(' + amount + ', ' + amount + ', 1) ';
	elem.style.webkitTransform = elem.style.transform = xfrm;
}
const setEvents = (elem) => {
	elem.onmousedown 	= function() { balls[this.id].spring.setEndValue(0.5); };
	elem.onmouseover 	= function() { balls[this.id].spring.setEndValue(1.5); };
	elem.onmouseout 		= function() { balls[this.id].spring.setEndValue(1.0); };
	elem.onmouseup 		= function() { balls[this.id].spring.setEndValue(1.5); };
	//elem.onclick 			= function() { console.log(balls[this.id].spring.getCurrentValue()) };
}

/* Logic */
document.addEventListener('DOMContentLoaded', () => {
	const items = Array.prototype.slice.call(document.getElementById('main').children);
	items.forEach((item) => balls[item.id] = { elem: item });

	for (let id in balls) {
		const tension = random(10, 50);
		const friction = random(1, 10);
		console.log(id, tension, friction);

		balls[id].spring = springSystem.createSpring(tension, friction);
		setEvents(balls[id].elem);

		balls[id].spring.addListener({ id: id, onSpringUpdate: function(spring) {
			scale(balls[this.id].elem, spring.getCurrentValue());
		}});

		// Start at 100%
		balls[id].spring.setEndValue(1);
	}
});
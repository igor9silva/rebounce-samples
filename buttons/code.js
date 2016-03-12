"use strict";

(function () {
	/* Dependencies */
	var SpringSystem = rebound.SpringSystem;

	/* Variables */
	var balls = {};
	var springSystem = new SpringSystem();

	/* Methods */
	function random(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	function scale(elem, amount) {
		var xfrm = 'scale3d(' + amount + ', ' + amount + ', 1) ';
		elem.style.webkitTransform = elem.style.transform = xfrm;
	}

	function setEvents(elem) {
		elem.onmousedown 	= function() { balls[this.id].spring.setEndValue(0.5); };
		elem.onmouseover 	= function() { balls[this.id].spring.setEndValue(1.5); };
		elem.onmouseout 	= function() { balls[this.id].spring.setEndValue(1.0); };
		elem.onmouseup 		= function() { balls[this.id].spring.setEndValue(1.5); };
		//elem.onclick 		= function() { console.log(balls[this.id].spring.getCurrentValue()) };
	}

	/* Events */
	document.addEventListener('DOMContentLoaded', function() {
		var items = Array.prototype.slice.call(document.getElementById('main').children);
		items.forEach(function(item) { balls[item.id] = { elem: item }; });

		for (var id in balls) {
			var tension = random(10, 50);
			var friction = random(1, 10);
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
})();
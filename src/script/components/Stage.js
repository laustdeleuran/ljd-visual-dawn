/* @file script/components/Paper */
'use strict';

import paper from 'paper/dist/paper-core';

/**
 * Paint brush stroke
 */
export default class Stage {
	constructor (canvasElement) {
		canvasElement = typeof canvasElement === 'string' ? document.getElementById(canvasElement) : canvasElement;

		this.canvas = canvasElement;
		this.paper = paper.setup(this.canvas);
	}
	tick (event) {
		if (this.ticks && this.ticks.length) {
			this.ticks.forEach((tick) => tick(event));

			this.paper.view.onFrame = (event) => this.tick(event);
		} else {
			delete this.paper.view.onFrame;
		}
	}
	addTick (fn) {
		this.ticks = this.ticks || [];
		var index = this.ticks.indexOf(fn);

		// Add function to render stack
		if (index === -1) {
			this.ticks.push(fn);
			index === this.ticks.indexOf(fn);
		}

		// Return deregistering function
		return () => this.ticks.splice(index, 1);
	}
}
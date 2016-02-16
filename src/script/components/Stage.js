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
}
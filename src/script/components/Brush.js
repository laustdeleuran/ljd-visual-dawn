/* @file script/components/Brush */
'use strict';

import paper from 'paper/dist/paper-core';

/**
 * Paint brush stroke
 */
export default class Brush {
	constructor(x = 600, y = 600) {
		this.color = new paper.Color(255, 255, 255);

		// Set up PaperJS tool
		this.tool = new paper.Tool();
		this.length = 10;

		this.startX = x;
		this.startY = y;

		// Create path
		this.path = this.createPath();
	}
	createPath () {
		if (!this.path) {
			this.path = new paper.Path({
				segments: [[this.startX + this.length, this.startY]],
				fillColor: 'white',
				strokeColor: 'white'
			});
		}
		return this.path;
	}
	addPoint (point) {
		if (this.path) {
			let diff = this.path.lastSegment.point.subtract(point);
			if (Math.abs(diff.x) > 5 || Math.abs(diff.y) > 5) {
				let top = point.add(Math.random() * 2);
				let bottom = point.subtract(Math.random() * 2);
	
				this.path.add(top);
				this.path.insert(0, bottom);
				this.path.smooth();
			}
		}
	}
	endPath (point) {
		if (this.path) {
			this.path.add(point);
			this.path.smooth();
			this.path.closed = true;

			delete this.path;
			delete this.count;
		}
	}
	draw (event) {
		if (this.path) {
			this.count = this.count === undefined ? 0 : this.count+1;
			this.length += (this.count)/200;

			let angle = event ? event.time * 360 % 360 : 0;

			let nextPoint = this.path.lastSegment.point.clone();
			nextPoint.angle = angle;
			nextPoint.length = this.length;

			this.addPoint(nextPoint.add(this.startX, this.startY));
		}
	}
}
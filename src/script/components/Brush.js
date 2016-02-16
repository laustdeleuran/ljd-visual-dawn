/* @file script/components/Brush */
'use strict';

import paper from 'paper/dist/paper-core';

/**
 * Paint brush stroke
 */
export default class Brush {
	constructor() {
		this.color = new paper.Color(255, 255, 255);

		// Set up PaperJS tool
		this.tool = new paper.Tool({
			maxDistance: 20
		});
		this.minSize = 5;
		this.carryLength = 0;

		// Event listeners
		this.tool.onMouseDrag = (event) => this.onMouseDrag(event);
		this.tool.onMouseUp = (event) => this.onMouseUp(event);
	}
	getPath (createPoint) {
		if (!this.path) {
			this.path = new paper.Path({
				fillColor: 'white'
			});
			this.path.add(createPoint);
		}
		return this.path;
	}
	endPath (point) {
		if (this.path) {
			this.path.add(point);
			this.path.closed = true;
			this.path.smooth();

			delete this.path;
		}
	}
	randomDrips(point){
		var randomVector = new paper.Point((Math.random()-0.5)*60, (Math.random()-0.5)*60);

		var circle = new paper.Path.Circle(point.add(randomVector), 30*Math.pow(Math.random(), 5));
		circle.scale(Math.random()*0.5+0.5, Math.random()*0.5+0.5);

		paper.project.activeLayer.lastChild.fillColor = 'white';
	}
	onMouseDrag(event) {
		if (event.delta.length > this.minSize) {

			let path = this.getPath(event.lastPoint);

			let step = event.delta;
			step.angle = step.angle + 90;

			let stepPoint = step.normalize();
			let stepReci = stepPoint.multiply(50).multiply(1 / step.length);

			let top = event.middlePoint.add(stepReci);
			let bottom = event.middlePoint.subtract(stepReci);

			this.carryLength = this.carryLength + step.length;

			if (this.carryLength > stepReci.length) {
				path.add(top);
				path.insert(0, bottom);
				path.smooth();


				if (stepReci.length > 5) { 

					let frontDrip = new paper.Path({
						fillColor: this.color
					});

					frontDrip.add(top);
					frontDrip.add(bottom);
					frontDrip.add(event.middlePoint.add(event.delta)); 

					frontDrip.closed = true;
					frontDrip.smooth();

					frontDrip.firstCurve.segment2.handleOut = new paper.Point(0, 0).add(event.delta);
					frontDrip.firstCurve.segment2.handleIn = new paper.Point(0, 0);
					frontDrip.lastCurve.segment2.handleOut = new paper.Point(0, 0);
					frontDrip.lastCurve.segment2.handleIn = new paper.Point(0, 0).add(event.delta);

				}

				this.carryLength = 0;
			}

			//make some random drips
			var i = 0;

			if (Math.random() < 0.05) {

				var min = 1;
				var max = 7;
				var stop = Math.floor(Math.random() * (max - min + 1)) + min;

				while (i < stop) {
					this.randomDrips(event.lastPoint);
					i++;
				}
			}
		}
	}
	onMouseUp (event) {
		this.endPath(event.point);
	}
}
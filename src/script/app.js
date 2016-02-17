/* @file script/components/splat */
'use strict';

import Stage from './components/Stage';
import Brush from './components/Brush';

import paper from 'paper/dist/paper-core';
global.paper = paper;

function init() {
	global.stage = new Stage(document.getElementById('stage'));
	global.brush = new Brush(document.documentElement.offsetWidth/2, document.documentElement.offsetHeight/2);

	var dereg = global.stage.addTick((event) => global.brush.draw(event));
	global.stage.tick();

	setTimeout(dereg, 15000);
}
document.addEventListener('DOMContentLoaded', init);
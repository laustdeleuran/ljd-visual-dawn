/* @file script/components/splat */
'use strict';

import Stage from './components/Stage';
import Brush from './components/Brush';

function init() {
	global.stage = new Stage(document.getElementById('stage'));
	global.brush = new Brush();
}
document.addEventListener('DOMContentLoaded', init);
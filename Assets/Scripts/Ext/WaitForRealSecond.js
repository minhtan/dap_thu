#pragma strict

static function waitForRealSecond(time : float){
	var startTime : float = Time.realtimeSinceStartup;
	while(Time.realtimeSinceStartup < startTime + time){
		yield;
	}
}
#pragma strict

static function wait(time : float){
	var startTime : float = Time.realtimeSinceStartup;
	while(Time.realtimeSinceStartup < startTime + time){
		yield;
	}
}
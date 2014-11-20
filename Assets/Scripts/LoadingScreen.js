#pragma strict

var msg : String = "loading, please wait";

function Start () {
	Invoke("testLoad", 2.0);
}

function testLoad() {
	LevelManager.load("menu");
}
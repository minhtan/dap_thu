#pragma strict

var click : boolean = false;

function PauseClick(){
	if(click == false){
		Time.timeScale = 1;
		click = true;
		return;
	}else{
		Time.timeScale = 0;
		click = false;
		return;
	}
}
#pragma strict

function Start(){
	ShowScore(10);
}

function getScore(){
	
}

function ShowScore(score : int){
	GetComponent(UI.Text).text = "Diem :" + score;
}
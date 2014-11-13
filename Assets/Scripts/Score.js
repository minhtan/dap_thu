#pragma strict

function Start(){
	ShowScore(10);
}

function ShowScore(score : int){
	GetComponent(UI.Text).text = "Diem :" + score;
}
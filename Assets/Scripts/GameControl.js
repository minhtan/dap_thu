#pragma strict
#pragma downcast
import System.Collections.Generic;

//***************************************************************************************************
//*******************************************VARIABLES***********************************************
//***************************************************************************************************

//gameover?
private var gameover : boolean;

//Thu duoc luu vao trong array
private var listThu : List.<GameObject>;

//Thoi gian giua goc cac lan thu hien
var interval : float = 3.0;

//diem
var currentScore : int;

//moc diem
class ScoreMilestone extends System.Object{
	var score : int;
	var interval : float;
}
var scoreMilestones : ScoreMilestone[];

//***************************************************************************************************
//*******************************************FUNCTIONS***********************************************
//***************************************************************************************************

function Awake(){
	gameover = false;
}

function Start () {
	listThu = new List.<GameObject>();
 	nhetThuVaoChuong();
 	showThu();
}

function Update(){
	checkScore();
}

function checkScore(){
	for(var i : int = 0; i < scoreMilestones.Length; i++){
		if(scoreMilestones[i].score != null && scoreMilestones[i].interval != null){
			if(currentScore > scoreMilestones[i].score && interval > scoreMilestones[i].interval){
				interval = scoreMilestones[i].interval;
				break;
			}
		}
	}
}

function nhetThuVaoChuong(){
	for(var thu : Transform in transform){
		listThu.Add(thu.gameObject);
	}
}

function randomThu(range : int){
	return Random.Range(0, range);
}

function filterHiddenThu(){
	var listHiddenThu : List.<GameObject> = new List.<GameObject>();
	for(var thu : GameObject in listThu){
		if(thu.GetComponent.<TrangThai>().isAlive() == false)
			listHiddenThu.Add(thu);
	}
	return listHiddenThu;
}

function showThu(){
	var listHiddenThu : List.<GameObject>;
	while(!gameover){
		listHiddenThu = filterHiddenThu();
		if(listHiddenThu.Count > 0){
			var randomNo : int = randomThu(listHiddenThu.Count - 1);
			listHiddenThu[randomNo].GetComponent.<TrangThai>().show();
		}
		yield WaitForSeconds (interval);
	}
}

function dapThu(thu : GameObject){
	var trangThaiScript : TrangThai = thu.GetComponent.<TrangThai>();
	if(trangThaiScript.isAlive() == true){
		trangThaiScript.die();
	}
}



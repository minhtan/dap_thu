#pragma strict
#pragma downcast
import System.Collections.Generic;

//***************************************************************************************************
//*******************************************GAME CORE***********************************************
//***************************************************************************************************

//input reference
private var input : InputControl;

//sound reference
private var sound : SoundControl;

//gameover?
private var gameover : boolean;

//Thu duoc luu vao trong array
private var listThu : List.<GameObject>;

//Thoi gian goc giua cac lan thu hien
var interval : float = 3.0;

function gameInit(){
	gameover = false;
	currentScore = 0;
	faultUsed = 0;
	powerUpUsed = 0;
	powerX2 = false;
	powerSlow = false;
}

function Awake(){
	gameInit();
	input = GetComponent.<InputControl>();
	sound = GetComponent.<SoundControl>();
}

function Start () {
	listThu = new List.<GameObject>();
 	getThuList();
 	showThu();
}

function Update(){
	checkScore();
	checkHit();
}

function getThuList(){
	for(var thu : Transform in transform){
		listThu.Add(thu.gameObject);
	}
}

function random(range : int){
	return Random.Range(0, range);
}

function filterHiddenThu(){
	var listHiddenThu : List.<GameObject> = new List.<GameObject>();
	for(var thu : GameObject in listThu){
		if(thu.GetComponent.<TrangThai>().isDead())
			listHiddenThu.Add(thu);
	}
	return listHiddenThu;
}

function waitForRealSecond(time : float){
	var startTime : float = Time.realtimeSinceStartup;
	while(Time.realtimeSinceStartup < startTime + time){
		yield;
	}
}

function showThu(){
	var listHiddenThu : List.<GameObject>;
	while(!gameover){
		listHiddenThu = filterHiddenThu();
		if(listHiddenThu.Count > 0){
			var trangThaiThu : TrangThai = listHiddenThu[random(listHiddenThu.Count)].GetComponent.<TrangThai>();
			trangThaiThu.show(randomPowerUp());
		}
		yield waitForRealSecond (interval);
	}
}

function checkHit(){
	var thu : GameObject = input.hitDetect();
	if(thu != null && thu.GetComponent.<TrangThai>() != null){
		var trangThaiThu : TrangThai = thu.GetComponent.<TrangThai>();
		if(trangThaiThu.isHitable()){
			trangThaiThu.getHit();
			sound.playHitSound();
			scoring(trangThaiThu.getThuPoint());
		}
	}
}

function miss(){
	faultUsed ++;
}

//***************************************************************************************************
//*******************************************SCORING*************************************************
//***************************************************************************************************

//so lan duoc danh truot
var faultLimit : int = 3;
var faultUsed : int;

//diem
var currentScore : int;

//moc diem
class ScoreMilestone extends System.Object{
	var score : int;
	var interval : float;
}
var scoreMilestones : ScoreMilestone[];

function checkScore(){
	if(faultUsed >= faultLimit){
		gameover = true;
	}
	for(var i : int = 0; i < scoreMilestones.Length; i++){
		if(scoreMilestones[i].score != null && scoreMilestones[i].interval != null){
			if(currentScore > scoreMilestones[i].score && interval > scoreMilestones[i].interval){
				interval = scoreMilestones[i].interval;
				break;
			}
		}
	}
}

function scoring(thuPoint : int){
	if(powerX2){
		currentScore = currentScore + thuPoint * 2;
	}else{
		currentScore = currentScore + thuPoint;
	}
}

//***************************************************************************************************
//*******************************************POWER UP************************************************
//***************************************************************************************************

//power up
var powerUpLimit : int = 3;
var powerUpUsed : int;
var powerUpChance : int = 33;

//x2
private var powerX2 : boolean;
var x2time : int = 5;

//slow mo
private var powerSlow : boolean;
var slowTime : int = 5;

function randomPowerUp(){
	if(powerUpUsed < powerUpLimit && random(100) < powerUpChance){
		switch(random(2)){
			case 0:
				if(!powerX2){
					powerUpUsed ++;
					return 1.0;
				}
				break;
			case 1:
				if(!powerSlow){
					powerUpUsed ++;
					return 2.0;
				}
				break;
			default:
				break;
		}
	}
	return 0.0;
}

function hitX2(){
	powerX2 = true;
	yield WaitForSeconds (x2time);
	powerX2 = false;
}

function hitSlow(){
	powerSlow = true;
	Time.timeScale = 0.5;
	yield WaitForSeconds (slowTime);
	powerSlow = false;
	Time.timeScale = 1.0;
}
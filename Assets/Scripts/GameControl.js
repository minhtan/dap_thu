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
			trangThaiThu.show(randomEvent());
		}
		yield waitForRealSecond (interval);
	}
}

function checkHit(){
	var thu : GameObject = input.hitDetect();
	if(thu != null){
		sound.playHitSound();
		if(thu.GetComponent.<TrangThai>() != null){
			var trangThaiThu : TrangThai = thu.GetComponent.<TrangThai>();
			if(trangThaiThu.isHitable()){
				if(trangThaiThu.getHit()){
					sound.playDieSound();
					scoring(trangThaiThu.getThuPoint());
				}
			}
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
	if(faultUsed >= faultLimit - 1 || currentScore < 0){
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
	switch(thuPoint){
		case 0:
			cancelPowerUp();
			faultUsed ++;
			break;
		case -1:
			cancelPowerUp();
			currentScore --;
			break;
		default:
			if(powerX2){
				currentScore += thuPoint * 2;
			}else{
				currentScore += thuPoint;
			}
			break;		
	}
}

//***************************************************************************************************
//*******************************************POWER UP************************************************
//***************************************************************************************************

//power up
var powerUpLimit : int = 3;
var powerUpUsed : int;
var powerUpChance : int = 33;
var powerTriggerScore : int = 10;
var bigThuChance : int = 33;
var bigThuTriggerScore : int = 10;
var venomThuChance : int = 33;
var cuteThuChance : int = 33;
var thuTypeTriggerScore : int = 10;

//x2
var powerX2 : boolean = false;
var x2time : int = 10;

//slow mo
var powerSlow : boolean = false;
var slowTime : int = 10;

function cancelPowerUp(){
	powerX2 = false;
	powerSlow = false;
}

function randomEvent(){
	var event : float = 0.0;
	if(currentScore > powerTriggerScore && powerUpUsed < powerUpLimit && random(100) < powerUpChance){
		event = makePowerUp();
	}else if(currentScore > bigThuTriggerScore && random(100) < bigThuChance){
		event = makeBigThu();
	}else if(currentScore > thuTypeTriggerScore && random(100) < venomThuChance){
		event = makeVenomThu();
	}else if(currentScore > thuTypeTriggerScore && random(100) < cuteThuChance){
		event = makeCuteThu();
	}
	return event;
}

function makePowerUp(){
	var powerUp : float;
	switch(random(2)){
		case 0:
			if(!powerX2){
				powerUpUsed ++;
				powerUp = 1.0;
			}
			break;
		case 1:
			if(!powerSlow){
				powerUpUsed ++;
				powerUp = 2.0;
			}
			break;
		default:
			powerUp = 0.0;
			break;
	}
	return powerUp;
}

function makeBigThu(){
	return 3.0;
}

function makeVenomThu(){
	return 4.0;
}

function makeCuteThu(){
	return 5.0;
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
#pragma strict
#pragma downcast
import System.Collections.Generic;

//***************************************************************************************************
//*******************************************GAME CORE***********************************************
//***************************************************************************************************

//input reference
private var input : InputControl;

//gameover?
var gameover : boolean;

//Thu duoc luu vao trong array
private var listThu : List.<GameObject>;

//Thoi gian goc giua cac lan thu hien
var interval : float = 3.0;

//pasue
var pause : boolean;
private var currentTimeScale : float;

function getThuList(){
	listThu = new List.<GameObject>();
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

function showThu(){
	var listHiddenThu : List.<GameObject>;
	while(!gameover){
		listHiddenThu = filterHiddenThu();
		if(listHiddenThu.Count > 0){
			var thuToShow : TrangThai = listHiddenThu[random(listHiddenThu.Count)].GetComponent.<TrangThai>();
			thuToShow.show(randomEvent());
		}
		yield WaitForSeconds (interval);
	}
}

function checkHit(){
	var thu : GameObject = input.hitDetect();
	if(thu != null){
		SoundControl.sound.playHitSound();
		if(thu.GetComponent.<TrangThai>() != null){
			var trangThaiThu : TrangThai = thu.GetComponent.<TrangThai>();
			if(trangThaiThu.isHitable() && !pause){
				if(trangThaiThu.getHit()){
					SoundControl.sound.playDieSound();
					scoring(trangThaiThu.getThuPoint());
				}
			}
		}
	}
}

function miss(){
	faultLimit --;
}

function pauseGame(){
	if(!pause){
		pause = true;
		currentTimeScale = Time.timeScale;
		Time.timeScale = 0;
		return true;
	}else{
		pause = false;
		Time.timeScale = currentTimeScale;
		return false;
	}
}

//***************************************************************************************************
//*******************************************SCORING*************************************************
//***************************************************************************************************

//so lan duoc danh truot
var faultLimit : int = 3;

//diem
var currentScore : int;

//moc diem
class ScoreMilestone extends System.Object{
	var score : int;
	var interval : float;
}
var scoreMilestones : ScoreMilestone[];

function checkScore(){
	if(faultLimit <= 1 || currentScore < 0){
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
			faultLimit --;
			break;
		case -1:
			cancelPowerUp();
			currentScore --;
			break;
		default:
			if(powerX2){
				currentScore += thuPoint * x2Ratio;
			}else{
				currentScore += thuPoint;
			}
			break;		
	}
}

function getScore(){
	return currentScore;
}

function getLife(){
	return faultLimit;
}

//***************************************************************************************************
//*******************************************POWER UP************************************************
//***************************************************************************************************

//power up
var powerUpSlowLimit : int = 5;
var powerUpX2Limit : int = 5;
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
private var x2Ratio : int = 2;
var x2Boost : int = 3;

//slow mo
var powerSlow : boolean = false;
var slowTime : int = 10;
private var slowRatio : int = 1;
var slowBoost : int = 2;

function setX2Boost(){
	x2Ratio = x2Boost;	
}

function setSlowBoost(){
	slowRatio = slowBoost;
}

function cancelPowerUp(){
	powerX2 = false;
	powerSlow = false;
}

//random event
// 0 - normal
// 1 - x2
// 2 - slow
// 3 - big
// 4 - venom
// 5 - cute
function randomEvent(){
	if(currentScore > powerTriggerScore && !powerX2 && powerUpX2Limit > 0 && random(100) < powerUpChance){
		powerUpX2Limit --;
		return 1.0;
	}else if(currentScore > powerTriggerScore && !powerSlow && powerUpSlowLimit > 0 && random(100) < powerUpChance){
		powerUpSlowLimit --;
		return 2.0;
	}else if(currentScore > bigThuTriggerScore && random(100) < bigThuChance){
		return 3.0;
	}else if(currentScore > thuTypeTriggerScore && random(100) < venomThuChance){
		return 4.0;
	}else if(currentScore > thuTypeTriggerScore && random(100) < cuteThuChance){
		return 5.0;
	}else{
		return 0.0;
	}
}

function hitX2(){
	powerX2 = true;
	yield WaitForRealSecond.wait (x2time);
	powerX2 = false;
}

function hitSlow(){
	powerSlow = true;
	Time.timeScale = 0.5;
	yield WaitForRealSecond.wait (slowTime * slowRatio);
	powerSlow = false;
	Time.timeScale = 1.0;
}

function isX2(){
	return powerX2;
}

function isSlow(){
	return powerSlow;
}

//***************************************************************************************************
//*******************************************GAME****************************************************
//***************************************************************************************************

function gameInit(){
	gameover = false;
	pause = false;
	currentScore = 0;
	Time.timeScale = 1;
}

function Awake(){
	input = GetComponent.<InputControl>();
}

function Start () {
 	getThuList();
 	gameInit();
 	showThu();
}

function Update(){
	checkScore();
	checkHit();
}
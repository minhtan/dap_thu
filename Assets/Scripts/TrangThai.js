#pragma strict
//thoi gian con thu xuat hien
var showTime : float = 2.0f;

//components reference
private var anim : Animator;
private var gameControl : GameControl;
private var isHit : boolean;

//points for this thu
private var thuPoint : int;
private var thuHealth : int;

function getThuPoint(){
	return thuPoint;
}

function isHitable(){
	if(!anim.GetCurrentAnimatorStateInfo(0).IsName("hidden") && !anim.GetCurrentAnimatorStateInfo(0).IsName("dying") && !isHit){
		return true;
	}else{
		return false;
	}
}

function isDead(){
	if(anim.GetCurrentAnimatorStateInfo(0).IsName("hidden")){
		return true;
	}else{
		return false;
	}
}

function Awake () {
	anim = GetComponent.<Animator>();
	gameControl = GameObject.Find("/HolesContainer").GetComponent.<GameControl>();
	anim.SetFloat("powerUp", 0.0);
	isHit = false;
}

function die(){
	if(anim.GetCurrentAnimatorStateInfo(0).IsName("showing")){
		anim.Play("dying", -1, 1 - anim.GetCurrentAnimatorStateInfo(0).normalizedTime);
	}else if(anim.GetCurrentAnimatorStateInfo(0).IsName("hiding")){
		anim.Play("dying", -1, anim.GetCurrentAnimatorStateInfo(0).normalizedTime);
	}else{
		anim.Play("dying", -1, 0);
	}
	CancelInvoke("hide");
	isHit = true;
}

function show(event : float){
	anim.SetFloat("powerUp", event);
	anim.SetTrigger("show");
	isHit = false;
	checkThuType(event);
	Invoke("hide", showTime);
}

function checkThuType(event : float){
	switch(event){
		case 3.0:
			thuPoint = 2;
			thuHealth = 2;
			break;
		case 4.0:
			thuPoint = 0;
			thuHealth = 1;
			break;
		case 5.0:
			thuPoint = -1;
			thuHealth = 1;
			break;
		default:
			thuPoint = 1;
			thuHealth = 1;
			break;
	}
}

function hide(){
	anim.SetTrigger("hide");
	checkMiss();
	checkSpecial();
}

function checkSpecial(){
	if(anim.GetFloat("powerUp") == 1.0){
		gameControl.x2ShowNoMore();
	}else if(anim.GetFloat("powerUp") == 2.0){
		gameControl.slowShowNoMore();
	}
}

function checkMiss(){
	while(true){
		if(isHit){
			break;
		}else{
			if(anim.GetCurrentAnimatorStateInfo(0).IsName("hidden") && anim.GetFloat("powerUp") < 4){
				gameControl.miss();
				break;
			}
		}
		yield;
	}
}

function checkPowerUp(){
	switch(anim.GetFloat("powerUp")){
		case 1.0:
			gameControl.hitX2();
			break;
		case 2.0:
			gameControl.hitSlow();
			break;
		default:
			break;
	}
}

function getHit(){
	thuHealth --;
	if(thuHealth == 0){
		checkPowerUp();
		checkSpecial();
		die();
		return true;
	}else{
		return false;
	}
}
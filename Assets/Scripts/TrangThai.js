#pragma strict
//thoi gian con thu xuat hien
var showTime : float = 2.0f;

//components reference
private var anim : Animator;
private var gameControl : GameControl;
private var isHit : boolean;

//points for this thu
var thuPoint : int = 1;

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

function show(powerUp : float){
	anim.SetFloat("powerUp", powerUp);
	anim.SetTrigger("show");
	isHit = false;
	Invoke("hide", showTime);
}

function hide(){
	anim.SetTrigger("hide");
	checkMiss();
}

function checkMiss(){
	while(true){
		if(isHit){
			break;
		}else{
			if(anim.GetCurrentAnimatorStateInfo(0).IsName("hidden")){
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
	checkPowerUp();
	die();
}
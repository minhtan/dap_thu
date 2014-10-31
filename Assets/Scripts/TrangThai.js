#pragma strict
//thoi gian con thu xuat hien
var showTime : float = 2.0f;

//components reference
private var anim : Animator;
private var gameControl : GameControl;

//points for this thu
var thuPoint : int = 1;

//click control
private var clicked : boolean;
var clickInterval : float;

function isClicked(){
	return clicked;
}

function click(){
	clicked = true;
	Invoke("unclick", clickInterval);
}

function unclick(){
	clicked = false;
}
//end click control

function getThuPoint(){
	return thuPoint;
}

function isHitable(){
	if(anim.GetCurrentAnimatorStateInfo(0).IsName("showed") || anim.GetCurrentAnimatorStateInfo(0).IsName("showing")){
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
	clicked = false;
	anim.SetFloat("powerUp", 0.0);
}

function die(){
	anim.SetTrigger("die");
}

function show(){
	anim.SetTrigger("show");
	Invoke("hide", showTime);
}

function show(powerUp : float){
	anim.SetFloat("powerUp", powerUp);
	anim.SetTrigger("show");
	Invoke("hide", showTime);
}

function hide(){
	anim.SetTrigger("hide");
	gameControl.miss();
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
	click();
	CancelInvoke("hide");
	die();
}
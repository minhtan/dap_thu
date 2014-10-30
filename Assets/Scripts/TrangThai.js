#pragma strict
//trang thai con thu 
//0: an, 1: hien, -1: chet
var alive : boolean = false;
//thoi gian con thu xuat hien
var showTime : float = 2.0f;
//components reference
private var anim : Animator;

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

function isAlive(){
	return alive;
}
// end click control

function Awake () {
	anim = GetComponent.<Animator>();
	clicked = false;
}

function Update(){
	if(anim.GetCurrentAnimatorStateInfo(0).IsName("hidden")){
		alive = false;
	}else{
		alive = true;
	}
}

function die(){
	anim.SetTrigger("die");
}

function show(){
	anim.SetTrigger("show");
	Invoke("hide", showTime);
}

function hide(){
	anim.SetTrigger("hide");
}

function getHit(){
	if(alive == true && anim.GetCurrentAnimatorStateInfo(0).IsName("showed")){
		click();
		CancelInvoke("hide");
		die();
	}
}
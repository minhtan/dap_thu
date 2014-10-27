#pragma strict
//trang thai con thu 
//0: an, 1: hien, -1: chet
var alive : boolean = false;
//thoi gian con thu xuat hien
var showTime : float = 2.0f;
//components reference
private var anim : Animator;

function Awake () {
	anim = GetComponent.<Animator>();
}

function isAlive(){
	return alive;
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
	if(alive == true){
		CancelInvoke("hide");
		die();
	}
}
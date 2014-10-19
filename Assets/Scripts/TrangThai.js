#pragma strict
//trang thai con thu 
//0: an, 1: hien, -1: chet
var trangThai : int = 0;
//thoi gian con thu xuat hien
var showTime : float = 5.0f;
//components reference
private var anim : Animator;

function Awake () {
	anim = GetComponent.<Animator>();
}

function getTrangThai(){
	return trangThai;
}

function die(){
	trangThai = -1;
	anim.SetTrigger("die");
}

function show(){
	trangThai = 1;
	anim.SetTrigger("show");
	Invoke("hide", showTime);
}

function hide(){
	trangThai = 0;
	anim.SetTrigger("hide");
}

function getHit(){
	if(trangThai == 1){
		CancelInvoke("hide");
		die();
	}
}
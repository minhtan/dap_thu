#pragma strict
//trang thai con thu 
//0: an, 1: hien, -1: chet
private var trangThai : int;
//thoi gian con thu xuat hien
var showTime : float = 5.0f;

function Start () {
	hide();
}

function Update () {
	updateTrangThai(false);
}

function updateTrangThai(dapBua:boolean){
	switch(trangThai){
		case 0:
			break;
		case 1:
			if(dapBua){
				CancelInvoke("hide");
				die();
			}
			break;
		case -1:
			hide();
			break;		
	}
}

public function getTrangThai(){
	return trangThai;
}
function die(){
	trangThai = -1;
}
function show(){
	trangThai = 1;
//	Invoke("hide", showTime);
}
function hide(){
	trangThai = 0;
}
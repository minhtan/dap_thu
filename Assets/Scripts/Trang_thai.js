#pragma strict
//trang thai con thu 
//0: an, 1: hien, -1: chet
var trangThai : int;
//thoi gian con thu xuat hien
var showTime : float = 5.0;
//thoi gian bat dau hien
var startTime : float;

function Start () {
	Hide();
	Show();
}

function Update () {
	if(Input.GetButton("Fire1")){
		control(true);
	}else{
		control(false);
	}
}
function HitDetect(){
	
}
function control(dapBua:boolean){
	switch(trangThai){
		case 0:
			break;
		case 1:
			if(Time.time - startTime < showTime){
				if(dapBua){
					Die();
				}
			}else{
				Hide();
			}
			break;
		case -1:
			Hide();
			break;		
	}
}

function Die(){
	trangThai = -1;
	print(trangThai);
}
function Show(){
	trangThai = 1;
	startTime = Time.time;
	print(trangThai);
}
function Hide(){
	trangThai = 0;
	print(trangThai);
}
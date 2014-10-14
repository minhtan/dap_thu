#pragma strict
//trang thai con thu 
//0: an, 1: hien, -1: chet
private var trangThai : int;
//thoi gian con thu xuat hien
var showTime : float = 5.0;
//id cua thu
var id : int;

var controlInput : ControlInput;


function Start () {
	Hide();
	Show();
}

function Update () {
	// true la hitDetect
	control(true);
}

function control(dapBua:boolean){
	switch(trangThai){
		case 0:
			break;
		case 1:
			if(dapBua){
				CancelInvoke("Hide");
				Die();
			}
			break;
		case -1:
			Hide();
			break;		
	}
}

function Die(){
	trangThai = -1;
	print("chet");
}
function Show(){
	trangThai = 1;
	Invoke("Hide", showTime);
	print("song");
}
function Hide(){
	trangThai = 0;
	print("an");
}
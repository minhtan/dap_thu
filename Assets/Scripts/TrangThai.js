#pragma strict
//trang thai con thu 
//0: an, 1: hien, -1: chet
private var trangThai : int;
//thoi gian con thu xuat hien
var showTime : float = 5.0f;
//id cua thu
var id : int;
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
		case 4:
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

public function getTrangThai(){
	return trangThai;
}
function Die(){
	trangThai = -1;
}
function Show(){
	trangThai = 1;
	Invoke("Hide", showTime);;
}
function Hide(){
	trangThai = 4;
}
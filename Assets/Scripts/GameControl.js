#pragma strict
import System.Collections.Generic;

private var soDuocchon : int;
var time : float = 3.0f;
private var arrayThu : List.<GameObject>;
private var objTrangThai : TrangThai;
function Start () {
 	arrayThu = new List.<GameObject>();
 	arrayThu = NhetThuVaoChuong();
	print(HienThu());
	yield WaitForSeconds(3.0);
	print(HienThu());	
	print(HienThu());
}

function Update () {
	 
}

function NhetThuVaoChuong(){
	for(var child : Transform in transform){
		arrayThu.Add(child.gameObject);
	}
	return arrayThu;
}

function ChonSoNgauNhien(){
	soDuocchon = Random.Range(0,3);
	return soDuocchon;
}

function KtraThuSong(number : int){
	objTrangThai = arrayThu[number].GetComponent.<TrangThai>();
	if(objTrangThai.GetTrangThai() != 0){
		return true;
	}else{
		return false;
	}
}

function HienThu(){
	var ktraThu : boolean;
	var soNgauNhien : int;
	do{
		soNgauNhien = ChonSoNgauNhien();
		ktraThu = KtraThuSong(soNgauNhien);
	}while(ktraThu);
	objTrangThai.Show();
	return objTrangThai.GetTrangThai();
}

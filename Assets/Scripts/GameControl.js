#pragma strict
import System.Collections.Generic;

//Thu duoc luu vao trong array
private var arrayThu : List.<GameObject>;
//Trang thai thu dang dc chon
private var objTrangThai : TrangThai;

function Start () {
 	arrayThu = new List.<GameObject>();
 	arrayThu = NhetThuVaoChuong();
 	InvokeRepeating("HienThu", 1 , 3);
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
	return Random.Range(0, arrayThu.Count - 1);
}

function KtraThuAn(number : int){
	objTrangThai = arrayThu[number].GetComponent.<TrangThai>();
	if(objTrangThai.GetTrangThai() == 0){
		return true;
	}else{
		return false;
	}
}

function KtraThuDay(){
	for(var thu : GameObject in arrayThu){
		if(thu.GetComponent.<TrangThai>().GetTrangThai() == 0){
			return false;
		}
	}
	return true;
}

function HienThu(){
	var randomNo : int;
	do{
		randomNo = ChonSoNgauNhien ();
		if(KtraThuAn (randomNo)){
			objTrangThai.Show();
			Debug.Log("Hien thu: " + arrayThu[randomNo].name);
			break;
		}
	}while(!KtraThuDay ());
	Debug.Log("Hien thu, time: " + Time.time);
}

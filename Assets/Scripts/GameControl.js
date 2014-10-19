#pragma strict
#pragma downcast
import System.Collections.Generic;

//Thu duoc luu vao trong array
private var listThu : List.<GameObject>;
//Thoi gian giua goc cac lan thu hien
var baseInterval : float = 3.0;
//muc do giam cua thoi gian giua cac lan thu hien
var intervalStep : float = 0.5;

function Start () {
	listThu = new List.<GameObject>();
 	listThu = nhetThuVaoChuong();
 	InvokeRepeating("showThu", 0, baseInterval);
}

function nhetThuVaoChuong(){
	for(var thu : Transform in transform){
		listThu.Add(thu.gameObject);
	}
	return listThu;
}

function randomThu(range : int){
	return Random.Range(0, range);
}

function filterHiddenThu(){
	var listHiddenThu : List.<GameObject> = new List.<GameObject>();
	for(var thu : GameObject in listThu){
		if(thu.GetComponent.<TrangThai>().getTrangThai() == 0)
			listHiddenThu.Add(thu);
	}
	return listHiddenThu;
}

function showThu(){
	var listHiddenThu : List.<GameObject> = filterHiddenThu();
	if(listHiddenThu.Count > 0){
		var randomNo : int = randomThu(listHiddenThu.Count - 1);
		listHiddenThu[randomNo].GetComponent.<TrangThai>().show();
	}
}

function dapThu(thu : GameObject){
	var trangThaiScript : TrangThai = thu.GetComponent.<TrangThai>();
	if(trangThaiScript.getTrangThai() == 1){
		trangThaiScript.die();
	}
}



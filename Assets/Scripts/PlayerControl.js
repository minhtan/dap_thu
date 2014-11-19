#pragma strict
import System;
import System.Runtime.Serialization.Formatters.Binary;
import System.IO;

static var control : PlayerControl;
var highestScore : int;
var coin : int;
var powerUpSlowLimit : int;
var powerUpX2Limit : int;

function Awake(){
	if(control == null){
		DontDestroyOnLoad(gameObject);
		control = this;
	}else if(control != this){
		Destroy(gameObject);
	}
}

function playable(){
	return true;
}

function init(){
	if(!loadData()){
		saveData(0, 3, 5, 5);
		loadData();
	}
}

//***************************************************************************************************
//*******************************************SAVE LOAD***********************************************
//***************************************************************************************************

private class PlayerData extends System.Object{
	var highestScore : int;
	var coin : int;
	var powerUpSlowLimit : int;
	var powerUpX2Limit : int;
}

function getPowerUpSlowLimit(){
	return 5;
}

function getPowerUpX2Limit(){
	return 5;
}

function saveData(highestScore : int, coin : int, powerUpSlowLimit : int, powerUpX2Limit : int){
	var bf : BinaryFormatter = BinaryFormatter();
	var file : FileStream = File.Create(Application.persistentDataPath + "/playerData.thu");
	
	var data : PlayerData = PlayerData();
	data.highestScore = highestScore;
	data.coin = coin;
	data.powerUpSlowLimit = powerUpSlowLimit;
	data.powerUpX2Limit = powerUpX2Limit;
	
	bf.Serialize(file, data);
	file.Close();
}

function loadData(){
	if(File.Exists(Application.persistentDataPath + "/playerData.thu")){
		var bf : BinaryFormatter = BinaryFormatter();
		var file : FileStream = File.Open(Application.persistentDataPath + "/playerData.thu", FileMode.Open);

		var data : PlayerData = bf.Deserialize(file) as PlayerData;
		file.Close();
		
		highestScore = data.highestScore;
		coin = data.coin;
		powerUpSlowLimit = data.powerUpSlowLimit;
		powerUpX2Limit = data.powerUpX2Limit;
		return true;
	}else{
		return false;
	}
}
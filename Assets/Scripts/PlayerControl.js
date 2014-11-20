﻿#pragma strict
import System;
import System.Runtime.Serialization.Formatters.Binary;
import System.IO;

static var control : PlayerControl;

var highestScore : int;
var coin : int;
var coinLimit : int = 5;
var minutesToNextCoin : int = 20;
var powerUpSlowLimit : int;
var powerUpX2Limit : int;

private var isCountdownRunning : boolean;
private var endDate : DateTime;

function OnGUI(){
	GUI.Label(Rect(10, 10, 100, 100), getRemainTime());
	if(GUI.Button(Rect(10, 110, 100, 100), "Save")){
		saveData(highestScore, coin, powerUpSlowLimit, powerUpX2Limit, endDate);
	}
}

function Awake(){
	if(control == null){
		DontDestroyOnLoad(gameObject);
		control = this;
	}else if(control != this){
		Destroy(gameObject);
	}
	init();
}

function init(){
	if(!loadData()){
		saveData(0, 5, 5, 5, System.DateTime.MinValue);
		loadData();
	}
	if(coin < coinLimit){
		getMahCoin();
	}else{
		setCoinDateDefault();
	}
	isCountdownRunning = false;
}

function Start(){
	Debug.Log(endDate);
}

function Update(){
	if(coin < coinLimit && !isCountdownRunning){
		countdown();
	}
}

function getMahCoin(){
	var timeSpan : TimeSpan;
	var mahCoin : int = 0;
	if(endDate < DateTime.Now){
		timeSpan = DateTime.Now.Subtract(endDate);
		mahCoin = timeSpan.TotalMinutes / minutesToNextCoin;
		coin = coin + mahCoin;
		if(coin < coinLimit){
			timeSpan = TimeSpan(0, minutesToNextCoin * (mahCoin+1), 0);
			endDate = endDate.Add(timeSpan);
		}else{
			coin = coinLimit;
			endDate = DateTime.MinValue;
		}
		saveData(highestScore, coin, powerUpSlowLimit, powerUpX2Limit, endDate);
	}
}

function setCoinDateDefault(){
	endDate = DateTime.MinValue;
	coin = coinLimit;
	saveData(highestScore, coin, powerUpSlowLimit, powerUpX2Limit, endDate);
}

function countdown(){
	isCountdownRunning = true;
	if(endDate == DateTime.MinValue){
		var timeSpan : TimeSpan = TimeSpan(0, minutesToNextCoin, 0);
		endDate = DateTime.Now.Add(timeSpan);
		saveData(highestScore, coin, powerUpSlowLimit, powerUpX2Limit, endDate);
	}
	while(endDate > DateTime.Now){
		yield WaitForRealSecond.wait(1.0);
	}
	coin ++;
	isCountdownRunning = false;
	endDate = DateTime.MinValue;
	saveData(highestScore, coin, powerUpSlowLimit, powerUpX2Limit, endDate);
}

function getRemainTime(){
	var timeSpan : TimeSpan = endDate - DateTime.Now;
	return timeSpan.Minutes + " : " + timeSpan.Seconds;
}

function playable(){
	if(coin > 0){
		coin --;
		saveData(highestScore, coin, powerUpSlowLimit, powerUpX2Limit, endDate);
		return true;
	}else{
		return false;
	}
}

function getPowerUpSlowLimit(){
	return powerUpSlowLimit;
}

function getPowerUpX2Limit(){
	return powerUpX2Limit;
}

//***************************************************************************************************
//*******************************************SAVE LOAD***********************************************
//***************************************************************************************************

private class PlayerData extends System.Object{
	var highestScore : int;
	var coin : int;
	var powerUpSlowLimit : int;
	var powerUpX2Limit : int;
	var endDate : DateTime;
}

function saveData(highestScore : int, coin : int, powerUpSlowLimit : int, powerUpX2Limit : int, endDate : DateTime){
	var bf : BinaryFormatter = BinaryFormatter();
	var file : FileStream = File.Create(Application.persistentDataPath + "/playerData.thu");
	
	var data : PlayerData = PlayerData();
	data.highestScore = highestScore;
	data.coin = coin;
	data.powerUpSlowLimit = powerUpSlowLimit;
	data.powerUpX2Limit = powerUpX2Limit;
	data.endDate = endDate;
	
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
		endDate = data.endDate;
		
		return true;
	}else{
		return false;
	}
}
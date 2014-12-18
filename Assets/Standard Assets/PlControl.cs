using UnityEngine;
using System.Collections;
using System.Runtime.Serialization.Formatters.Binary;
using System;
using System.IO;
public class PlControl : MonoBehaviour {

	public static PlControl control;
	public int highestScore;	
	public int coin;
	public int coinLimit = 5;
	public int minutesToNextCoin = 20;

	private bool isCountdownRunning;
	private DateTime endDate;

	void Awake(){
		if(control == null){
			DontDestroyOnLoad(gameObject);
			control = this;
		}else if(control != this){
			Destroy(gameObject);
		}
		init();
	}

	void init(){
		if(!loadData()){
			saveData(0, 5, System.DateTime.MinValue);
			loadData();
		}
		if(coin < coinLimit){
			getMahCoin();
		}else{
			setCoinDateDefault();
		}
		isCountdownRunning = false;
	}

	public void getMahCoin(){
		 TimeSpan timeSpan;
		 int mahCoin = 0;
		if(endDate < DateTime.Now){
			timeSpan = DateTime.Now.Subtract(endDate);
			mahCoin = (int)timeSpan.TotalMinutes / minutesToNextCoin;
			coin = coin + mahCoin;
			if(coin < coinLimit){
				timeSpan = new TimeSpan(0, minutesToNextCoin * (mahCoin+1), 0);
				endDate = endDate.Add(timeSpan);
			}else{
				coin = coinLimit;
				endDate = DateTime.MinValue;
			}
			saveData();
		}
	}

	public void setCoinDateDefault(){
		endDate = DateTime.MinValue;
		coin = coinLimit;
		saveData();
	}

	public IEnumerator countdown(){
		isCountdownRunning = true;
		if(endDate == DateTime.MinValue){
			TimeSpan timeSpan = new TimeSpan(0, minutesToNextCoin, 0);
			endDate = DateTime.Now.Add(timeSpan);
			saveData();
		}
		while(endDate > DateTime.Now){
			yield return WFRSecond.wait(1);
		}
		coin ++;
		isCountdownRunning = false;
		endDate = DateTime.MinValue;
		saveData();
	}

	public string getRemainTime(){
		TimeSpan timeSpan = endDate.Subtract(DateTime.Now);
		if(timeSpan.TotalSeconds < 0 && coin >= coinLimit){
			return "full";
		}else{
			return timeSpan.Minutes + ":" + timeSpan.Seconds;
		}
	}

	public bool playable(){
		if(coin > 0){
			coin --;
			saveData();
			return true;
		}else{
			return false;
		}
	}

	private void newHighScore(int score){
		highestScore = score;
		saveData();
	}

	public int getCoin(){
		return coin;
	}

	public int getHighestScore(){
		return highestScore;
	}

	public bool takeCoin(){
		if(coin > 0){
			coin --;
			saveData();
			return true;
		}else{
			return false;	
		}
	}

	public void addCoin(){
		coin ++;
		saveData();
	}

	void Update () {
		if(coin < coinLimit && !isCountdownRunning){
			countdown();
		}
	}
	//***************************************************************************************************
	//*******************************************SAVE LOAD***********************************************
	//***************************************************************************************************

	private void saveData(int highestScore, int coin, DateTime endDate){
		BinaryFormatter bf = new BinaryFormatter();
		FileStream file = File.Create(Application.persistentDataPath + "/playerData.thu");
		
		PlayerData data = new PlayerData();
		data.highestScore = highestScore;
		data.coin = coin;
		data.endDate = endDate;
		
		bf.Serialize(file, data);
		file.Close();
	}

	private void saveData(){
		BinaryFormatter bf = new BinaryFormatter();
		FileStream file = File.Create(Application.persistentDataPath + "/playerData.thu");
		
		PlayerData data = new PlayerData();
		data.highestScore = highestScore;
		data.coin = coin;
		data.endDate = endDate;
		
		bf.Serialize(file, data);
		file.Close();
	}

	public bool loadData(){
		if(File.Exists(Application.persistentDataPath + "/playerData.thu")){
			BinaryFormatter bf = new BinaryFormatter();
			FileStream file = File.Open(Application.persistentDataPath + "/playerData.thu", FileMode.Open);

			PlayerData data  = bf.Deserialize(file) as PlayerData;
			file.Close();
			
			highestScore = data.highestScore;
			coin = data.coin;
			endDate = data.endDate;
			return true;
		}else{
			return false;
		}
	}

}

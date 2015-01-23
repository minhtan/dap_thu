using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class ScoreCS : MonoBehaviour {

	private GameControlCS gameControl;
	public GameObject controlObject;

	void Awake(){
		gameControl = controlObject.GetComponent<GameControlCS>();
	}
	
	void OnGUI(){
		showScore(gameControl.getScore());
	}
	
	public void showScore(int score){
		GetComponent<Text>().text = "Score: " + score;
	}
}

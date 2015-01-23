using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class LifeCS : MonoBehaviour {

	private GameControlCS gameControl;
	public GameObject controlObject;

	void Awake(){
		gameControl = controlObject.GetComponent<GameControlCS>();
	}
	void OnGUI(){
		showLife(gameControl.getLife());
	}
	
	public void showLife(int life){
		GetComponent<Text>().text = "Life: " + life;
	}
}

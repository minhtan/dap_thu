using UnityEngine;
using System.Collections;
using UnityEngine.UI;
public class BtnPauseCs : MonoBehaviour {

	public GameObject objControl;
	private GameControlCS gameControl;
	public Sprite imgResume;
	public Sprite imgPause;
	public Text textPause;
	void Awake(){
		gameControl = objControl.GetComponent<GameControlCS>();
	}
	
	public void pauseClick(){
		if (gameControl.pauseGame()) {
			this.GetComponent<Image> ().sprite = imgPause;	
			textPause.text = "resume";
			Debug.Log("pause");
		} else {
			this.GetComponent<Image> ().sprite = imgResume;
			textPause.text = "pause";
			Debug.Log("resume");
		}


	}
}

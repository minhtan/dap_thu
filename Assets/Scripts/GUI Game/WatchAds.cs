using UnityEngine;
using System.Collections;
using ChartboostSDK;

public class WatchAds : MonoBehaviour {

	// Use this for initialization

//	public GameObject player;
//	private PlayerControl playerControl;
//
//	void Awake(){
//		player = GetComponent<PlayerControl>();
//		playerControl = player.GetComponent<PlayerControl>();
//	}
	public void btnWatchAds(){
		if (!Chartboost.hasInterstitial (CBLocation.Default)) {
			Chartboost.cacheInterstitial(CBLocation.Default);
		}
		Chartboost.showInterstitial (CBLocation.Default);
	}

	void OnEnable(){
		Chartboost.didClickInterstitial += didClickInterstitial;
	}

	void OnDisable(){
		Chartboost.didClickInterstitial -= didClickInterstitial;
	}

	void didClickInterstitial(CBLocation location) {
//		PlayerControl.control.addCoin ();
	}
}

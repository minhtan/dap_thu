using UnityEngine;
using System.Collections;
using ChartboostSDK;
using UnityEngine.UI;
public class ShowPictureAds : MonoBehaviour {

	public GameObject panelLoading;

	void Start(){
		Chartboost.showInterstitial (CBLocation.Default);
	}

	void OnEnable(){
//		Chartboost.didCacheInterstitial += didCacheInterstitial;
		Chartboost.didDismissInterstitial += didDismissInterstitial;
	}

	void OnDisable(){
//		Chartboost.didCacheInterstitial -= didCacheInterstitial;
		Chartboost.didDismissInterstitial -= didDismissInterstitial ;
	}

//	void didCacheInterstitial (CBLocation location){
//		panelLoading.SetActive (false);
//	}

	void didDismissInterstitial (CBLocation location){
		panelLoading.SetActive (false);
//		Chartboost.Destroy (this);
	}
}

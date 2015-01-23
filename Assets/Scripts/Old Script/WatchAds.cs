using UnityEngine;
using System.Collections;
using UnityEngine.Advertisements;
public class WatchAds : MonoBehaviour {

	#if UNITY_EDITOR
	string gameId = @"22185";
	#elif UNITY_ANDROID
	string gameId = @"22185";
	#elif UNITY_IOS
	string gameId = @"14850";
	#else 
	string gameId = @"14850";
	#endif

	void Awake(){
//		UnityAds.OnVideoCompleted(UnityAdsVideoCompleted);
	}

	void Start () {
		Advertisement.Initialize(gameId,true);

	}
	
	// Update is called once per frame
	public void btnClick () {
		if(Advertisement.isReady(@"defaultVideoAndPictureZone")){
			Advertisement.Show(@"defaultVideoAndPictureZone",null); 
		}
	}
//
//	public void setVideoCompletedDelegate(string rewardItemKey, bool skipped){
//		PlControl.control.addCoin ();
//	}

//	void OnEnable(){
//		U-nityEngine.Advertisements.UnityAds.OnVideoCompleted += UnityAdsVideoCompleted;
//	}

//	void OnDisable(){
//		UnityAds.OnVideoCompleted -= UnityAdsVideoCompleted;
//	}

//	private void  UnityAdsVideoCompleted(){
//		PlControl.control.addCoin ();
//	}
}

using UnityEngine;
using System.Collections;
using ChartboostSDK;
public class CacheAds : MonoBehaviour {

	void Start () {
		Chartboost.cacheInterstitial (CBLocation.Default);
//		Chartboost.cacheRewardedVideo (CBLocation.GameOver);
	}
}

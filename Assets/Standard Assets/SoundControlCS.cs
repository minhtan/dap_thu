using UnityEngine;
using System.Collections;

public class SoundControlCS : MonoBehaviour {

    public AudioClip dieSound;
    public AudioClip hitSound;
    public static SoundControlCS sound;
    private AudioSource bgMusic;
    private AudioSource soundEfct;

    void Awake(){
	    if(sound == null){
		    DontDestroyOnLoad(gameObject);
		    sound = this;
		    getSource();
	    }else if(sound != this){
		    Destroy(gameObject);
	    }
    }
	
    private void getSource(){
	    var sources = GetComponents<AudioSource>();
	    bgMusic = sources[0];
	    soundEfct = sources[1];
	    loadSoundPref();
    }

    public void playDieSound(){
	    soundEfct.clip = dieSound;
	    soundEfct.Play();
    }

    private void playHitSound(){
	    soundEfct.clip = hitSound;
	    soundEfct.Play();
    }
    public void adjustVol(bool musicState){
	    int valueBg;
	    int valueEf;
	    if(musicState){
		    valueBg = 1;
		    valueEf = 1;
	    }else{
		    valueBg = 0;
		    valueEf = 0;
	    }
	    bgMusic.volume = valueBg;
	    PlayerPrefs.SetInt("BgVol", valueBg);
	    soundEfct.volume = valueEf;
	    PlayerPrefs.SetInt("EfctVol", valueEf);
	
    }

    private void loadSoundPref(){
	    bgMusic.volume = PlayerPrefs.GetInt("BgVol", 1);
	    soundEfct.volume = PlayerPrefs.GetInt("EfctVol", 1);
    }

    public float getBgVol(){
	    return bgMusic.volume;
    }
    private float getSoundVol(){
	    return soundEfct.volume;
    }
}

#pragma strict

private static var level : LevelManager;
private var loadingImage : GameObject;

function Awake(){
	if(level == null){
		DontDestroyOnLoad(gameObject);
		level = this;
	}else if(level != this){
		Destroy(gameObject);
	}
	loadingImage = GameObject.Find("Splash");
	level.loadingImage.SetActive(false);
}

static function load(name : String){
	level.loadingImage.SetActive(true);
	yield WaitForSeconds(2);
	Application.LoadLevel(name);
	level.loadingImage.SetActive(false);
}
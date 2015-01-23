using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using ChartboostSDK;
public class GameControlCS : MonoBehaviour {

    //***************************************************************************************************
    //*******************************************GAME CORE***********************************************
    //***************************************************************************************************

    //input reference
    private InputControlCS input;
    //gameover?
    public bool gameover;

    //Thu duoc luu vao trong array
    private List<GameObject> listThu;

    //Thoi gian goc giua cac lan thu hien
    public float interval = 3.0f;

    //pasue
    public bool pause;
    private float currentTimeScale;

    //game over canvas
    public GameObject gameOverCanvas;

	//panel coin 
	public GameObject panelCoin;

	//panel scoreLife
	public GameObject panelScoreLife;

	//button pause;
	public GameObject btnPause;
	
    private void getThuList(){
	    listThu = new List<GameObject>();
		foreach(Transform thu in transform){
		    listThu.Add(thu.gameObject);
	    }
    }

    private int random(int range){
	    return Random.Range(0, range);
    }

    private List<GameObject> filterHiddenThu(){
	    List<GameObject> listHiddenThu = new List<GameObject>();
	    foreach(GameObject thu in listThu){
		    if(thu.GetComponent<TrangThaiCS>().isDead())
			    listHiddenThu.Add(thu);
	    }
	    return listHiddenThu;
    }

    private IEnumerator showThu(){
	    List<GameObject> listHiddenThu;
	    while(!gameover){
		    listHiddenThu = filterHiddenThu();
		    if(listHiddenThu.Count > 0){
				TrangThaiCS thuToShow = listHiddenThu[random(listHiddenThu.Count)].GetComponent<TrangThaiCS>();
			    thuToShow.show(randomEvent());
		    }
			yield return new WaitForSeconds(interval);
	    }
    }

    private void checkHit(){
		if (!gameover) {
			GameObject thu = input.hitDetect();
			if(thu != null){
				//		SoundControl.sound.playHitSound();
				if(thu.GetComponent<TrangThaiCS>() != null){
					TrangThaiCS trangThaiThu = thu.GetComponent<TrangThaiCS>();
					if(trangThaiThu.isHitable() && !pause){
						if(trangThaiThu.getHit()){
							SoundControlCS.sound.playDieSound();
							scoring(trangThaiThu.getThuPoint());
						}
					}
				}
			}	
		}  
    }

    public void miss(){
	    faultLimit --;
    }

    public bool pauseGame(){
	    if(!pause){
		    pause = true;
		    currentTimeScale = Time.timeScale;
		    Time.timeScale = 0;
		    return true;
	    }else{
		    pause = false;
		    Time.timeScale = currentTimeScale;
		    return false;
	    }
    }

    public void startGame(){
		StartCoroutine(showThu());
    }

    //***************************************************************************************************
    //*******************************************SCORING*************************************************
    //***************************************************************************************************

    //so lan duoc danh truot
    public int faultLimit = 3;

    //diem
    public  int currentScore;

    //moc diem
    [System.Serializable]
    public class ScoreMilestone : System.Object{
	    public int score;
	    public float interval;
	    public bool x2able = false;
	    public bool slowable = false;
    }
    public ScoreMilestone[] scoreMilestones;

     public void checkScore(){
	    if(faultLimit < 1 || currentScore < 0){
		    gameOver();
	    }
	    for(int i = 0; i < scoreMilestones.Length; i++){
		    if(currentScore > scoreMilestones[i].score && interval > scoreMilestones[i].interval){
			    interval = scoreMilestones[i].interval;
			    x2able = scoreMilestones[i].x2able;
			    slowable = scoreMilestones[i].slowable;
			    break;
		    }
	    }
    }
    // gameover
    private void gameOver(){
	    gameover = true;
		gameOverCanvas.SetActive(true);
		panelScoreLife.SetActive (false);
		btnPause.SetActive (false);
	    if(currentScore > PlControl.control.getHighestScore()){
		    PlControl.control.newHighScore(currentScore);	
	    }
		panelCoin.SetActive (true);
		Time.timeScale = 0;
    }

    private void scoring(int thuPoint){
	    switch(thuPoint){
		    case 0:
			    cancelPowerUp();
			    faultLimit --;
			    break;
		    case -1:
			    cancelPowerUp();
			    currentScore --;
			    break;
		    default:
			    if(powerX2){
				    currentScore += thuPoint * x2Ratio;
			    }else{
				    currentScore += thuPoint;
			    }
			    break;		
	    }
    }

    public int getScore(){
	    return currentScore;
    }

    public int getLife(){
	    return faultLimit;
    }

	public bool getStateGameOver(){
		return gameover;
	}

    //***************************************************************************************************
    //*******************************************POWER UP************************************************
    //***************************************************************************************************

    //power up
    public int powerUpChance = 33;
    public int bigThuChance = 33;
    public int venomThuChance = 33;
    public int cuteThuChance = 33;
    public int bigThuTriggerScore = 10;
    public int thuTypeTriggerScore = 10;

    //x2
    public bool x2able = false;
    public bool x2Show;
    public bool powerX2;
    public int x2time = 10;
    private int x2Ratio = 2;
    public int x2Boost = 3;

    //slow mo
    public bool slowable = false;
    public bool slowShow;
    public bool powerSlow;
    public int slowTime = 10;
    private int slowRatio = 1;
    public float slowBoost = 2.0f;

    public void setX2Boost(){
	    x2Ratio = x2Boost;	
    }

    public void setSlowBoost(){
	    slowRatio = System.Convert.ToInt32(slowBoost);
    }

    public void x2ShowNoMore(){
	    x2Show = false;
    }

    public void slowShowNoMore(){
	    slowShow = false;
    }

    private void cancelPowerUp(){
	    powerX2 = false;
	    powerSlow = false;
	    Time.timeScale = 1;
    }

    //random event
    // 0 - normal
    // 1 - x2
    // 2 - slow
    // 3 - big
    // 4 - venom
    // 5 - cute
    private float randomEvent(){
	    if(x2able && !powerX2 && !x2Show && random(100) < powerUpChance){
		    x2Show = true;
		    return 1.0f;
	    }else if(slowable && !powerSlow && !slowShow && random(100) < powerUpChance){
		    slowShow = true;
		    return 2.0f;
	    }else if(currentScore > bigThuTriggerScore && random(100) < bigThuChance){
		    return 3.0f;
	    }else if(currentScore > thuTypeTriggerScore && random(100) < venomThuChance){
		    return 4.0f;
	    }else if(currentScore > thuTypeTriggerScore && random(100) < cuteThuChance){
		    return 5.0f;
	    }else{
		    return 0.0f;
	    }
    }

	public IEnumerator hitX2(){
	    powerX2 = true;
		yield return StartCoroutine(WFRSecond.wait(x2time));
	    powerX2 = false;
    }

	public IEnumerator hitSlow(){
	    powerSlow = true;
	    Time.timeScale = 0.5f;
	    yield return StartCoroutine(WFRSecond.wait(slowTime * slowRatio * 0.5f));
	    powerSlow = false;
	    Time.timeScale = 1.0f;
    }

    public bool isX2(){
	    return powerX2;
    }

    public bool isSlow(){
	    return powerSlow;
    }

    //***************************************************************************************************
    //*******************************************GAME****************************************************
    //***************************************************************************************************

    private void gameInit(){
	    gameover = false;
	    pause = false;
	    powerX2 = false;
	    powerSlow = false;
	    x2Show = false;
	    slowShow = false;
	    x2able = false;
	    slowable = false;
	    currentScore = 0;
	    Time.timeScale = 1;
    }

    void Awake(){
	    input = GetComponent<InputControlCS>();
    }

    void Start() {
 	    getThuList();
 	    gameInit();
    }

    void Update(){
	    checkScore();
	    checkHit();
    }
}

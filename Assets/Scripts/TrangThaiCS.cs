using UnityEngine;
using System.Collections;
public class TrangThaiCS : MonoBehaviour {

    public float showTime = 2.0f;

//components reference
    private Animator anim;
    private GameControlCS gameControl;
    private bool isHit;

    //points for this thu
    private int thuPoint;
    private int thuHealth;

        public int getThuPoint(){
	    return thuPoint;
    }

    public bool isHitable(){
	    if(!anim.GetCurrentAnimatorStateInfo(0).IsName("hidden") && !anim.GetCurrentAnimatorStateInfo(0).IsName("dying") && !isHit){
		    return true;
	    }else{
		    return false;
	    }
    }

    public bool isDead(){
	    if(anim.GetCurrentAnimatorStateInfo(0).IsName("hidden")){
		    return true;
	    }else{
		    return false;
	    }
    }

    void Awake () {
	    anim = GetComponent<Animator>();
	    gameControl = GameObject.Find("/HolesContainer").GetComponent<GameControlCS>();
	    anim.SetFloat("powerUp", 0.0f);
	    isHit = false;
    }

    private void die(){
	    if(anim.GetCurrentAnimatorStateInfo(0).IsName("showing")){
		    anim.Play("dying", -1, 1 - anim.GetCurrentAnimatorStateInfo(0).normalizedTime);
	    }else if(anim.GetCurrentAnimatorStateInfo(0).IsName("hiding")){
		    anim.Play("dying", -1, anim.GetCurrentAnimatorStateInfo(0).normalizedTime);
	    }else{
		    anim.Play("dying", -1, 0);
	    }
	    CancelInvoke("hide");
	    isHit = true;
    }

    public void show(float events){
	    anim.SetFloat("powerUp", events);
	    anim.SetTrigger("show");
	    isHit = false;
	    checkThuType(events);
	    Invoke("hide", showTime);
    }

    private void checkThuType(float events){
        int convert = System.Convert.ToInt32(events);
		switch (convert)
        {
		    case 3:
			    thuPoint = 2;
			    thuHealth = 2;
			    break;
		    case 4:
			    thuPoint = 0;
			    thuHealth = 1;
			    break;
		    case 5:
			    thuPoint = -1;
			    thuHealth = 1;
			    break;
		    default:
			    thuPoint = 1;
			    thuHealth = 1;
			    break;
	    }
    }

    private void hide(){
		anim.SetTrigger("hide");
	    StartCoroutine(checkMiss());
	    checkSpecial();
    }

    private void checkSpecial(){
	    if(anim.GetFloat("powerUp") == 1.0){
		    gameControl.x2ShowNoMore();
	    }else if(anim.GetFloat("powerUp") == 2.0){
			gameControl.slowShowNoMore();
	    }
    }

	private IEnumerator checkMiss(){
	    while(true){
		    if(isHit){
			    break;
		    }else{
			    if(anim.GetCurrentAnimatorStateInfo(0).IsName("hidden") && anim.GetFloat("powerUp") < 4){
				    gameControl.miss();
				    break;
			    }
		    }
		    yield return null;
	    }
    }

    private void checkPowerUp(){
	    switch(System.Convert.ToInt32(anim.GetFloat("powerUp"))){
		    case 1:
				StartCoroutine(gameControl.hitX2());
			    break;
		    case 2:
			    StartCoroutine(gameControl.hitSlow());
			    break;
		    default:
			    break;
	    }
    }

    public bool getHit(){
	    thuHealth --;
	    if(thuHealth == 0){
		    checkPowerUp();
		    checkSpecial();
		    die();
		    return true;
	    }else{
		    return false;
	    }
   }
}

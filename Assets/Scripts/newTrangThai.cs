using UnityEngine;
using System.Collections;

public class newTrangThai : MonoBehaviour {

    public GameObject holeContainer;
    private GameControlCS gameControl;
    private Animator anim;
    private bool isSmoking;
    private bool isHit;
    private int thuPoint;
    private int thuHealth;

    public int getThuPoint() {
        return thuPoint;
    }

    public bool isHitable()
    {
        if (!isHit)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    public bool isDead()
    {
        if (anim.GetCurrentAnimatorStateInfo(0).IsName("hidden") && anim.GetCurrentAnimatorStateInfo(1).IsName("Default") && isHit)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    private void die()
    {
        anim.SetTrigger("dead");
        isHit = true;
    }

    public void show(float events)
    {
        checkThuType(events);
        anim.SetFloat("powerUp", events);
        anim.SetTrigger("show");
        isHit = false;
    }

    private void checkThuType(float events)
    {
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
                thuPoint = -5;
                thuHealth = 1;
                break;
            default:
                thuPoint = 1;
                thuHealth = 1;
                break;
        }
    }

    private void checkSpecial()
    {
        if (anim.GetFloat("powerUp") == 1.0)
        {
            gameControl.x2ShowNoMore();
        }
        else if (anim.GetFloat("powerUp") == 2.0)
        {
            gameControl.slowShowNoMore();
        }
    }

    public void checkMiss()
    {
        if (isHit == false && anim.GetFloat("powerUp") != 4 && anim.GetFloat("powerUp") != 5)
        {
            gameControl.miss();
            anim.Play("Default", 1);
            if(anim.GetFloat("powerUp") == 1){
                gameControl.x2ShowNoMore();
            }
            else if (anim.GetFloat("powerUp") == 2)
            {
                gameControl.slowShowNoMore();
            }
        }
        isHit = true;
    }

    private void checkPowerUp()
    {
        switch (System.Convert.ToInt32(anim.GetFloat("powerUp")))
        {
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

    public bool getHit()
    {
        thuHealth--;
        if (thuHealth == 0)
        {
            checkPowerUp();
            checkSpecial();
            die();
            return true;
        }
        else if (thuHealth == 1 && anim.GetFloat("powerUp") == 3)
        {
            anim.SetTrigger("preDead");
            return false;
        }
        else
        {
            return false;
        }
    }

	// Use this for initialization
	void Awake () {
        isSmoking = false;
	    anim = gameObject.GetComponent<Animator>();
        gameControl = holeContainer.GetComponent<GameControlCS>();
        anim.SetFloat("powerUp", 0.0f);
        isHit = true;
	}
	
	// Update is called once per frame
	void Update () {
        if (anim.GetCurrentAnimatorStateInfo(1).IsName("Smoke") && isSmoking != true)
        {
            isSmoking = true;
            anim.Play("hidden", 0);
        }
        if (anim.GetCurrentAnimatorStateInfo(1).IsName("Default") && isSmoking == true){
            isSmoking = false;
        }
	}

}

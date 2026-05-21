let h3=document.querySelector("h3");
let h2=document.querySelector("h2");
let btns=document.querySelectorAll(".btn");
let container=document.querySelector(".container");
let gamearray=[];
let userarray=[];
 
let level=0;
let start=false;
let colors=["brown","blue","green","olive"];
h3.innerText=`Level ${level}`; 

/* S1:any key press check start and levelup
runs only once makes start=true and level=1 */
document.addEventListener("keypress",function(){
     if(start==false){
        console.log("Game has started!!");
        start=true; 
        levelup(); 
        h2.innerText="";
    }
});

function game_flash(emt){
    //S1
    emt.classList.add("gameflash");
    setTimeout(function remove(){
        emt.classList.remove("gameflash");
    },500);
}
function user_flash(useremt){
    useremt.classList.add("userflash");
    setTimeout(function remove(){
        useremt.classList.remove("userflash");
    },500);
}
function levelup(){
    //increase level when game start
    level++;
    h3.innerText=`Level ${level}`;
    /*S4 when array match increase level
    change level text */
     userarray=[];
   
     /* S1: generate random number,
    select any 1 color, from colors array
    select actual element with that color class
    flash that emt
    */
    let random= Math.floor(Math.random()*4);
    let selectclr=colors[random];
    gamearray.push(selectclr);
    console.log("game_array",gamearray);
    //search for first , emt thas has class red 
    let flashemt=document.querySelector(`.${selectclr}`);
    //send class to gameflash fn
    game_flash(flashemt);

}

/* s2 
now user press any btn 
when press store,btn clr in userarray and flash 
now compare user btn with game btn 
if right next level
*/
for(btn of btns){
    btn.addEventListener("click",userbtnPress);
}

function userbtnPress(){
    let pressed=this; //pressed btn 
    let color=pressed.id; //get its color
    user_flash(this);//flash it 
    userarray.push(color); //add to array
    console.log("userarray",userarray);
    // console.log("-------------------------------------------------");
    check();
}
/* S3
now compare both user and game array last emt
if right level up 
else show wrong */ 

//S4
function check(){
    let index=userarray.length-1;
     if(userarray[index]==gamearray[index]){
           /* CASE1: if color right ->in middle of game 
           dont do anything wait fir next btn press */
            console.log(index,":",userarray[index],"==",gamearray[index]);
            // console.log("userarray at each press:",userarray);
            /* CASE2:now reached end gamearray length->
           just level up() */
           if(userarray.length==gamearray.length)
            {
                // console.log("------------------Length match-------------------------------");
                // console.log("lenghts:",userarray.length,"==",gamearray.length);
                setTimeout(levelup,1500);
                // console.log("userarray at level up:",userarray);
                // console.log("-------------------Next level------------------------------");
                
            }

        }
    else {
        console.log("wrong btn prssed");
        container.classList.add("gameout");
        setTimeout(function remove(){
             container.classList.remove("gameout");
        },1000);
            reset();
     }
}

/*S5
reset game ,come back to start ,
press btn again stsrt game */
function reset(){
    h2.innerText="Press any button to start the game";
    level=0;
    start=false;
    h3.innerText=`level ${level}`;

}



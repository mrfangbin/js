var goback=document.querySelector(".goback");
 goback.onclick=function(){ window.history.back();}
var goclose=document.querySelector(".close");
 goclose.onclick=function(){ location.href="home.html";}

var players=sessionStorage.players;

players=JSON.parse(players);

var myform=sessionStorage.ghostgame;

myform=JSON.parse(myform); 

var police=myform.police , killer=myform.killer, man=myform.man;

for(var i=0; i<players.length;i++){
	if(players[i].isdeath==true){
		switch(players[i].role){
			case "警察": 
				police--;
				break;
			case "杀手": 
				killer--;
				break;
			case "平民":
				man--;
				break;
		}
	}
}
if(police==0||killer>(myform.total-killer)||man==0){
	location.href="results.html";
}else if(killer==0){
	location.href="results.html";
}


/*架构html*/
	/*第几天*/
var main=document.getElementById("main");
var old=document.getElementById("old");
var step=document.querySelector(".step");
var newNode=[];
for(var i=0 ; i< (myform.day-1) ;i++){
	newNode[i]=old.cloneNode(true);
	main.appendChild(newNode[i]);
}
var step_box=document.querySelectorAll(".step_box");
var day_box=document.querySelectorAll(".step_box h2 p");
for(var i=0 ; i< myform.day ;i++){
	 day_box[i].innerHTML="第"+(i+1)+"天";
}
step_box[(myform.day-1)].appendChild(step);

	/*显示和隐藏*/
var down=document.querySelectorAll(".down");
var results=document.querySelectorAll(".results");
for(var i=0 ; i<down.length ; i++){
	down[i].index=i;
	down[i].addEventListener("click",changeStepDisplay);
	for(var j=0 ;j<players.length ; j++){
		if(players[j].day== (i+1)){
			if(players[j].k){
				results[i].innerHTML+="<p>"+(j+1)+"被杀手杀死；"+(j+1)+"号是"+players[j].role+"；";
			}else if(players[j].s){
				results[i].innerHTML+="<p>"+(j+1)+"被狙击手狙杀；"+(j+1)+"号是"+players[j].role+"；";
			}else if(players[j].d==2){
				results[i].innerHTML+="<p>"+(j+1)+"被医生扎死；"+(j+1)+"号是"+players[j].role+"；";
			}else if(players[j].v){
				results[i].innerHTML+="<p>"+(j+1)+"被投死；"+(j+1)+"号是"+players[j].role+"；";
			}
		}
	}
}
function changeStepDisplay(){
	if(results[this.index].style.display=="none"){
		results[this.index].style.display="block";
	}else{
		results[this.index].style.display="none";
	}
}



var libtn=document.querySelectorAll("li");
for(var i=0 ; i< libtn.length ; i++){
	libtn[i].index=i;
	libtn[i].addEventListener("click",doSomething);
}


function doSomething(){
	switch(this.index){
		case 0:
			 myform.step="killer";
			 updateMyform();
			break;
		case 1:
			 myform.step="police";
			 updateMyform();
			break;
		case 2:
			 myform.step="sniper";
			 updateMyform();
			break;
		case 3:
			myform.step="doctor";
			updateMyform();
			break;
		case 6:
			 myform.step="vote";
			 updateMyform();
			break;
		default:
			location.href="decrypt.html";
			break;
	}
}

function updateMyform(){
	sessionStorage.ghostgame=JSON.stringify(myform);
	location.href="vote.html";
}
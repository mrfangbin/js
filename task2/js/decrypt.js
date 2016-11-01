var hamburg=document.querySelector(".hamburg");
 hamburg.onclick=function(){ location.href="diary.html";}
var goclose=document.querySelector(".close");
 goclose.onclick=function(){ location.href="home.html";}


/*表单数据 初始化*/
var players=sessionStorage.players;

players=JSON.parse(players);

var myform=sessionStorage.ghostgame;

myform=JSON.parse(myform); 
	
var play=document.getElementById("music_btn");
var play_icon=document.getElementById("music_btn_1");

var btn=document.querySelector(".btn");
var day=myform.day;

if(myform.step=="vote"){
	var step_box=document.getElementById("step_box");
	step_box.visible="hidden";
	btn.innerHTML="第"+myform.day+"天";
	day=myform.day-1;
}	

/*页面效果*/

play.addEventListener("click",playMusic);

function playMusic(){
	if(song.paused){
		song.play();
		play_icon.className="stop";
	}else{
		song.pause();
		play_icon.className="right_tri";
	}		
}

var result=document.querySelector(".result");
		
	for(var j=0 ;j<players.length ; j++){
		if(players[j].day== day){
			if(players[j].k){
				result.innerHTML+="<p>"+(j+1)+"被杀手杀死；"+(j+1)+"号是"+players[j].role+"；";
			}else if(players[j].s){
				result.innerHTML+="<p>"+(j+1)+"被狙击手狙杀；"+(j+1)+"号是"+players[j].role+"；";
			}else if(players[j].d==2){
				result.innerHTML+="<p>"+(j+1)+"被医生扎死；"+(j+1)+"号是"+players[j].role+"；";
			}else if(players[j].v){
				result.innerHTML+="<p>"+(j+1)+"被投死；"+(j+1)+"号是"+players[j].role+"；";
			}
		}
	}
	

	

btn.addEventListener("click",goVote);
function goVote(){
	if(myform.step=="vote"){
		var myDate=new Date();
		myform.time[myform.day-1]=myDate.getTime()/60;
		sessionStorage.ghostgame=JSON.stringify(myform);
		location.href="diary.html";
	}else{
		myform.step="vote";
		sessionStorage.ghostgame=JSON.stringify(myform);
		location.href="vote.html";
	}
}

var players=sessionStorage.players;

players=JSON.parse(players);

var myform=sessionStorage.ghostgame;

myform=JSON.parse(myform); 

var myDate=new Date();
myform.time[myform.day]=myDate.getTime()/60;

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
var good=document.querySelector(".good");
var win=document.querySelector(".win_box span");
var gametime=document.querySelector(".good+p");
gametime.innerHTML="本次游戏共计用时"+Math.floor((myform.time[myform.day]-myform.time[0])/1000/60)+"小时"+Math.ceil((myform.time[myform.day]-myform.time[0])/1000%60)+"分钟";
if(police==0||killer>(myform.total-killer)||man==0){
	win.className="killerwin";
	good.innerHTML="杀手胜利，本轮游戏共经历了"+myform.day+"个白天，击败了%"+Math.floor((100-myform.killer/myform.total*100))+"的玩家！"
}else if(killer==0){
	win.className="policewin";
	good.innerHTML="本轮游戏共抓出杀手"+myform.killer+"人，共经历 了"+myform.day+"个白天，在杀人游戏中击败了%"+Math.floor(myform.killer/myform.total*100)+"的玩家！"
}


var main=document.getElementById("main");
var old=document.querySelector(".row");
var newNode=[];
for(var i=0 ; i< (myform.day-1) ;i++){
	newNode[i]=old.cloneNode(true);
	main.appendChild(newNode[i]);
}
/*总信息*/
var results=document.querySelector("#results");
results.innerHTML='<span class="left">杀&nbsp;&nbsp;手:'+myform.killer+'人';
results.innerHTML+='<span class="left">警&nbsp;&nbsp;察:'+myform.police+'人';
results.innerHTML+='<span class="left">平&nbsp;&nbsp;民:'+myform.man+'人';
results.innerHTML+='<span class="left">医&nbsp;&nbsp;生:'+myform.doctor+'人';
results.innerHTML+='<span class="left">狙击手:'+myform.sniper+'人';


/*每日信息*/
var row_day=document.querySelectorAll(".day");
var day_results=document.querySelectorAll(".row p");
var time=document.querySelectorAll(".time");
for(var i=0 ; i< myform.day ;i++){
	 row_day[i].innerHTML="第"+(i+1)+"天";
	 for(var j=0 ;j<players.length ; j++){
		if(players[j].day== (i+1)){
			if(players[j].k){
				day_results[i].innerHTML+="<p>"+(j+1)+"被杀手杀死，"+(j+1)+"号是"+players[j].role+"；";
			}else if(players[j].s){
				day_results[i].innerHTML+="<p>"+(j+1)+"被狙击手狙杀，"+(j+1)+"号是"+players[j].role+"；";
			}else if(players[j].d==2){
				day_results[i].innerHTML+="<p>"+(j+1)+"被医生扎死，"+(j+1)+"号是"+players[j].role+"；";
			}else if(players[j].v){
				day_results[i].innerHTML+="<p>"+(j+1)+"被投死，"+(j+1)+"号是"+players[j].role+"；";
			} 
		}
	 }
	 time[i].innerHTML=Math.floor((myform.time[i+1]-myform.time[i])/1000/60)+"小时"+Math.ceil((myform.time[i+1]-myform.time[i])/1000%60)+"分钟"
}


var play_againt=document.getElementById("play_againt");
play_againt.onclick=function(){location.href="home.html";};
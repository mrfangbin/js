var hamburg=document.querySelector(".hamburg");
 hamburg.onclick=function(){ location.href="diary.html";}
var goclose=document.querySelector(".close");
 goclose.onclick=function(){ location.href="home.html";}
/*获得表单数据*/

var myform=sessionStorage.ghostgame;

myform=JSON.parse(myform);

var players=sessionStorage.players;

players=JSON.parse(players);




/*补全html文档*/
var vote_area=document.querySelector("#vote_area");
var vote_box=document.querySelector(".vote_box");
var newNode=[];
for(var i=0 ; i<players.length -1;i++){
	newNode[i]=vote_box.cloneNode(true);
	vote_area.appendChild(newNode[i]);
}
var vote_number=document.querySelectorAll(".vote_number");
var vote_occ=document.querySelectorAll(".vote_occ");
for(var i=0 ; i<vote_number.length ;i++){
	vote_number[i].innerHTML=i+1+"号";
	if(players[i].isdeath){
		vote_occ[i].innerHTML="OUT";
	}else{
		vote_occ[i].innerHTML=players[i].role;
	}
}
var tip_1 = document.querySelector("audio+p");
var tip_2 = document.querySelector("#tips_tri+p");
var btn=document.getElementById("vote_btn");
	switch(myform.step){
		case "killer":
			tip_1.innerHTML = "杀手请睁眼，请选择要杀的对象";
			tip_2.innerHTML = "点击下方玩家头像，对被杀的玩家进行标记";
			btn.innerHTML = "杀死";
			break;
		case "sniper":
			tip_1.innerHTML = "狙击手请睁眼，（狙击手告诉法官是否开枪）狙击手请选择要杀的对象";
			tip_2.innerHTML = "点击下方玩家头像，对被狙击的玩家进行标记";
			btn.innerHTML = "狙死";
			break;
		case "doctor":
			tip_1.innerHTML = "医生请睁眼，（医生告诉法官是否扎）医生请选择要扎的对象";
			tip_2.innerHTML = "点击下方玩家头像，对被扎的玩家进行标记";
			btn.innerHTML = "扎它";
			break;
		case "police":
			tip_1.innerHTML = "警察请睁眼，请选择怀疑的对象，由法官确认";
			tip_2.innerHTML = "点击下方玩家头像，对被怀疑的玩家进行标记";
			btn.innerHTML = "怀疑";
			break;
	}
	
	

/*播放音乐*/
var play=document.getElementById("play");
var play_icon=document.getElementById("play_icon");
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

/*click事件*/
var vote_box=document.querySelectorAll(".vote_box");
var temp=-1;
for(var i=0 ; i< vote_box.length ;i++){
	vote_box[i].index=i;
	vote_box[i].addEventListener("click",changeVoteDisplay);
}
btn.addEventListener("click",updatePlayers);

/*函数*/

function changeVoteDisplay(){
	if(vote_occ[this.index].innerHTML!="OUT"){
		if(temp!=-1){
			vote_box[temp].className="vote_box";
		}
		vote_box[this.index].className="checked";
		temp=this.index;
	}	
}

function updatePlayers(){
	if(temp !=-1){
		switch(myform.step){
			case "killer":
				killMan(temp);
				break;
			case "sniper":
				sniperMan(temp);
				break;
			case "police":
				policeMan(temp);
				break;
			case "doctor":
				healingMan(temp);
				break;
			case "vote":
				voteStep(temp);
				break;
			default:
				break;
		}	
	}
	sessionStorage.players=JSON.stringify(players);
	if(myform.step=="vote"){
		location.href="decrypt.html";
	}else{
		location.href="diary.html";
	}
}


function killMan(i){
	players[i].k=1;
	var doctor=myform.doctor , sniper=myform.sniper;
	for(var k=0; k<players.length;k++){
		if(players[k].role=="医生"&&players[k].isdeath==true){
			doctor--;
		}
		if(players[k].role=="狙击手"&&players[k].isdeath==true){
			sniper--;
		}
	}
	if(doctor==0&&sniper==0){
		isDeath();
	}
}
	

function sniperMan(i){
	players[i].s=1;
	var doctor=myform.doctor ;
	for(var k=0; k<players.length;k++){
		if(players[k].role=="医生"&&players[k].isdeath==true){
			doctor--;
		}
	}
	if(doctor==0){
		isDeath();
	}
}
	
function policeMan(i){
	if(players[i].role == "杀手"){
	players[i].p=1;
	}
	
}
function healingMan(i){
	if(players[i].k=1){
		players[i].k=0;
	}
	players[i].d++;
	isDeath();
}
function voteStep(i){
	players[i].v=1;
	isDeath();
	myform.day++;
	sessionStorage.ghostgame=JSON.stringify(myform);
}

function isDeath(){
	for(var i=0; i<players.length ; i++){
		if(players[i].day==0){
			if(players[i].k==1 || players[i].s==1 || players[i].v==1 || players[i].d ==2){
				players[i].day=myform.day;
				players[i].isdeath=true;
			}
		}
	}
}	
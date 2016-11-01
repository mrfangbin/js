var goback=document.querySelector(".goback");
 goback.onclick=function(){ window.history.back();}
var goclose=document.querySelector(".close");
 goclose.onclick=function(){ location.href="home.html";}

var goback=document.querySelector(".goback");
var vote_btn=document.getElementById("vote_btn");
goback.onclick=function(){ window.history.back();}
vote_btn.onclick=function(){location.href="diary.html";}

var players=sessionStorage.players;
players=JSON.parse(players);

var myform=sessionStorage.ghostgame;
myform=JSON.parse(myform); 

myform.day=1;
myform.time=[];

var myDate=new Date();
myform.time[0]=myDate.getTime()/60;



for(var i=0 ; i<players.length ;i++){
	players[i].day=0;
	players[i].k=0;
	players[i].p=0;
	players[i].s=0;
	players[i].d=0;
	players[i].v=0;
	players[i].isdeath=false;
}

sessionStorage.ghostgame=JSON.stringify(myform);
sessionStorage.players=JSON.stringify(players);



var vote_area=document.querySelector("#vote_area");
var vote_box=document.querySelector(".vote_box");
var newNode=[];
for(var i=0 ; i<players.length -1;i++){
	newNode[i]=vote_box.cloneNode(true);
	vote_area.appendChild(newNode[i]);
}

var vote_number=document.querySelectorAll(".vote_number");
for(var i=0 ; i<vote_number.length ;i++){
	vote_number[i].innerHTML=i+1+"号";
}


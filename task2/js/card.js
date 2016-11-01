 var btn=document.querySelector(".btn");
 var back=document.getElementById("back");
 var front=document.getElementById("front");
 var number=document.querySelector(".number_card");
 var role=document.querySelector(".role");
 var cardword=document.querySelector(".word");
 var tip=document.querySelector(".tip p");
 var count=1 , i=0;
 
 btn.innerHTML="查看"+count+"号身份";
 number.innerHTML=count;
  /*事件监听*/
 btn.addEventListener("click", changeBack);

 var goback=document.querySelector(".goback");
 goback.onclick=function(){ window.history.back();}
	 
	 
 /*处理表单发送的信息*/

 var myform=sessionStorage.ghostgame;

 myform=JSON.parse(myform);

/*角色分配*/
	var players=[];
	if(myform.killer){
		/*杀人游戏*/
		var man=myform.man*1,
		doctor=myform.doctor*1+man ,
		police=myform.police*1+doctor ,    
		killer=myform.killer*1+police ,
		sniper=myform.sniper*1+killer;
		 for(var j=0 ;j< myform.total ; j++){
			players[j]={};
			if(j<man){
				players[j].role="平民";
			}else if(j<doctor){
				players[j].role="医生";
			}else if(j<police){
				players[j].role="警察";
			}else if(j<killer){
				players[j].role="杀手";
			}else{
				players[j].role="狙击手";
			}
		}
	}else if(myform.ghost){
		/*谁是卧底*/
		for(var j=0 ;j< myform.total ; j++){
			players[j]={};
			if(j<myform.man){
				players[j].role="平民";
				players[j].word=myform.word;
			}else{
				players[j].role="幽灵";
				players[j].word=myform.under_word;	
			}
		}
	}
players.randomSort = function() {  /*随机排序*/
	var input = this;
	for (var i = input.length-1; i >=0; i--) {
		var randomIndex = Math.floor(Math.random()*(i+1)); 
		var itemAtIndex = input[randomIndex]; 
		input[randomIndex] = input[i]; 
		input[i] = itemAtIndex;
	}
	return input;
}
	players.randomSort(); 
	sessionStorage.players=JSON.stringify(players);

 /*事件处理*/
  function changeBack(){
	i++;
	if(count<=players.length){
		if(i%2){  /*正面*/
			count++;
			if(count>players.length){
				btn.innerHTML="隐藏并传递给法官";
			}else{
				btn.innerHTML="隐藏并传递给"+count+"号";
			}
			back.classList.add("change");
			setTimeout(changeDispaly,1500)
			printRole(count-2);		
		 }else {  /*背面*/
			btn.innerHTML="查看"+count+"号身份";
			number.innerHTML=count;
			front.classList.add("change");
			setTimeout(changeDispaly,1500);
		 }
	}else{
		if(i%2==0){/*背面*/
			btn.innerHTML="开始";
			front.classList.add("change");
			setTimeout(changeDispaly,1500);
		}else {
			document.location.href="vote_blank.html";
		}
	}	
 }
 

 /*函数*/
 function changeDispaly(){
	if(i%2){
		back.classList.remove("change");
		back.style.display="none";
		front.style.display="block";
	}else{
		front.classList.remove("change");
		back.style.display="block";
		front.style.display="none";
	}
 }
  function printRole(i){
	if(myform.killer){
		role.innerHTML="角色："+players[i].role;
		switch(players[i].role){
			case "警察":
				 tip.innerHTML="游戏中的正义角色，游戏目的是找出杀手，并说服平民，帮助平民抓住杀手。当所有杀手死亡，警察获胜。";
				 break;
			case "杀手":
				 tip.innerHTML="游戏中的反面角色，游戏目的是要杀死警察的角色扮演者或者在警察都没有死的情况下，杀死所有的平民。";
				 break;
			case "狙击手":
				 tip.innerHTML="狙击手可以选择不开枪，游戏内只可以杀一人，被杀的人不能被医生救助";
				 break;
			case "医生":
				 tip.innerHTML="医生可以给他觉得将被杀手杀的警察打针，如果被杀手刀的同时也被医生打针，那么他可以不被杀";
				 break;
			case "平民":
				 tip.innerHTML="水民只可以在白天投票.晚上被禁止说话，水民胜利的条件是找出并出票推死杀手.";
				 break;
		}
	}else if(myform.ghost){
		cardword.innerHTML="词组："+players[i].word;
	  }
 }
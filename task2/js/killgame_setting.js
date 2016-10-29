var number=document.querySelector(".number");
var total=document.querySelector("input[type=range]")
var player=document.querySelectorAll("input[type=number]");
var playersetting=document.querySelector("ul+p");
var down=document.querySelector(".down");
var up=document.querySelector(".up");
var tosubmit=document.querySelector("button");

var j=0;

total.addEventListener("change",changeTotal);
playersetting.addEventListener("click",setPlayer);
down.addEventListener("click",downTotal);
up.addEventListener("click",upTotal);
tosubmit.addEventListener("click",getForm);

number.innerHTML=total.value;
setValue();
setReadonly();

function changeTotal(){
	number.innerHTML=total.value;
	setValue();
}

function setPlayer(){
	if(j%2){
		setReadonly();
	}else{
		removeReadonly();
	}
	j++;
}

function setReadonly(){
	var temp=player[0].value*1+player[1].value*1+player[2].value*1+player[3].value*1+player[4].value*1;
	if(j>0&&temp!=total.value){
		alert("您输入的人数总数为"+temp+"，与设置的总人数不同，请重新输入");
		j--;
	}else {
		for (var i=0 ; i<player.length ; i++){
			player[i].setAttribute("readonly","readonly");
		}
		playersetting.innerHTML="点击设置<span class='pen'></span>";		
	}
}

function removeReadonly(){
	for (var i=0 ; i<player.length ; i++){
		player[i].removeAttribute("readonly");
	}
	player[0].focus();
	playersetting.innerHTML="OK";
}

function setValue(){
	player[0].value=parseInt(total.value/6);
	player[2].value=parseInt(total.value/6);
	player[1].value=Math.ceil(total.value/4)-player[0].value;
	player[3].value=Math.ceil(total.value/4)-player[2].value;
	player[4].value=total.value - player[0].value*2 - player[1].value*2 ;
}

function downTotal(){
	total.value--;
	changeTotal();
}

function upTotal(){
	total.value++;
	changeTotal();
}


function getForm(){
	/*存储表单信息*/
	var myform={
		total : total.value ,
		police : player[0].value ,
		doctor : player[1].value ,
		sniper : player[2].value ,
		killer : player[3].value ,
		man : player[4].value
	};
	myform=JSON.stringify(myform);
	sessionStorage.ghostgame=myform;
}
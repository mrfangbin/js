var number=document.querySelector(".number");
var total=document.querySelector("input[type=range]")
var player=document.querySelectorAll("input[type=number]");
var playersetting=document.querySelector("#player_setting");

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
	if(j>0&& 2*player[0].value>total.value){
		alert("您输入的卧底人数大于平民人数，请重新输入");
		j--;
	}else {
		for (var i=0 ; i<player.length ; i++){
			player[i].setAttribute("readonly","readonly");
		}
		setValue();
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
	player[1].value=total.value-player[0].value;
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
		ghost : player[0].value ,
		man : player[1].value ,
		word : document.querySelector("input[name=word]").value ,
		under_word : document.querySelector("input[name=under_word]").value 
	};
	myform=JSON.stringify(myform);
	sessionStorage.ghostgame=myform;
}



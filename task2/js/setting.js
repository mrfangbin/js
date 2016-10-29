var off=document.getElementById("off");
var on=document.getElementById("on");
var btn=document.querySelector( ".btn");
var horn=document.getElementById("horn");
btn.addEventListener("click",chanceBtnColor);

function chanceBtnColor(){
	if(off.className=="checked"){
		on.className="checked";
		off.className="";
		horn.className="horn";
	}else {
		off.className="checked";
		on.className="";
		horn.className="horn_close";
	}
	
}

 var goback=document.querySelector(".goback");
 goback.onclick=function(){ window.history.back();}
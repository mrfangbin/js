	var pre=document.getElementById("pre");
	var next=document.getElementById("next");
	var carousel=document.getElementById("carousel");
	carousel.style.marginLeft="0%";	
	pre.addEventListener("click" , goPre );
	next.addEventListener("click", goNext);
	
	document.getElementById("page_0").className="page_now";
	
	function goPre(){
		if(parseInt(carousel.style.marginLeft)==-100){
			pre.style.display="none";
		}
		carousel.style.marginLeft=parseInt(carousel.style.marginLeft)+100+"%";
		next.style.display="block";
		pageColor();
	}
	function goNext(){	
		if(parseInt(carousel.style.marginLeft)==-100){
			next.style.display="none";
		}
		carousel.style.marginLeft=parseInt(carousel.style.marginLeft)-100+"%";
		pre.style.display="block";
		pageColor();
	}
	
	function pageColor(){
		var page_0=document.getElementById("page_0");
		var page_1=document.getElementById("page_1");
		var page_2=document.getElementById("page_2");
		switch(parseInt(carousel.style.marginLeft)){
			case 0:
				page_2.className="page_status";
				page_1.className="page_status";
				page_0.className="page_now";
				break;
			case -100:
				page_0.className="page_status";
				page_2.className="page_status";
				page_1.className="page_now";
				break;
			case -200:
				page_0.className="page_status";
				page_1.className="page_status";
				page_2.className="page_now";
				break;
		}
	}
	
	var mean=document.getElementById("hamburg_box");
	mean.addEventListener("click",getMean);
	var meanbox=document.querySelector("aside");
	function getMean(e){
		meanbox.style.transition="margin 0.5s ease-in 0s";
		if(meanbox.style.marginLeft=="-70%")
			meanbox.style.marginLeft=0;
		else
			meanbox.style.marginLeft="-70%";
	}
	
	
	
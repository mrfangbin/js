var row=1 , cell=1 ,color=1 ;
 function func(){
	color=Math.floor(Math.random()*3)+1;
	row=Math.floor(Math.random()*3)+1;
	cell=Math.floor(Math.random()*3)+1;
	var chance_id="r"+row+"c"+cell;
	var chance=document.getElementById(chance_id);
	while(1){
		if((color==1&&chance.className=="red")||color==2&&chance.className=="green"||color==3&&chance.className=="blue")
			color=Math.floor(Math.random()*3)+1;
		else
			break;
	}
	switch(color){
		case 1:
			chance.className="red";
			console.log("格子"+chance_id+"变成红色");
			break;
		case 2:
			chance.className="green";
			console.log("格子"+chance_id+"变成绿色");
			break;
		case 3:
			chance.className="blue";
			console.log("格子"+chance_id+"变成蓝色");
			break;
	};
	setTimeout(func , 1000);
 };
setTimeout(func , 1000);
	
	
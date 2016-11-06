
$(function(){
	//读取本地存储，获取id
	var myid=sessionStorage.myid;
	var myinfo={};
	$("form").hide();
	//查询id信息
	$.get("mytask/student/"+myid,function(data,textStatus){
		data=JSON.parse(data);
		myinfo=data;
		displayMyinfo();//补全页面
	});
			
	//按钮变化
	$("button").first().click(function(){
		$("form").toggle();
		$("#info").toggle();
	});
	$("button").last().click(function changDisplay(){
		$("form").toggle();
		$("#info").toggle();
	});
	
	//删除学生信息
	$("#delete").click(function(){
		alert(myid);
		$.post("mytask/students",{
			id:+myid
		},function(data,textStatus){
				alert("delete ok");
			});
	})
	
	//修改信息
	$("form").submit(function(){
		var  time="";
		time=$("#joinTime").val();
		time=time.replace(/-/g,"");
		time=Number(time);

		$.ajax({
			type:"PUT",
			url:"mytask/student/"+myid,
			data:{
			"id":myid,
			"name":$("#name").val(),
			"qq":$("#qq").val(),
			"type":+$("input[name=type]:checked").val(),
			"school":$("#school").val(),
			"talent":+$("input[name=talent]:checked").val(),
			"level":+$("input[name=level]:checked").val(),
			"joinTime":+time,
			"wish":$("#wish").val()
			},
			success:function(data,textStatus){
				console.log(textStatus);
				alert(data);
				console.log(data);
			},
			error:function(XHR,textStatus,errorThrown){
				alert("错误"+textStatus);
			}
		})
		return false;  //重要，缺失可能导致ajax请求不执行,被挤掉了
	})
	
	
	//补全页面
	function displayMyinfo(){
		$("#myname").html(myinfo.name);
		$("#myqq").html(myinfo.qq);
		var type="";
		switch(myinfo.type){
						case 1:
							type="CSS";
							break;
						case 2:
							type="JS";
							break;
						case 3:
							type="JAVA";
							break;
						case 4:
							type="运维";
							break;
						case 5:
							type="DBA";
							break;
						case 6:
							type="产品";
							break;
						case 7:
							type="IOS";
							break;
						case 8:
							type="ANDROID";
							break;
					}
		$("#mytype").html(type);
		$("#myschool").html(myinfo.school);
		var talent="";
		switch(myinfo.talent){
						case 1:
							talent="学霸";
							break;
						case 2:
							talent="学渣";
							break;
		}
		$("#mytalent").html(talent);
		var level="";
		switch(myinfo.level){
						case 1:
							level="0基础";
							break;
						case 2:
							level="3个月内";
							break;
						case 3:
							level="6个月内";
							break;
						case 4:
							level="1年内";
							break;
						case 5:
							level="3年内";
							break;
						case 6:
							level="3年以上";
							break;
					}
		$("#mylevel").html(level);
		var time=myinfo.joinTime+"";
		time_val=time.substr(0,4)+"-"+time.substr(4,2)+"-"+time.substr(6,2);
		time=time.substr(0,4)+"年"+time.substr(4,2)+"月"+time.substr(6,2)+"日";
		$("#myjoinTime").html(time);
		$("#mywish").html(myinfo.wish);
		
		$("#name").val(myinfo.name);
		$("#qq").val(myinfo.qq);
		$("#school").val(myinfo.school);
		$("#joinTime").val(time_val);
		$("#wish").val(myinfo.wish);
		var type_radio=document.querySelectorAll("input[name=type]");
		for(var i=0 ;i < type_radio.length ;i++){
			if(type_radio[i].value==myinfo.type){
				type_radio[i].checked="checked";
			}
		}
		var talent_radio=document.querySelectorAll("input[name=talent]");
		for(var i=0 ;i < talent_radio.length ;i++){
			if(talent_radio[i].value==myinfo.talent){
				talent_radio[i].checked="checked";
			}
		}
		var level_radio=document.querySelectorAll("input[name=level]");
		for(var i=0 ;i < level_radio.length ;i++){
			if(level_radio[i].value==myinfo.level){
				level_radio[i].checked="checked";
			}
		}
		
	}
	
	
	
})

/*	//修改学生
	$("button").first().click(function(){	

		success:function(data,textStatus){
			console.log(textStatus);
			console.log(data);
			}
		});
	})
	
	
		

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	*/
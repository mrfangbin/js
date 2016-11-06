
$(function(){

	$("form").submit(function(){	
		var  time="";
		time=$("#joinTime").val();
		time=time.replace(/-/g,"");
		time=Number(time);
		$.post("mytask/student",{
			"name":$("#name").val(),
			"type":+$("input[name=type]:checked").val(),
			"qq":$("#qq").val(),
			"school":$("#school").val(),
			"talent":+$("input[name=talent]:checked").val(),
			"level":+$("input[name=level]:checked").val(),
			"joinTime":+time,
			"wish":$("#wish").val()
		},function(data,textStatus){
			console.log(textStatus);
			console.log(data);
			alert("ok");
			location.href="student_list.html";
		});
		return false;
	});
	$("button").last().click(function(){
		location.href="student_list.html";
	})
	
})


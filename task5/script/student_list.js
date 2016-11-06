
$(function(){
	var students=[];
	$.get("mytask/students",function(data,textStatus){
		data=JSON.parse(data);
		students=data.data;
		/*添加页面页数*/
		if(students.length>90){
			for(var i=1, temp="";i<7;i++){
				temp+="<span class='page'>"+i+"</span>";	
			}
			temp+="<span class='dots'>...</span>"+"<span class='page'>"+(Math.ceil(students.length/10)-1)+"</span>"+"<span class='page'>"+Math.ceil(students.length/10)+"</span>";
		}else{
			for(var i=1, temp="";i<=Math.ceil(students.length/10);i++){
				temp+="<span class='page'>"+i+"</span>";
			}
		}

		$("span.pre").after(temp);
		/*跳转至指定页面,显示表格内容*/
		$("span.page").click(function(){
			$("span.page").removeClass("now");
			this.className+=" now";
			var page=this.innerHTML;
			var count=(page-1)*10-1;
			for(var i=1 ,type="",time="" ;i<11; i++ ){	
				if(count+i<students.length){
					switch(students[count+i].type){
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
					time=students[count+i].joinTime+"";
					time=time.substr(0,4)+"年"+time.substr(4,2)+"月"+time.substr(6,2)+"日";
					
					$("#row_"+i).children().first()
					.children().first().val(students[count+i].id).next().html(students[count+i].id+students[count+i].name).parent()
					.next().html(type)
					.next().html(time);
				}else{
					$("#row_"+i).children().first()
					.children().first().val(0).next().html("").parent()
					.next().html("")
					.next().html("");
				}
			}
		})
		$("span.page").first().trigger("click");//初始化，默认第一页
	});
	

	//前一页
	$("span.pre").click(function(){
		var $temp=$("span.page.now").prev()
		var i=+$temp.next().html()-1;
		if($temp.hasClass("dots")){
			$temp.prevAll(".page").each(function(){
				this.innerHTML=i--;
			});
			$temp.prev().trigger("click");
		}else if($temp.hasClass("page")){
			$temp.trigger("click");
		}else if(i>5){
			$temp=$("span.dots");
			$temp.prevAll(".page").each(function(){
				this.innerHTML=i--;
			});
			$temp.prev().trigger("click");
		}else if(i>0){
			$temp=$("span.dots");
			$temp.prevAll(".page").each(function(){
				this.innerHTML=5+i--;
			});
		};
	});
	//后一页
	$("span.next").click(function(){
		var $temp=$("span.page.now").next();
		var i=+$temp.prev().html()+1;
		if($temp.hasClass("dots")){
			if(i<Math.ceil(students.length/10)-7){
				$temp.prevAll(".page").each(function(){
					this.innerHTML=5+i--;
				});
				$("span.page").first().trigger("click");
			}else if((i<Math.ceil(students.length/10)-1)){
				$temp.prevAll(".page").each(function(){
					this.innerHTML=i--;
				});
			}else{
				$temp.next().trigger("click");
			}
		}else if($temp.hasClass("page")){
			$temp.trigger("click");
		}
	});
	//提交表单，删除学生
	$("form").submit(function(){
		$.post("mytask/students",$(":checkbox").serialize(),
		function(data,textStatus){
				alert("delete ok");
				location.reload();
			});
		return false;
	})
	//唤出多选框
	$("button").hide().first().show();
	$("button").click(function(){
			$("button").first().toggle()
			.next().toggle()
			.next().toggle();
			$("td input").toggle();
		})
	//显示个人信息
	$("tr td span").click(function(){
		var $temp=$(this);
		var myid=+$temp.prev().val();
		sessionStorage.myid=myid;
		location.href="student_information.html";
	});
	//添加、报名
	$("#addStudent").click(function(){
		location.href="student_registration.html";
	});
	
})
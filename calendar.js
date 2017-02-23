//封装一个对象
;(function(){
function calendar(){
	    _this_=this;
	    ids=null;
	     now=new Date();
	  //需要添加事件的元素的集合
		var idsArr=['yearL','yearR','y','m','monthL','monthR','hoursL','hoursR','minL','minR','calenderClose',
		             'calendar','h','i','s'];
	    if(!ids){ids=this.gids(idsArr)};
	    this.getHead(now)
	    this.getCalendar();
	    this.addClickEvents();
	}
 //对象的方法
calendar.prototype={
		//获取数组元素
		gids:function(idArr){
           var oId=[];
           for(var i=0;i<idArr.length;i++){
           	oId[idArr[i]]=document.getElementById(idArr[i]);
           }
           return oId;          //数组名
		},
		//获取日历头部
		getHead:function(nowLast){
			ids['y'].innerHTML=nowLast.getFullYear();
			ids['m'].innerHTML=this.fillzero(nowLast.getMonth()+1);
		},
		//获取日历主体
		getCalendar:function(){
			var dateMonth=ids['m'].innerHTML;            //12
			var dateYear=ids['y'].innerHTML;             //2016
			var nowLast=new Date(dateYear,dateMonth-1,1);
			var dateWeek=nowLast.getDay();   //4
			// alert(dateWeek);
			var mon=[31,dateYear%4==0?29:28,31,30,31,30,31,31,30,31,30,31];
		var str="",day=1;
		str+='<table width="100%" border="0" bgcolor="#cecece" cellspacing="1" cellpadding="0">';
		for(var md=mon[dateMonth-2],wd=md-dateWeek+1,n=0;n<6;n++){
			str+='<tr bgcolor="#ffffff" height="23">';
			for(var nn=0;nn<7;nn++){
				if(wd<=md){
					str+='<td class="col666">'+wd+'</td>';
					wd++;
				}else {
					if(day<=mon[dateMonth-1]){
						if(day==now.getDate() && (dateMonth-1)==now.getMonth()&&dateYear==now.getFullYear()){
							str+='<td class="bg9ebdd6">'+(day++)+'</td>';
						}else{
							str+='<td>'+(day++)+'</td>';
						}
						var day2=1;
					}else{
						str+='<td class="col666">'+(day2++)+'</td>';
					}
				}
			}
			str+='</tr>';
		}
		str+='</table>';
		ids['calendar'].innerHTML=str;
		},
      
	   //如果日期为一位数，则在前面补零
	   fillzero:function(str){
		var str=typeof(str)=="string"?str:str.toString();
		if(str.length==1){
			str="0"+str;
		}
		return str;
	    },
	   //获取目标对象
	    getTarget:function(e){
		var e=e||window.event;
		return e.srcElement||e.target;
	    },
	   //如果日期为一位数，则在前面补零
	    fillzero:function(str){
		var str=typeof(str)=="string"?str:str.toString();
		if(str.length==1){
			str="0"+str;
		}
		return str;
	    },
	   //添加事件
	    addEvent:function(element,event,handler){
		var element=typeof element=="string"?document.getElementById(element):element;
				if(element.addEventListener){
					element.addEventListener(event,handler,false)
				}else if(element.attachEvent){
					element.attachEvent("on"+event,handler);
				}else{
					element["on"+event]=handler;
				}
	    },
	    //为SELECT添加事件
	 addEventForSelect:function(type){
	 	var self=this;
		function changeInner(){
			ids[type].innerHTML=self.fillzero(oSelect.value);
			self.getCalendar();
		}
		//看不懂
		var oSelect=this.gids.call(window,['calenderSelect'])['calenderSelect'];
		// var oSelect=this.gids(['calenderSelect']);
		oSelect.focus();      
		this.addEvent(oSelect,'change',changeInner);
		// this.addEvent(oSelect,"blur",changeInner);
	},
	
	//生成option选项
	 createOption:function(type,v){
		var str='',str2='',i=0,i2=0;
		var self=this;
		function create(i,i2){
			while(i>=i2){
				if(v==i){
					str2+='<option value="'+i+'" selected>'+i+'</option>';
				}else{
					str2+='<option value="'+i+'">'+i+'</option>';
				}
				i--;
			}
			str+=str2+'</select>';
			ids[type].innerHTML=str;
			self.addEventForSelect(type);
		}
		
		str+='<select id="calenderSelect">';
		if(type=="y"){
			i=2050;i2=1990;
			create(i,i2);
			return;
		}
		if(type=="m"){
			i=1;i2=12;
		}
		if(type=="h"){
		   i=00;i2=23;
		}
		if(type=="i"){
			i=00;i2=59;
		}
		if(type=="s"){
			i=00;i2=59;
		}
		create(i2,i);
	},
	//年鼠标点击
	yClick:function(e){
		if(_this_.getTarget(e).tagName.toLowerCase()=="span"){
			_this_.createOption("y",ids['y'].innerHTML);
		}
	},
	
	//月鼠标点击
	mClick:function(e){
		if(_this_.getTarget(e).tagName.toLowerCase()=="span"){
			_this_.createOption("m",ids['m'].innerHTML);
		}
	},
	    //上一年
	yL:function(){
			ids['y'].innerHTML-=1;
		    _this_.getCalendar();
		},
	
	//下一年
	yR:function(){
		ids['y'].innerHTML=parseInt(ids['y'].innerHTML)+1;
		_this_.getCalendar();
	},
	
	//上一月
	mL:function(){
		// var self=this？？;这里用不了this this==mL  调用的对象mL
		if (parseInt(ids['m'].innerHTML)<2) {
                ids['m'].innerHTML=12;
                ids['y'].innerHTML=parseInt(ids['y'].innerHTML)-1;
                _this_.getCalendar();
		} else {
			ids['m'].innerHTML=_this_.fillzero(ids['m'].innerHTML-1);
		   _this_.getCalendar();
		}
		
	},
	
	//下一月
	mR:function(){
		if (parseInt(ids['m'].innerHTML)>11) {
			ids['m'].innerHTML=_this_.fillzero(1);
			ids['y'].innerHTML=parseInt(ids['y'].innerHTML)+1;
			_this_.getCalendar();
		} else {
			ids['m'].innerHTML=_this_.fillzero(parseInt(ids['m'].innerHTML)+1);
		    _this_.getCalendar();
		}
		
	},
	 // each方法：
		each:function(handler){
		   var o=null;
	       for(var i=0,len=this.length;i<len;i++){
		        o=typeof this[i]=="string"?document.getElementById(this[i]):this[i];
		        handler(o,i);
	            }
	   },
		//为按钮添加事件
		addClickEvents:function(){
			var self=this;   //this==calendar
	      var handlers=[this.yL,this.yR,this.mL,this.mR];
	      this.each.call([ids['yearL'],ids['yearR'],ids['monthL'],ids['monthR']],function(o,i){
		      self.addEvent(o,"click",handlers[i]);
	       })
	      var clicks=[this.yClick,this.mClick];
	       this.each.call([ids['y'],ids['m']],function(o,i){
		  self.addEvent(o,"click",clicks[i]);
	       })
	       this.each.call(ids['calendar'].getElementsByTagName("td"),function(o,i){
			self.addEvent(o,"mouseover",function(e){
				o.style.backgroundColor="#9ebdd6";
			})
			self.addEvent(o,"mouseout",function(e){
				o.style.backgroundColor="";
			})
		})
	}
};
window["calendar"] = calendar;
})();


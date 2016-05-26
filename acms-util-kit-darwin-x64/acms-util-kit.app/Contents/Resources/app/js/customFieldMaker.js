$(function(){
	$(document).on("click",".js-acms-tooltip",function(e){
		ACMS.Dispatch._tooltip(this);
	});
	var userAgent = window.navigator.userAgent.toLowerCase();
	var chrome = false;
	if (userAgent.indexOf('chrome') != -1){
		chrome = true;
	}
	var loadGoogleCode = function() {
		$('pre').removeClass('prettyprinted');
		ACMS.Library.googleCodePrettifyPost();
		var $sortable = $(".js-fieldgroup-sortable");
		if($sortable[0]){
			ACMS.Dispatch.fieldgroupSortable($sortable[0]);
		}
	};
	var group = new Moon.View({
		id:["group"],
		data:{
			kind:"group",
			type:"text",
			title:"",
			name:"",
			path:"path",
			normal:"size",
			alert:"",
			option:[{value:"",label:""}],
			openValidator:false,
			openValidator:false,
			validator:[{option:"",value:"",message:""}],
		},
		method:{
			refresh:function(){
				generator.removeData(["groupTitle","groupName","openGroup"]);
				this.removeData(["title","name","path","normalSize","tiny","tinySize","large","largeSize","square","squareSize","alt","openValidator","converter","tooltip"]);
				this.data.path = "path";
				generator.update();
                main.update(generator.data.updateMode);
				this.update();
				main.saveData("customField");
				loadGoogleCode();
			},
            update:function(){
                this.update();
                main.update(generator.data.updateMode);
                loadGoogleCode();
            },
			addOption:function(){
				this.data.option.push({value:"",label:""});
				this.update();
				main.update(generator.data.updateMode);
                loadGoogleCode();
			},
			removeOption:function(string){
				this.removeDataByString(string);
				this.update();
			},
			removeAlert:function(){
				this.data.alert = "";
				this.update();
			}
		}
	});
    var unit = new Moon.View({
        id:["unit"],
        data:{
            kind:"unit",
            type:"text",
            title:"",
            name:"",
            path:"path",
            normal:"size",
            option:[{value:"",label:""}],
            openValidator:false,
            openValidator:false,
            validator:[{option:"",value:"",message:""}],
        },
        method:{
            refresh:function(){
                this.removeData(["title","name","path","normalSize","tiny","tinySize","large","largeSize","square","squareSize","alt","openValidator","converter","resize","tooltip"]);
                this.data.type = "text";
                this.data.option = [{value:"",label:""}];
                this.data.path = "path";
                this.data.normal = "size";
                this.data.validator = [{option:"",value:"",message:""}];
                this.update();
            },
            update:function(){
                this.update();
                main.update(generator.data.updateMode);
                loadGoogleCode();
            },
            addOption:function(){
                this.data.option.push({value:"",label:""});
                this.update();
                main.update(generator.data.updateMode);
                loadGoogleCode();
            },
            removeOption:function(string){
                this.removeDataByString(string);
                this.update();
            },
        }
    });
	var generator = new Moon.View({
		id:["generator"],
		data:{
			kind:"generator",
			mode:"normal",
			type:"text",
			title:"",
			alert:"",
			groupTitle:"",
			groupName:"",
			groupAlert:"",
			path:"path",
			converter:"",
			normal:"size",
			resize:false,
			chrome:chrome,
			option:[{value:"",label:""}],
			openValidator:false,
			openConverter:false,
            openGroup:false,
			validator:[{option:"",value:"",message:""}],
			group:[],
            unit:[],
			acmscss:"true",
			editMode:"source",
			updateMode:"text"
		},
		method:{
			submit:function(){
				if(this.data.name && this.data.type　&& this.data.title){
					this.data.alert = "";
					this.update();
					main.data.item.push(this.getData());
					main.update(this.data.updateMode);
					main.saveData("customField");
					loadGoogleCode();
				}else{
					this.data.alert = "true";
					this.update();
					main.update(this.data.updateMode);
					loadGoogleCode();
				}
			},
			toggleCss:function(){
				main.data.acmscss = this.data.acmscss;
				main.update(this.data.updateMode);
				main.saveData("customField");
				loadGoogleCode();
			},
			refresh:function(){
				this.removeData(["title","name","path","normalSize","imagename","tiny","tinySize","large","largeSize","square","squareSize","alt","openValidator","openConverter","converter","alert","groupAlert","extension","fileName","tooltip"]);
				this.data.type = "text";
				this.data.option = [{value:"",label:""}];
				this.data.validator = [{option:"",value:"",message:""}];
				if(this.data.editMode == "source" || this.data.editMode == "confirm"){
					this.data.updateMode = "text";
				}else{
					this.data.updateMode = "";
				}
				this.data.path = "path";
				this.data.normal = "size";
				this.update();
				main.data.mode = this.data.mode;
				main.update(this.data.updateMode);
				loadGoogleCode();
				main.saveData("customField");
				if(this.data.mode == "group"){
					group.method.refresh.apply(group);
				}else if(this.data.mode == "unit"){
                    unit.method.refresh.apply(unit);
                }
			},
			historyClear:function(){
				main.data.item = [];
				main.saveData("customField");
				main.update(this.data.updateMode);
				loadGoogleCode();
			},
			addOption:group.method.addOption,
			removeOption:group.method.removeOption,
			/*バリデーター*/
			update:function(){
				if(this.data.editMode == "source" || this.data.editMode == "confirm"){
					this.data.updateMode = "text";
				}else{
					this.data.updateMode = "";
				}
				this.update();
				unit.update();
				group.update();
                main.update(this.data.updateMode);
                loadGoogleCode();
			},
			addValidator:function(){
				this.data.validator.push({option:"",value:"",message:""});
				this.update();
                main.update(this.data.updateMode);
                loadGoogleCode();
			},
			removeValidator:function(string){
				this.removeDataByString(string);
				this.update();
                main.update(this.data.updateMode);
                loadGoogleCode();
			},
			/*コンバーター*/
			addConverter:function(item){
				if(!this.data.converter){
					this.data.converter = "";
				}
				var converter = this.data.converter;
				var reg = new RegExp(item, "i");
				if(converter.search(reg) === -1){
					this.data.converter += item;
				}else{
					converter = converter.replace(item.toUpperCase(),item);
					converter = converter.replace(item.toLowerCase(),item);
					this.data.converter = converter;
				}
				this.update();
                main.update(this.data.updateMode);
                loadGoogleCode();
			},
			showConverter:function(){
				var $converter = $("#converter");
				$converter.css("display","block");
				$converter.delay(1).queue(function(next){
					$(this).addClass("in");
					next();
				});
			},
			hiddenConverter:function(){
				if($(this.e.target).attr("id") == "converter"){
					var $converter = $("#converter");
					$converter.removeClass('in');
					$converter.delay(200).queue(function(next){
						$(this).css("display","none");
						next();
					});
				}
			},
			addGroup:function(){
				var data = group.getData();
				if(data.type && data.name && data.title){
					this.data.group.push(data);
					main.data.group = this.data.group;
					main.data.groupTitle = generator.data.groupTitle;
					main.data.groupName = generator.data.groupName;
					main.update(this.data.updateMode);
					main.saveData("customField");
					loadGoogleCode();
				}else{
					this.data.alert = "true";
                	this.update();
                	group.update();
                	main.update(this.data.updateMode);
                	loadGoogleCode();
				}
			},
			clearGroup:function(){
				this.data.group = [];
				main.data.group = [];
				main.removeData(["groupTitle","groupName"]);
				this.update();
                main.update(this.data.updateMode);
				group.update();
				main.saveData("customField");
				loadGoogleCode();
			},
			clearGroupInput:function(){
				group.method.refresh.apply(group);
			},
            addUnit:function(){
                var data = unit.getData();
                if(data.type && data.name && data.title){
                    this.data.unit.push(data);
                    main.data.unit = this.data.unit;
                    main.update(this.data.updateMode);
                    main.saveData("customField");
                    loadGoogleCode();
                }else{
                	this.data.alert = "true";
                	this.update();
                	unit.update();
                	main.update(this.data.updateMode);
                	loadGoogleCode();
                }
            },
            clearUnit:function(){
                this.data.unit = [];
                main.data.unit = [];
                this.update();
                main.update(this.data.updateMode);
                unit.update();
                main.saveData("customField");
                loadGoogleCode();
            },
            clearUnitInput:function(){
            	unit.method.refresh.apply(unit);
            },
			copy:function(){
				var $alert = $("<div class='customFieldCopied'>クリップボードにコピーしました</div>");
				$("body").append($alert);
				$alert.delay(1).queue(function(next){
					$(this).addClass("active");
					next();
				}).delay(700).queue(function(next){
					$(this).removeClass('active');
					next();
				}).delay(200).queue(function(next){
					$(this).remove();
					next();
				});
				if(this.data.editMode == "source") {
					main.copyToClipBoard("prettyPrint");
				}else if(this.data.editMode == "confirm"){
					main.copyToClipBoard("prettyPrintConfirm");
				}
			},
            showGroup:function(){
            	if(!this.data.groupName){
            		this.data.groupAlert = "true";
            		this.update();
                	group.update();
                	main.update(this.data.updateMode);
                	loadGoogleCode();
            		return false;
            	}
            	this.data.groupAlert = "";
                this.data.openGroup = true;
                this.update();
                group.update();
                main.data.groupTitle = this.data.groupTitle;
                main.data.groupName = this.data.groupName;
                main.update(this.data.updateMode);
                loadGoogleCode();
                main.saveData("customField");
            },
            removeGroupAlert:function(){
            	this.data.groupAlert = "";
        		this.update();
            	group.update();
            	main.update(this.data.updateMode);
            	loadGoogleCode();
            },
            removeAlert:function(){
            	this.data.alert = "";
            	this.update();
            	main.update(this.data.updateMode);
            	group.update();
            	unit.update();
            	loadGoogleCode();
            }
		}
	});
	var main = new Moon.View({
		id:["prettyPrint","prettyPrintConfirm"],
		data:{
			item:[],
            group:[],
            unit:[],
			mode:"normal",
			acmscss:"",
			groupLength:function(){
				return main.data.group.length + 2;
			}
		},
		convert:{
			escapeBackslash:function(val){
				return val.replace(/(\\*)/g,"\\$1");
			},
			getExtension:function(val){
				return val.split('.').pop();
			}
		},
	});
	main.loadData("customField");
	main.data.mode = "normal";
	generator.data.acmscss = main.data.acmscss;
	generator.data.groupTitle = main.data.groupTitle;
	generator.data.groupName = main.data.groupName;
	generator.data.group = main.data.group;
	generator.update();
    main.update("text");
	loadGoogleCode();
});
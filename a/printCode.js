var condButton = "<input type=button class=listInput value=刪除 onclick=deleteCondition(this)></input>";

var brands = {};

var state = 0;
var SELECT_BRAND = 1;
var SELECT_PRODUCT = 2;

function addCondition(fieldEid, fieldName, condition) {
    var row = $("queryFilterList").insertRow(0);
    row.id = fieldEid;
    var cell = row.insertCell(0);
    cell.innerHTML = fieldName;
    cell.className = "qc1";
    cell = row.insertCell(1);
    cell.innerHTML = condition;
    cell.className = "qc2";
    cell = row.insertCell(2);
    cell.innerHTML = condButton;
    cell.className = "qc3";
    var button = cell.firstChild;
    button.value = "所有" + fieldName;
}
function deleteCondition(button) {
    var line = button.parentNode.parentNode;
    var p = line.parentNode;
    delete filterList[line.id];
    p.removeChild(line);
    filterInputFunc();
}
function deleteAllConditions() {
    var filterListTable = $('queryFilterList');
    while (filterListTable.hasChildNodes()) { //remove all options first
	filterListTable.removeChild(filterListTable.lastChild);
    }
}
function showConditions() {
    deleteAllConditions();
    for(var f in filterList) {
	if(parseInt(f)) addCondition(f, filterList[f].name, filterList[f].value);
    }
}

function onload() {
}

function queryButtonFunc() {
    getBrandOptions();
}
function selectCatFunc(catRadios) {
    getBrandOptions();
    state = SELECT_BRAND;
    //deleteAllConditions();
    /*
    filterList = {};
    filterList.getGetParams = function() {
	var params = "naming=EID";
	for(var f in this) {
	    params += "&where=" + f + "," + this[f].type + "," + this[f].value;
	}
	return params
    } 
    */
    $("queryResult").focus();
}
function getBrandOptions() {
    JSONP.request({
	url: URL_BRAND_NO,
	params: "naming=EID",
	callback: function(jsonObj) {
	    var results = {};
	    for(var id in jsonObj) {
		results[id] = jsonObj[id][F_BRAND_NO];
	    }
	    state = SELECT_BRAND;
	    showResult(results);
	}
    });
}
function addFilter(s) {
    if(event.keyCode == 13 || event.type == "dblclick") {
	//alert(s[s.selectedIndex].value);
	///* multi
	var options = s.getElementsByTagName("option");
	for(var i = 0; i < options.length; i++) {
	    if(options[i].selected) {
		if(state == SELECT_BRAND) {
		    addCondition(F_BRAND_NO, "品牌", options[i].value);
		    filterList[F_BRAND_NO] = new Filter(options[i].value, "eq", "品牌");
		    filterInputFunc();
		} else if(state == SELECT_PRODUCT) {
		    recordCode(options[i].value);
		}
	    }
	}
	$("queryFactor").focus();
	//*/
    }
    event.stopPropagation()
}
function filterInputFunc(t) {
    //if(event.keyCode == 13) {
	if(t) {
	    addCondition(F_PRODUCT_A_MODEL, "A-型號", t.value);
	    filterList[F_PRODUCT_A_MODEL] = new Filter(t.value, "like", "A-型號");
	}

	JSONP.request({
	    url: URL_PRODUCT_DATA,
	    params: filterList.getGetParams(),
	    callback: function(jsonObj) {
		var results = {};
		var str = "";
		for(var id in jsonObj) {
		    str = jsonObj[id][F_PRODUCT_NO];
		    str += " # ";
		    for(var i = str.length; i < 21; i++) {
			str += "-";
		    }
		    str += jsonObj[id][F_PRODUCT_NAME];
		    results[id] = str;
		}
		showResult(results);
		state = SELECT_PRODUCT;
		showConditions();
	    }
	});
    //}
    event.stopPropagation()
}

function showResult(results) {
    var resultArray = [];
    for(var id in results) {
	resultArray.push(results[id]);
    }
    resultArray.sort();
    var resultOption = $('queryResult');
    while (resultOption.hasChildNodes()) { //remove all options first
	resultOption.removeChild(resultOption.lastChild);
    }
    for(var i = 0; i < resultArray.length; i++) {
	var option = document.createElement('option');
	option.id = i;
	option.value = resultArray[i];
	option.text = resultArray[i];
	resultOption.add(option);
    }
}

function Filter(value, type, name) {
    this.value = value;
    this.type = type;
    this.name = name;
}

var filterList = {};
filterList.getGetParams = function() {
    var params = "naming=EID";
    for(var f in this) {
	params += "&where=" + f + "," + this[f].type + "," + this[f].value;
    }
    return params
} 

function recordCode(str) {
    var board = $('codeRecord');
    var code = str.split(" # ")[0];
    board.value = code + String.fromCharCode(10) + board.value;
}


/*
document.onkeydown = function (evt){
    var key = evt ? evt.which : event.keyCode;
    
    if(key == 13) {
	alert(event.currentTarget);
    }
}
*/

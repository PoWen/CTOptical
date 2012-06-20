//記憶體中的 filter 物件，用來當做送給 server 的依據
function Filter(field, type, qValue, name) {
    this.field = field;
    this.type = type;
    this.qValue = qValue;
    this.name = name;
}
function FilterList() {
    this.filters = {};

    this.addFilter = function(field, type, qValue, name) {
	this.filters[field] = new Filter(field, type, qValue, name);
	sendQuery();
	this.onScreen();
    }
    this.deleteFitler = function(key) {
	delete this.filters[key];
	sendQuery();
	this.onScreen();
    }
    this.getQueryParamsStr = function() {
	var str = "naming=EID";
	for(var f in this.filters) {
	    if(str) str += "&";
	    str += "where=" + this.filters[f].field + "," + this.filters[f].type + "," + this.filters[f].qValue;
	}
	return str;
    }
    this.onScreen = function() {
	var filterRows = [];
	for(var f in this.filters) {
	    var filter = this.filters[f];
	    filterRows.push(new FilterRow(filter.field, filter.name, filter.qValue));
	}
	updateFilterInfo.call($("queryFilterList"), filterRows);
    }
}
var filterList = new FilterList();

//記憶體中的 possible condtion field
function QueryField(field, name) {
    this.field = field;
    this.name = name;
}
function QueryFieldList() {
    this.fixedFields = {};
    this.dynamicFields = {};
}
var queryFieldList = new QueryFieldList();

//前端 html 中顯示 filter 的物件
function FilterRow(id, fieldName, condition) {
    this.id = id;
    this.fieldName = fieldName;
    this.condition = condition;
}
function updateFilterInfo(filterRows) {
    while (this.hasChildNodes()) { //remove all options first
	this.removeChild(this.lastChild);
    }
    for(var r in filterRows) {
	addFilterRow.call(this, filterRows[r]);
    }
}
function addFilterRow(filterRow) {
    var row = this.insertRow(0);
    row.id = filterRow.id;
    var cell = row.insertCell(0);
    cell.innerHTML = filterRow.fieldName;
    cell.className = "qc1";
    cell = row.insertCell(1);
    cell.innerHTML = filterRow.condition;
    cell.className = "qc2";
    cell = row.insertCell(2);
    cell.className = "qc3";
    var button = document.createElement('input');
    button.type = "button";
    button.className = "queryButton";
    button.onclick = deleteFilterRow;
    button.value = "所有" + filterRow.fieldName;
    cell.appendChild(button);
}
function deleteFilterRow() {
    var row = this.parentNode.parentNode;
    filterList.deleteFitler(row.id);
}

//顯示 query 的結果
function showResult(results) {
    var resultArray = [];
    for(var id in results) {
	resultArray.push(results[id]);
    }
    resultArray.sort();
    var resultOption = $("queryResult");
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

//element event handle func
function selectCatFunc() {
    //filterList.addFilter(F_BRAND_CAT, "eq", this.value, "類別");
    getBrandOptions();
    $("queryResult").focus();
}
function selectOptionFunc() {
    if(event.keyCode == 13 || event.type == "dblclick") {
	//alert(this[this.selectedIndex].value);
	///* multi
	var options = this.getElementsByTagName("option");
	for(var i = 0; i < options.length; i++) {
	    if(options[i].selected) {
		if(resultState == STATE_SELECT_BRAND) {
		    filterList.addFilter(F_BRAND_NO, "eq", options[i].value, "品牌");
		}
	    }
	}
	$("queryFactor").focus();
	//*/
    }
    event.stopPropagation()
}
function filterInputFunc() {
    var field = F_PRODUCT_A_MODEL;
    var type = "like";
    var name = "型號";
    filterList.addFilter(field, type, this.value, name);
    sendQuery();
}

var STATE_INIT = 0;
var STATE_SELECT_BRAND = 1;
var STATE_SELECT_PRODUCT = 2;
var resultState = STATE_INIT;

function onload() {
    getBrandOptions();
}

//query data from server
function getBrandOptions() {
    var catRadios = document.getElementsByName("productCat");
    var cat;
    for(var r in catRadios) {
	if(catRadios[r].checked) cat = catRadios[r].value;
    }
    JSONP.request({
	url: URL_BRAND_NO,
	params: "naming=EID" + (cat ? "&where=" + F_BRAND_CAT + ",eq," + cat : ""),
	callback: function(jsonObj) {
	    var results = {};
	    for(var id in jsonObj) {
		results[id] = jsonObj[id][F_BRAND_NO];
	    }
	    resultState = STATE_SELECT_BRAND;
	    showResult(results);
	}
    });
}
function sendQuery() {
    var resultOption = $("queryResult");
    while (resultOption.hasChildNodes()) { //remove all options first
	resultOption.removeChild(resultOption.lastChild);
    }
    var option = document.createElement('option');
    option.value = "搜尋中...";
    option.text = "搜尋中...";
    resultOption.add(option);

    JSONP.request({
	url: URL_PRODUCT_DATA,
	params: filterList.getQueryParamsStr(),
	callback: function(jsonObj) {
	    var results = {};
	    for(var id in jsonObj) {
		results[id] = jsonObj[id][F_PRODUCT_NO];
	    }
	    resultState = STATE_SELECT_PRODUCT;
	    showResult(results);
	}
    });
}

/*
document.onkeydown = function (evt){
    var key = evt ? evt.which : event.keyCode;
    
    if(key == 13) {
	alert(event.currentTarget);
    }
}
*/

function Product(no, name, unitPrice, unit) {
    this.no = no;
    this.name = name;
    this.unitPrice = parseFloat(unitPrice);
    this.unit = unit;

    if(isNaN(this.unitPrice))
	this.unitPrice = 0;
}

function TradeItem(tradeForm, productNo, name, unitPrice, unit, realPrice, qty, subtotal) {
    //所屬交易單物件
    this.tradeForm = tradeForm;
    //交易項目 no 的 nodeId
    this.nodeId = -1;
    this.rowId;

    this.productNo = productNo;
    this.name = name;
    this.unit = unit;

    this.unitPrice = parseFloat(unitPrice) || 0;
    this.realPrice = parseFloat(realPrice) || unitPrice;
    this.qty = parseFloat(qty) || 0;
    this.subtotal = parseFloat(subtotal) || 0;

    this.sendURL = URL_TRADE_ITEM;

    this.getRowId = function() {
	if(this.rowId) {
	    return this.rowId;
	} else {
	    if(this.productNo) {
		return this.productNo;
	    } else {
		return randomUUID();
	    }
	}
    }
    this.isNew = function() {
	return this.nodeId >= 0 ? false : true;
    }
    /*
    this.newEntry = function() {
	this.setNodeId(-1);
    }
    */
    this.calc = function() {
	this.subtotal = this.qty * this.realPrice * this.tradeForm.sign;
	this.onScreen();
	this.tradeForm.calcTotal();
    }
    this.onScreen = function() {
	var row = $(this.rowId);
	if(!row) {
	    row = $("myTable").insertRow(1);
	    row.id = this.rowId;
	    row.insertCell(0).innerHTML;
	    row.insertCell(1).innerHTML;
	    row.insertCell(2).innerHTML;
	    row.insertCell(3).innerHTML = tradeItemRealPriceInputCode;
	    row.insertCell(4).innerHTML = tradeItemQtyInputCode;
	    row.insertCell(5).innerHTML;
	    row.insertCell(6).innerHTML;
	    row.insertCell(7).innerHTML = tradeItemIncreaseButtonCode;
	    row.insertCell(8).innerHTML = tradeItemDecreaseButtonCode;

	    row.cells[3].firstChild.id = this.rowId + "_p";
	    row.cells[4].firstChild.id = this.rowId + "_q";
	}

	row.cells[0].innerHTML = this.productNo;
	row.cells[1].innerHTML = this.name;
	row.cells[2].innerHTML = this.unitPrice;
	row.cells[3].firstChild.value = this.realPrice;
	row.cells[4].firstChild.value = this.qty;
	row.cells[5].innerHTML = this.unit;
	row.cells[6].innerHTML = this.subtotal;

	(this.qty == 0) ? row.style.display = "none" : row.style.display = "table-row";
    }
    this.addQty = function(qty) {
	qty = parseFloat(qty);
	this.setQty(parseFloat(qty) + this.qty);
    }
    this.setQty = function(qty) {
	qty = parseFloat(qty);
	if(!isNaN(qty)) {
	    this.qty = qty;
	} else {
	    alert("請輸入數字");
	}
	if(this.qty < 0) {
	    this.qty = 0;
	}
	this.calc();
    }
    this.setRealPrice = function(realPrice) {
	realPrice = parseFloat(realPrice);
	if(!isNaN(realPrice)) {
	    this.realPrice = realPrice;
	} else {
	    alert("商品金額不是數字，請輸入數字");
	}
	this.calc();
    }
    this.setNodeId = function(nodeId) {
	nodeId = parseInt(nodeId);
	if(isNaN(nodeId)) {
	    alert("nodeId is NaN"); //set -1
	}

	if(nodeId >= 0) {
	    this.nodeId = nodeId;
	    this.sendURL = URL_TRADE_ITEM + "/" + this.nodeId;
	} else {
	    this.nodeId = -1;
	    this.sendURL = URL_TRADE_ITEM;
	}
    }
    this.renewPrice = function() {
	if(!this.productNo) {
	    //alert("商品無條碼");
	    this.calc();
	    return;
	}

	JSONP.request({
	    url: URL_PRODUCT_DATA,
	    dataSrc: this,
	    params: 'where=' + F_PRODUCT_NO + ',eq,' + this.productNo + '&naming=EID',
	    callback: function(jsonObj, paramObj) {
		var dataObj = jsonObj;
		var idArray = new Array();
		for(var id in dataObj) {
		    idArray.push(id);
		}
		if (idArray.length == 0) {
		    alert("查無商品資料");
		} else {
		    var productId = idArray.pop();
		    var productNo = dataObj[productId][F_PRODUCT_NO];
		    var productName = dataObj[productId][F_PRODUCT_NAME];
		    var productUnit = dataObj[productId][F_PRODUCT_UNIT];
		    var unitPrice = 0;
		    if(paramObj.dataSrc.tradeForm.buyer == "00-管理中心") {
			unitPrice = dataObj[productId][F_PRODUCT_COST_CENTER];
		    } else {
			unitPrice = dataObj[productId][F_PRODUCT_COST_STORE];
		    }
		    paramObj.dataSrc.unitPrice = unitPrice;
		    paramObj.dataSrc.setRealPrice(unitPrice);
		}
	    }
	});
    }
    this.save = function(paramObj) {
	var obj = {};
	obj[F_ITEM_PRODUCT_NO] = this.productNo;
	obj[F_ITEM_NAME] = this.name;
	obj[F_ITEM_UNIT_PRICE] = this.unitPrice;
	obj[F_ITEM_REAL_PRICE] = this.realPrice;
	obj[F_ITEM_QTY] = this.qty;
	obj[F_ITEM_UNIT] = this.unit;
	obj[F_ITEM_SUBTOTAL] = this.subtotal;
	obj[F_TRADE_NO] = this.tradeForm.no;

	if(this.nodeId <= 0 && this.qty == 0) {
	    delete tradeForm.tradeItems[this.rowId];
	    return;
	}

	paramObj = paramObj || {};

	SendPost.send({
	    actionURL : this.sendURL,
	    dataObj : obj,
	    dataSrc : paramObj.dataSrc,
	    follow : paramObj.callback || function() {},
	    callback : function(respJson, paramObj) {
		//TODO 檢查是否成功
		var stat = respJson["status"];
		if(stat == "SUCCESS") {
		    paramObj.follow();
		} else {
		    alert("商品 " + paramObj.dataSrc.productNo + " 傳送失敗，請聯絡開發人員");
		}
	    }
	});
    }
}

function TradeForm() {
    this.nodeId = -1;

    this.no = "自動產生";
    this.buyer = "00-管理中心";
    this.seller = "00-管理中心";
    this.total = 0;
    this.totalNums = "";
    this.formStatus = V_TRADE_STATUS_NEW;

    this.taxRate = 1.05;
    this.name = V_TRADE_FORM_SALE;
    this.sign = 1;
    this.sendURL = URL_TRADE_FORM_SA;

    this.tradeItems = {};

    this.isNew = function() {
	return this.nodeId >= 0 ? false : true;
    }
    this.newEntry = function() {
    }
    this.resetSendURL = function() {
	switch(this.name) {
	    case V_TRADE_FORM_SALE :
		this.sendURL = URL_TRADE_FORM_SA;
		break;
	    case V_TRADE_FORM_IN :
		this.sendURL = URL_TRADE_FORM_IN;
		break;
	    case V_TRADE_FORM_SR :
		this.sendURL = URL_TRADE_FORM_SR;
		break;
	    case V_TRADE_FORM_IR :
		this.sendURL = URL_TRADE_FORM_IR;
		break;
	    default:
		this.sendURL = URL_TRADE_FORM_SA;
	}
	if(this.nodeId >= 0) this.sendURL += "/" + this.nodeId;
	return this.sendURL;
    }
    this.resetSign = function() {
	switch(this.name) {
	    case V_TRADE_FORM_SALE :
	    case V_TRADE_FORM_IN :
		this.sign = 1;
		break;
	    case V_TRADE_FORM_SR :
	    case V_TRADE_FORM_IR :
		this.sign = -1;
		break;
	    default:
	}
	return this.sign;
    }
    this.setName = function(name) {
	this.name = name;
	this.setCompFromScreen();
	this.onScreen();
	this.resetSign();
	this.resetSendURL();
    }
    this.setNodeId = function(nodeId) {
	nodeId = parseInt(nodeId);
	this.nodeId = nodeId >= 0 ? nodeId : -1;
	this.resetSendURL();
	return this.nodeId;
    }
    this.setRootValue = function(no) {
	this.no = no;
    }
    this.setTaxRate = function(taxRate) {
	taxRate = parseFloat(taxRate);
	if(isNaN(taxRate)) {
	    alert("稅率不為數字");
	} else {
	    this.taxRate = taxRate;
	}
    }
    this.setCompFromScreen = function() {
	switch(this.name) {
	    case V_TRADE_FORM_SALE :
	    case V_TRADE_FORM_SR :
		this.seller = $('creatorSelector')[$('creatorSelector').selectedIndex].text;
		this.buyer = $('targetSelector')[$('targetSelector').selectedIndex].text;
		break;
	    case V_TRADE_FORM_IN :
	    case V_TRADE_FORM_IR :
		this.buyer = $('creatorSelector')[$('creatorSelector').selectedIndex].text;
		this.seller = $('targetSelector')[$('targetSelector').selectedIndex].text;
		break;
	}
    }
    this.onScreen = function() {
	function setCreator(comp) {
	    setOption($('creatorSelector'), comp);
	}
	function setTarget(comp) {
	    setOption($('targetSelector'), comp);
	}
	function setFormNameOption(formName) {
	    setOption($('formNameOption'), formName);
	}

	setFormNameOption(this.name);
	$('tradeFormNo').innerHTML = this.no;
	setNumOption($('taxRate'), this.taxRate);

	switch(this.name) {
	    case V_TRADE_FORM_SALE :
		$('creator').innerHTML = "銷貨單位: ";
		setCreator(this.seller);
		$('target').innerHTML = "收貨單位: ";
		setTarget(this.buyer);
		break;
	    case V_TRADE_FORM_SR :
		$('creator').innerHTML = "銷貨單位: ";
		setCreator(this.seller);
		$('target').innerHTML = "退貨單位: ";
		setTarget(this.buyer);
		break;
	    case V_TRADE_FORM_IN :
		$('creator').innerHTML = "進貨單位: ";
		setCreator(this.buyer);
		$('target').innerHTML = "供貨單位: ";
		setTarget(this.seller);
		break;
	    case V_TRADE_FORM_IR :
		$('creator').innerHTML = "退貨單位: ";
		setCreator(this.buyer);
		$('target').innerHTML = "供貨單位: ";
		setTarget(this.seller);
		break;
	}

	$('total').value = this.total;
	$('totalNums').value = this.totalNums;

	for(var key in this.tradeItems)
	    this.tradeItems[key].onScreen();
    }
    this.addProduct = function(rowId, qty) {
	qty = parseInt(qty);
	if(isNaN(qty)) qty = 1;

	if(this.tradeItems[rowId]) {
	    this.tradeItems[rowId].addQty(qty);
	    recordAction(
		"加入: " + this.tradeItems[rowId].productNo +
		" " + this.tradeItems[rowId].name +
		" " + qty + " " + this.tradeItems[rowId].unit + 
		" 共 " + this.tradeItems[rowId].qty + " " + this.tradeItems[rowId].unit);
	}
    }
    this.addProductData = function(p) {
	var item = new TradeItem(this, p.no, p.name, p.unitPrice, p.unit);
	var rowId = item.getRowId();
	item.rowId = rowId;
	if(!this.tradeItems[rowId]) {
	    this.tradeItems[rowId] = item;
	}
    }
    this.renewItemPrice = function() {
	for(var key in this.tradeItems) {
	    var productNo = this.tradeItems[key].renewPrice();
	}
    }
    this.calcTotal = function() {
	this.total = 0;
	for(var key in this.tradeItems)
	    this.total += this.tradeItems[key].subtotal;
	this.calcTotalNums();
	this.onScreen();
    }
    this.calcTotalNums = function() {
	var itemNums = new Object(); //以單位統計商品數，幾支、幾合
	for(var key in this.tradeItems) {
	    var qty = this.tradeItems[key].qty;
	    var unit = this.tradeItems[key].unit;

	    if(qty == 0) continue;

	    if(unit) {
		if(isNaN(itemNums[unit])) itemNums[unit] = 0;
		itemNums[unit] += qty;
	    } else {
		if(isNaN(itemNums["個"])) itemNums["個"] = 0;
		itemNums["個"] += qty;
	    }
	}

	var itemNumbsInfo = "共: ";
	for(var u in itemNums) {
	    itemNumbsInfo += itemNums[u] + " " + u + " ";
	}
	this.totalNums = itemNumbsInfo;
    }
    this.createForm = function() {
	var obj = {};
	obj[F_TRADE_FORM_NAME] = this.name;
	obj[F_TRADE_BUYER] = this.buyer;
	obj[F_TRADE_SELLER] = this.seller;
	obj[F_TRADE_STATUS] = this.formStatus;
	obj[F_TRADE_TAX_RATE] = this.taxRate;
	//obj[F_TRADE_CREATE] = constUserName;

	SendPost.send({
	    actionURL : this.sendURL,
	    dataObj : obj,
	    dataSrc : this,
	    showIframeFlag : true,
	    callback : function(respJson, paramObj) {
		var stat = respJson["status"];
		if(stat == "SUCCESS") {
		    var ragicId = respJson["ragicId"];
		    var form = paramObj.dataSrc;
		    form.setNodeId(parseInt(ragicId, 10));
		    form.setRootValue(respJson["rv"]); //root value
		    //alert("表頭傳送完成");
		    tradeForm.onScreen();
		    saveFormFunc();
		    //responseIframe = this.iframe;
		} else {
		    alert("表頭傳送失敗，請聯絡開發人員");
		}
	    }
	});
    }
    this.save = function() {
	var obj = {};
	obj[F_TRADE_NO] = this.no;
	obj[F_TRADE_TAX_RATE] = this.taxRate;

	SendPost.send({
	    actionURL : this.sendURL,
	    dataObj : obj,
	    dataSrc : this,
	    callback : function(respJson, paramObj) {
		var stat = respJson["status"];
		if(stat == "SUCCESS") {
		    loadFormData();
		    alert("傳送完畢: " + paramObj.dataSrc.no);
		    //window.close();
		} else {
		    alert("表頭傳送失敗，請聯絡開發人員");
		}
	    }
	});
    }
    this.copyFromForm = function(srcForm) {
	this.setName(srcForm.name);
	this.seller = srcForm.seller;
	this.buyer = srcForm.buyer;
	for(var key in srcForm.tradeItems) {
	    this.tradeItems[key] = srcForm.tradeItems[key];
	    this.tradeItems[key].setNodeId(-1);
	    this.tradeItems[key].tradeForm = this;
	}
    }
    this.delItems = function() {
	for(var key in this.tradeItems) {
	    this.tradeItems[key].setQty(0);
	}
    }
    this.getData = function(paramObj) {
	if(this.nodeId < 0 || !this.nodeId) {
	    alert("交易單無合法 NodeId");
	    return;
	}

	paramObj = paramObj || {};

	JSONP.request({
	    url: tradeForm.sendURL,
	    params: "naming=EID",
	    follow: paramObj.callback || function() {},
	    callback: function(jsonObj, paramObj) {
		tradeForm.delItems();

		var nodeId = tradeForm.nodeId;
		tradeForm.no = jsonObj[nodeId][F_TRADE_NO];
		tradeForm.setName(jsonObj[nodeId][F_TRADE_FORM_NAME]);
		tradeForm.formStatus = jsonObj[nodeId][F_TRADE_STATUS];
		tradeForm.buyer = jsonObj[nodeId][F_TRADE_BUYER];
		tradeForm.seller = jsonObj[nodeId][F_TRADE_SELLER];
		tradeForm.total = jsonObj[nodeId][F_TRADE_ITEM_SUM];
		tradeForm.totalNums = jsonObj[nodeId][F_TRADE_NUMS];
		tradeForm.taxRate = jsonObj[nodeId][F_TRADE_TAX_RATE];

		var tradeItems = jsonObj[nodeId]["_subtable_"+F_ITEM_NO];
		for(var id in tradeItems) {
		    var productNo = tradeItems[id][F_ITEM_PRODUCT_NO];
		    var name = tradeItems[id][F_ITEM_NAME];
		    var unitPrice = tradeItems[id][F_ITEM_UNIT_PRICE];
		    var realPrice = tradeItems[id][F_ITEM_REAL_PRICE];
		    var qty = tradeItems[id][F_ITEM_QTY];
		    var unit = tradeItems[id][F_ITEM_UNIT];
		    var subtotal = tradeItems[id][F_ITEM_SUBTOTAL];
		    var item = new TradeItem(tradeForm, productNo, name, unitPrice, unit, realPrice, qty, subtotal);
		    item.setNodeId(id);
		    var rowId = item.getRowId();
		    item.rowId = rowId;
		    tradeForm.tradeItems[rowId] = item;
		}
		paramObj.follow();
	    }
	});
    }
    this.print = function() {
	switch(this.name) {
	    case V_TRADE_FORM_SALE :
		window.open(URL_PRINT + "Sale.jsp?no=" + tradeForm.nodeId);
		break;
	    case V_TRADE_FORM_IN :
		window.open(URL_PRINT + "Purchase.jsp?no=" + tradeForm.nodeId);
		break;
	    case V_TRADE_FORM_SR :
		window.open(URL_PRINT + "SaleReturn.jsp?no=" + tradeForm.nodeId);
		break;
	    case V_TRADE_FORM_IR :
		window.open(URL_PRINT + "PurchaseReturn.jsp?no=" + tradeForm.nodeId);
		break;
	}
    }
}

function recordAction(action) {
    var board = $('actionRecord');
    board.innerHTML = action + String.fromCharCode(10) + board.innerHTML;
}

function lockAllState() {
    $("formNameOption").disabled = true;
    $("taxRate").disabled = true;
    $("creatorSelector").disabled = true;
    $("targetSelector").disabled = true;
    $("saveForm").disabled = true;
    $("copyForm").disabled = true;
    $("newForm").disabled = true;
    $("serialInput").disabled = true;
    $("itemNum").disabled = true;
    $("print").disabled = true;
}
function lockTradeFormState() {
    $("formNameOption").disabled = true;
    $("taxRate").disabled = false;
    $("creatorSelector").disabled = true;
    $("targetSelector").disabled = true;
    $("saveForm").disabled = false;
    $("copyForm").disabled = false;
    $("newForm").disabled = false;
    $("serialInput").disabled = false;
    $("itemNum").disabled = false;
    $("print").disabled = false;
}
function lockNoneState() {
    $("formNameOption").disabled = false;
    $("taxRate").disabled = false;
    $("creatorSelector").disabled = false;
    $("targetSelector").disabled = false;
    $("saveForm").disabled = false;
    $("copyForm").disabled = false;
    $("newForm").disabled = false;
    $("serialInput").disabled = false;
    $("itemNum").disabled = false;
    $("print").disabled = false;
}
function inputProductNoState() {
    $("serialInput").value = currentProduct.no;
    currentNum = 1;
    $("itemNum").value = currentNum;
    $("serialInput").select();
}
function inputItemNumState() {
    $("serialInput").value = currentProduct.no;
    $("itemNum").value = currentNum;
    $("itemNum").select();
}

function getCompOptions() {
    JSONP.request({
	url: URL_STORE_OPTION,
	params: "naming=EID",
	callback: function(jsonObj) {
	    var options = {};
	    var creator = $('creatorSelector');
	    var target = $('targetSelector');
	    for(var id in jsonObj) {
		options[id] = jsonObj[id][F_COMP_NO];
		var option = document.createElement('option');
		option.id = F_TRADE_SELLER + "_" + id;
		option.value = jsonObj[id][F_COMP_NO];
		option.text = jsonObj[id][F_COMP_NO];
		creator.add(option);
		option = document.createElement('option');
		option.id = F_TRADE_BUYER + "_" + id;
		option.value = jsonObj[id][F_COMP_NO];
		option.text = jsonObj[id][F_COMP_NO];
		target.add(option);
	    }
	}
    });
}

var currentProduct = new Product("");
var currentNum = 1;
var tradeForm = new TradeForm();
var responseIframe = null;
var respItemNums = 0;

var appendGetProductData = "";
var appendGetProductDataError = "";
var tradeItemDecreaseButtonCode = 
    "<td class=delete>" + 
    "<input class=delete type=button value=-1 onclick=decreaseOne(this)>" + 
    "</td>";
var tradeItemIncreaseButtonCode = 
    "<td class=delete>" + 
    "<input class=delete type=button value=+1 onclick=increaseOne(this)>" + 
    "</td>";
var tradeItemRealPriceInputCode = 
    "<td class=price>" + 
    "<input class=price type=text size=3 onchange=itemRealPriceInputFunc(this)>" + 
    "</td>";
var tradeItemQtyInputCode = 
    "<td class=amount>" + 
    "<input class=price type=text size=3" + 
    "</td>";
    //"<input class=price type=text size=3 onchange=itemQtyInputFunc(this)>" + 

var emptyTable =
    "<tr id=\"itemTableTitle\" class=myTable>" +
	"<td class=serial>條碼</td>" +
	"<td class=productName>商品名稱</td>" +
	"<td class=unitPrice>單價</td>" +
	"<td class=price>計價</td>" +
	"<td class=amount>數量</td>" +
	"<td class=unit>單位</td>" +
	"<td class=subtotal>小計</td>" +
	"<td class=delete></td>" +
	"<td class=delete></td>" +
    "</tr>";
function getProductDataByNo(productNo) {
    if(!productNo) {
	eval(appendGetProductDataError);
	appendGetProductDataError = "";
	return;
    }

    JSONP.request({
	url: URL_PRODUCT_DATA,
	params: 'where=' + F_PRODUCT_NO + ',eq,' + productNo + '&naming=EID',
	callback: function(jsonObj) {
	    var dataObj = jsonObj;
	    var idArray = new Array();
	    for(var id in dataObj) {
		idArray.push(id);
	    }
	    if (idArray.length == 0) {
		alert("查無商品資料");
		eval(appendGetProductDataError);
		appendGetProductDataError = "";
	    } else {
		var productId = idArray.pop();
		var productNo = dataObj[productId][F_PRODUCT_NO];
		var productName = dataObj[productId][F_PRODUCT_NAME];
		var productUnit = dataObj[productId][F_PRODUCT_UNIT];
		var unitPrice = 0;
		if(tradeForm.buyer == "00-管理中心") {
		    unitPrice = dataObj[productId][F_PRODUCT_COST_CENTER];
		} else {
		    unitPrice = dataObj[productId][F_PRODUCT_COST_STORE];
		}
		currentProduct = new Product(productNo, productName, unitPrice, productUnit);

		eval(appendGetProductData);
		appendGetProductData = "";
	    }
	}
    });
}

function onload() {
    currentProduct = new Product("");
    currentNum = 1;
    tradeForm = new TradeForm();
    responseIframe = null;
    getCompOptions();
    tradeForm.setNodeId(rootNodeId);
    loadFormData();
}
function loadFormData() {
    lockAllState();
    if(tradeForm.isNew()) {
	tradeForm = new TradeForm();
	tradeForm.onScreen();
	lockNoneState();
	inputProductNoState();
    } else {
	tradeForm.getData({
	    callback : function() {
		tradeForm.onScreen();
		if(tradeForm.formStatus == V_TRADE_STATUS_NEW) {
		    lockTradeFormState();
		    inputProductNoState();
		} else {
		    alert("交易單狀態不為 新增 無法修改，可複製產生新單");
		    $("copyForm").disabled = false;
		    $("print").disabled = false;
		    $("newForm").disabled = false;
		}
	    }
	});
    }
}

function productNoInputFunc(){
    currentProduct.no = $("serialInput").value;
    currentNum = $("itemNum").value;
    addProductToTradeForm();
}
function itemNumFunc() {
    var value = $("itemNum").value;
    if(isCodeReader(value)) {
	currentProduct.no = value;
	currentNum = 1;
    } else {
	currentNum = parseInt(value) - 1;
    }
    if(currentNum != 0) { //避免重複按 Enter 的問題
	addProductToTradeForm();
    }
}

function addProductToTradeForm() {
    if(tradeForm.tradeItems[currentProduct.no]) {
	tradeForm.addProduct(currentProduct.no, currentNum);
	moveToTop(currentProduct.no);
	if(currentNum == 1) {
	    inputItemNumState();
	} else {
	    inputProductNoState();
	}
    } else {
	appendGetProductData =
	    "tradeForm.addProductData(currentProduct);" +
	    "addProductToTradeForm();";
	appendGetProductDataError =
	    "inputProductNoState();";
	getProductDataByNo(currentProduct.no);
    }
}
function moveToTop(rowId) {
    var row = $(rowId);
    if(row) {
	var topRow = $("myTable").insertRow(1);
	var parentNode = row.parentNode;
	parentNode.removeChild(row);
	parentNode.replaceChild(row, topRow);
    }
}
function isCodeReader(str) {
    var numPatt = /^\d{1,4}$/;
    if(numPatt.test(str)) {
	return false;
    }
    return true;
}

function copyFormFunc() {
    var newForm = new TradeForm();
    newForm.copyFromForm(tradeForm);
    tradeForm = newForm;
    tradeForm.renewItemPrice();
    tradeForm.onScreen();
    lockNoneState();
    inputProductNoState();
}
function saveFormFunc(){
    if(tradeForm.isNew()) {
	tradeForm.createForm();
    } else {
	respItemNums = 0;
	for(var key in tradeForm.tradeItems) {
	    tradeForm.tradeItems[key].save({
		dataSrc : tradeForm.tradeItems[key],
		callback : function() {
		    respItemNums++;
		    if(respItemNums == Object.keys(tradeForm.tradeItems).length) {
			this.dataSrc.tradeForm.save();
		    }
	       }
	    });
	}
    }
}
function delItemsFunc(){
    tradeForm.delItems();
    tradeForm.onScreen();
}
function newFormFunc(){
    currentProduct = new Product("");
    currentNum = 1;
    tradeForm = new TradeForm();
    responseIframe = null;
    $("myTable").innerHTML = emptyTable;
    tradeForm.onScreen();
    lockNoneState();
    inputProductNoState();
}
function decreaseOne(button) {
    var rowId = button.parentNode.parentNode.id;
    tradeForm.addProduct(rowId, -1);
    inputProductNoState();
}
function increaseOne(button) {
    var rowId = button.parentNode.parentNode.id;
    tradeForm.addProduct(rowId, 1);
    inputProductNoState();
}
function itemRealPriceInputFunc(input) {
    var rowId = input.parentNode.parentNode.id;
    tradeForm.tradeItems[rowId].setRealPrice(input.value);
    inputProductNoState();
}
function itemQtyInputFunc(input) {
    var rowId = input.parentNode.parentNode.id;
    tradeForm.tradeItems[rowId].setQty(input.value);
    recordAction(
	"更改: " + tradeForm.tradeItems[rowId].productNo +
	" " + tradeForm.tradeItems[rowId].name +
	" " + input.value + " " + tradeForm.tradeItems[rowId].unit + 
	" 共 " + tradeForm.tradeItems[rowId].qty + " " + tradeForm.tradeItems[rowId].unit);
    inputProductNoState();
}
function setFormNameFunc() {
    tradeForm.setName($('formNameOption')[$('formNameOption').selectedIndex].text);
    tradeForm.renewItemPrice();
}
function setTaxRageFunc() {
    tradeForm.setTaxRate($('taxRate')[$('taxRate').selectedIndex].text);
}
function setCreatorFunc() {
    tradeForm.setCompFromScreen();
}
function setTargetFunc() {
    tradeForm.setCompFromScreen();
}
function printFunc() {
    tradeForm.print();
}
function renewPriceFunc() {
    tradeForm.renewItemPrice();
}

document.onkeydown = function (evt){
    var key = evt?evt.which:event.keyCode;
    
    if(key == 13) {
	var nowFocusId = document.activeElement.id;
	if(nowFocusId == "serialInput") {
	    productNoInputFunc();
	} else if(nowFocusId == "itemNum") {
	    itemNumFunc();
	} else if(nowFocusId.match(/_q$/i)) {
	    itemQtyInputFunc($(nowFocusId));
	}
    }
}

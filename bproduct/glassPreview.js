var selectionBlock;
var colorIndex = 0;
var columnListingDiv = 25;
var columnListingMax = 600; // 600
var rowListingDiv = 25;
var rowListingMax = 1000; // 1000
var columnListingNum = columnListingMax / columnListingDiv;
var rowListingNum = rowListingMax / rowListingDiv;
var liNum = (1 + rowListingNum) * (1 + columnListingNum);
var buttonStatus = "radio1";
var priceobject = {};
var colorCSSMap = {};
colorCSSMap["X"] = 9; //background CSS
var radiocheck2 = [ "radio4", "radio5", "radio6", "radio7", "radio8", "radio9" ];

// Function Testing
function PriceObject() {
	this.priceMap = [];
	this.cssMap = [];
	this.init = function() {

		for (i = 0; i < liNum; i++) {
			this.priceMap[i] = "X";
			this.cssMap[i] = 9;			
		}
		return 0;
	}
}

priceobject["radio1"] = new PriceObject;
priceobject["radio2"] = new PriceObject;
priceobject["radio3"] = new PriceObject;
priceobject["radio1"].init();
priceobject["radio2"].init();
priceobject["radio3"].init();


function checkNumAndX(price) { 
		   if (isNaN(price) && (price != "X")) {  
		      alert("請輸入數字或X");  
		      return false;  
		   }  
		   return true;  
		}  

function enterPrice() {
	price = document.getElementById("price").value;
	if (checkNumAndX(price)==true){
	colorIndex = colorIndex + 1;
	$(document).ready(function() {
		$("#dialog").dialog("close");
	});
	selectionBlock
			.each(function() {
				
				var index = $("#selectable li").index(this);
				if (index != -1) {
					document.getElementById("selection" + (index + 1)).innerHTML = price;
					priceobject[buttonStatus].priceMap[index] = price;

					var colorNum = 8;
					
					if (colorCSSMap[price] == undefined)
						colorCSSMap[price] = (colorIndex % colorNum) + 1;
					
					priceobject[buttonStatus].cssMap[index] = colorCSSMap[price];

					$("#selection" + (index + 1)).removeClass();

					$("#selection" + (index + 1)).addClass(
							"price" + colorCSSMap[price]);
					$("#selection" + (index + 1)).removeClass("ui-selected");

				}
			});

	document.getElementById("price").value = null;
	}
}

function refreshSelectable() {
	for (i = 1; i <= liNum; i++) {
		$("#selection" + i).removeClass();
		document.getElementById("selection" + i).innerHTML = priceobject[buttonStatus].priceMap[i - (1)];
		$("#selection" + i).addClass("price"+priceobject[buttonStatus].cssMap[i - (1)]);
		$("#testing" + i).removeClass("ui-selected");
		
	}
}

function myopiaFunc() {
	buttonStatus = "radio1";
	document.getElementById("sideCellRow0").value = 0;

	for (i = 1; i <= rowListingNum; i++) {
		document.getElementById("sideCellRow" + i).value = -1
				* (i * rowListingDiv);
	}

	refreshSelectable();
}

function highMyopiaFunc() {
	buttonStatus = "radio2";
	document.getElementById("sideCellRow0").value = -1000;

	for (i = 1; i <= rowListingNum; i++) {
		document.getElementById("sideCellRow" + i).value = -1
				* (1000 + i * rowListingDiv);
	}
	refreshSelectable();
}

function hyperopiaFunc() {
	buttonStatus = "radio3";
	document.getElementById("sideCellRow0").value = 0;
	for (i = 1; i <= rowListingNum; i++) {
		document.getElementById("sideCellRow" + i).value = (i * rowListingDiv);
	}
	refreshSelectable();
}
function SWSelection(index) {
	if (index != -1) {
		var remainder = ((index + 1) % (columnListingNum + 1));
		if (remainder == 0) {
			var quotientComplementary = (rowListingNum + 1)
					- ((index + 1) / (columnListingNum + 1))
			for (i = 1; i <= quotientComplementary; i++) {
				if (i <= (columnListingNum)) {
					$("#selection" + (index + 1 + columnListingNum * i))
							.addClass("ui-selected");

					$("#testing" + (index + 1 + columnListingNum * i))
							.addClass("ui-selected");
				}
			}
		} else {
			for (i = 1; i < remainder; i++) {
				if ((index + 1 + columnListingNum * i) <= liNum) {
					$("#selection" + (index + 1 + columnListingNum * i))
							.addClass("ui-selected");

					$(

					"#testing" + (index + 1 + columnListingNum * i)).addClass(
							"ui-selected");
				}
			}
		}
	}
}


function NESelection(index) {
	if (index != -1) {
		var remainder = ((index + 1) % (columnListingNum + 1));
		if (remainder == 0) {
			var quotientComplementary = (rowListingNum + 1)
					- ((index + 1) / (columnListingNum + 1));
					$("#selection" + (index + 1 ))
							.addClass("ui-selected");

					$("#testing" + (index + 1 ))
							.addClass("ui-selected");
			
		} else {
			var quotientComplementary = (columnListingNum + 1)
			- remainder;
			for (i = 1; i <= quotientComplementary; i++) {
				if ((index + 1 - columnListingNum * i) > 0) {
					$("#selection" + (index + 1 - columnListingNum * i))
							.addClass("ui-selected");

					$(

					"#testing" + (index + 1 - columnListingNum * i)).addClass(
							"ui-selected");
				}
			}
		}
	}
}

function SSelection(index) {
	if (index != -1) {

		var remainder = ((index + 1) % (columnListingNum + 1));
		var quotientComplementary = (rowListingNum + 1)
				- ((index + 1) / (columnListingNum + 1));

		for (i = 1; i <= quotientComplementary; i++) {
			if ((index + 1 + columnListingNum * i) <= liNum) {

				$("#selection" + (index + 1 + (columnListingNum + 1) * i))
						.addClass("ui-selected");

				$("#testing" + (index + 1 + (columnListingNum + 1) * i))
						.addClass("ui-selected");
			}
		}
	}
}
function ESelection(index) {
	if (index != -1) {
		var remainder = ((index + 1) % (columnListingNum + 1));
		var quotientComplementary = (columnListingNum+1)  - remainder;

		if (remainder == 0) {

		} else {
			for (i = 1; i <= quotientComplementary; i++) {
				if ((index + 1 + columnListingNum * i) <= liNum) {
					$("#selection" + (index + 1 +  i))
							.addClass("ui-selected");

					$(

					"#testing" + (index + 1 +  i)).addClass(
							"ui-selected");
				}
			}
		}

	}
}

function NWSquareSelection(index) {
	if (index != -1) {
		var remainder = ((index + 1) % (columnListingNum + 1));
		var quotient = ((index + 1) / (columnListingNum + 1));
		//alert("remainder = " + remainder + ";quotient = " + quotient)
		if (remainder == 0) {
			remainder = (columnListingNum + 1);
			quotient = quotient - 1;
		}


		for (i = 0; i <= quotient; i++) {
			for (j = 1; j <= remainder; j++)
				if (true) {//(index + 1 + columnListingNum * i) <= liNum
	
					$("#selection" + ((columnListingNum + 1) * i + j) )
							.addClass("ui-selected");
	
					$("#testing" + ((columnListingNum + 1) * i + j) )
							.addClass("ui-selected");
				}
			}
		}
}
$(function() {
	// button
	$("#radioset").buttonset();

	$("#radioset2").buttonset();

	// select
	$("#selectable").selectable("option", "cancel", ":input,option");

	// dialog
	$("#dialog").dialog({
		autoOpen : false
	});
	
	$("#selectable").selectable({
		stop : function() {
			
			
			radioset2Value = $("#radioset2 :radio:checked").attr('id');

			selectionBlock = $(".ui-selected", this);
			selectionBlock.each(function() {
				var index = $("#selectable li").index(this);
				if (radioset2Value == radiocheck2[1]) {
					SWSelection(index);
				}
				if (radioset2Value == radiocheck2[2]) {
					NESelection(index);
				}
				if (radioset2Value == radiocheck2[3]) {
					SSelection(index);
				}
				if (radioset2Value == radiocheck2[4]) {
					ESelection(index);
				}
				if (radioset2Value == radiocheck2[5]) {
					NWSquareSelection(index);
				}
			})
			
			selectionBlock = $(".ui-selected", this);
			
			$(document).ready(function() {
				$("#dialog").dialog("open");
			});
		}
	});
})

function stringGenerator() {
	var info = "";
	for (status=1; status <=3; status++){
	for (i = 1; i <= liNum; i++) {
		info = info + priceobject["radio" + status].priceMap[i - (1)] + ",";
	}
	for (var i in colorCSSMap) {
		info = info + i + "$" + colorCSSMap[i] + "|";
		}
	info = info + ";" ;
	}
	document.getElementById("debugBox").value = info;
	document.getElementById("paramFlashVars").value = "txtToCopy=" + document.getElementById("debugBox").value + "&js=alertUser();";
}

function stringImporter() {
	generatedString = document.getElementById("importBox").value;
	if (checkString(generatedString)==true){
		var statusStr;
		statusStr = generatedString.split(";");
		for (status=1; status <=3; status++){
			var str;
			str = statusStr[status-1].split(",");
			for (i = 1; i <=str.length; i++) {
				priceobject["radio" + status].priceMap[i-1] = str[i-1];
			}
			var cssStr;
			cssStr = str[str.length-1].split("|");
			for (i = 0; i <cssStr.length; i++) {
				var cssStrSplit;
				cssStrSplit = cssStr[i].split("$");
				colorCSSMap[cssStrSplit[0]] = cssStrSplit[1];
			}
		
			for (i = 0; i < liNum; i++) {
				priceobject["radio" + status].cssMap[i] = colorCSSMap[priceobject["radio" + status].priceMap[i]];			
			}
		}
		alert("字串已匯入");
		refreshSelectable();
	}
}

function alertUser(){
	alert('copied');
}

function checkString(text) {
	statusStr = generatedString.split(";");
	if (text == "1") {
		alert("字串輸入錯誤");
		return false;
	}
	else return true;
}

function queryPrice(){
	var degree = document.getElementById("degreeBox").value;
	var spread = document.getElementById("spreadBox").value;
	var status;
	var degreeSign = -1;
	var degreeStart = 0;
	if (degree < -1000) {status = 2; degreeStart = -1000;}
	else if (degree > 0) {status = 3; degreeSign = 1;}
	else status = 1; 
	
	var columnListing = {};
	for (i = 0; i <= columnListingNum; i++) {
		columnListing[(columnListingDiv * i)] = i;
	}
	var rowListing = {};
	for (i = 0; i <= rowListingNum; i++) {
		rowListing[degreeStart + degreeSign* (rowListingDiv * i)] = i;
	}
	var degreeIndex = rowListing[degree]; 
	var spreadIndex = columnListing[spread];//alert("deg:"+degreeIndex+",spr:"+spreadIndex+",格位:"+(degreeIndex*(columnListingNum+1) + spreadIndex));
	//從格子查詢
	/*
	if (degreeIndex==undefined  | spreadIndex==undefined) alert("查無度數, 請輸入正確查詢數字!");
	else alert("所查得價格為: " + priceobject["radio" + status].priceMap[(degreeIndex*(columnListingNum+1) + spreadIndex)])
	*/	
	
	//從字串查詢
	if (degreeIndex==undefined  | spreadIndex==undefined) alert("查無度數, 請輸入正確查詢數字!");
	else {
		generatedString = document.getElementById("importBox").value;
		if(checkString(generatedString)==true){
			var statusStr;
			statusStr = generatedString.split(";");
			var str;
			str = statusStr[status-1].split(",");
			alert("所查得價格為: " + str[(degreeIndex*(columnListingNum+1) + spreadIndex)]);
		}
	}

}

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
var radiocheck2 = [ "radio4", "radio5", "radio6", "radio7", "radio8" ];

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

/*
 * Object Testing: failure(using the same map) var priceObject = { priceMap: [],
 * //buttomStatus: "radio1", init: function() { for (i = 0; i < liNum; i++) {
 * this.priceMap[i]=null; } } } var priceobject = {}; priceobject["radio1"] =
 * priceObject; priceobject["radio2"] = priceObject; priceobject["radio3"] =
 * priceObject; priceobject["radio1"].init(); priceobject["radio2"].init();
 * priceobject["radio3"].init();
 */

function checkNumAndX(price) { 
	/*
	   if (document.forms[0].d1.value == '') {  
	      alert("請輸入數字或X");  
		      return false;         
		   }
		   */  
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
						colorCSSMap[price] = (colorIndex % colorNum);
					
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
							.addClass("ui-selecting");

					$("#testing" + (index + 1 + columnListingNum * i))
							.addClass("ui-selecting");
				}
			}
		} else {
			for (i = 1; i < remainder; i++) {
				if ((index + 1 + columnListingNum * i) <= liNum) {
					$("#selection" + (index + 1 + columnListingNum * i))
							.addClass("ui-selecting");

					$(

					"#testing" + (index + 1 + columnListingNum * i)).addClass(
							"ui-selecting");
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
							.addClass("ui-selecting");

					$("#testing" + (index + 1 ))
							.addClass("ui-selecting");
			
		} else {
			var quotientComplementary = (columnListingNum + 1)
			- remainder;
			for (i = 1; i <= quotientComplementary; i++) {
				if ((index + 1 - columnListingNum * i) > 0) {
					$("#selection" + (index + 1 - columnListingNum * i))
							.addClass("ui-selecting");

					$(

					"#testing" + (index + 1 - columnListingNum * i)).addClass(
							"ui-selecting");
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
						.addClass("ui-selecting");

				$("#testing" + (index + 1 + (columnListingNum + 1) * i))
						.addClass("ui-selecting");
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
							.addClass("ui-selecting");

					$(

					"#testing" + (index + 1 +  i)).addClass(
							"ui-selecting");
				}
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

			selectionBlock = $(".ui-selected", this);

			$(document).ready(function() {
				$("#dialog").dialog("open");
			});
		}

	});

	$("#selectable").selectable({
		selecting : function() {
			
			
			radioset2Value = $("#radioset2 :radio:checked").attr('id');

			selectionBlock = $(".ui-selecting", this);
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
			})
		}
	});
	
	/*
	$( "#selectable" ).bind( "selectableunselecting", function( event, ui) {
		
		
		//alert(index);
		//alert(event);
		//debug1 = event; 
		//debug2 = ui;
		
		document.getElementById("debugbox").value = ui.unselecting.id;
		
		});
	*/
	

	
	
})

function stringGenerator() {
	var info = "";
	for (status=1; status <=3; status++){
	for (i = 1; i <= liNum; i++) {
		info = info + priceobject["radio" + status].priceMap[i - (1)] + ",";
	}
	}
	document.getElementById("debugbox").value = info;
}
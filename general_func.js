//C&P from internet
function randomUUID() {
    var s = [], itoh = '0123456789ABCDEF';
 
    // Make array of random hex digits. The UUID only has 32 digits in it, but we
    // allocate an extra items to make room for the '-'s we'll be inserting.
    for (var i = 0; i <36; i++) s[i] = Math.floor(Math.random()*0x10);
 
    // Conform to RFC-4122, section 4.4
    s[14] = 4;  // Set 4 high bits of time_high field to version
    s[19] = (s[19] & 0x3) | 0x8;  // Specify 2 high bits of clock sequence
 
    // Convert to hex chars
    for (var i = 0; i <36; i++) s[i] = itoh[s[i]];
 
    // Insert '-'s
    s[8] = s[13] = s[18] = s[23] = '-';
 
    return s.join('');
}

var SendPost={
    queue: [],
    current: null,
    sended: {},
    finished: {},
    send : function(o) {
	o=o || {};
	if (!o.actionURL) {
	    return;
	}

	var iframe = document.createElement('iframe');
	iframe.name=randomUUID();
	iframe.style.display="none";
	
	iframe.onload = function() { //IE8 onload 不會執行 function
	    /*
	    if(SendPost.sended[this.name]) {
		SendPost.finished[this.name] = SendPost.sended[this.name];
		delete SendPost.sended[this.name];
		//document.getElementsByTagName('body')[0].removeChild(this);
		//var obj = SendPost.finished[this.name];
		//obj.callback.call(obj.scope);
		//if(obj.show) this.style.display = "inline";
		//obj.callback();
	    }
	    */
	};
	document.getElementsByTagName('body')[0].appendChild(iframe);

	var form=document.createElement('form');
	form.name=randomUUID();
	document.getElementsByTagName('body')[0].appendChild(form);

	//form.action = URL_PROXY + "?" + o.actionURL;
	form.action = URL_PROXY + "?callback=parent.SendPost.callback&scriptTag";
	//form.action = o.actionURL;
	form.method = "post"; 
	form.target = iframe.name;
	//form.target="null_iframe";
	//form.target = "_blank";
	form.style.display = "none";
	//form.enctype = "multipart/form-data";
	//form.encoding = "multipart/form-data";
	form.enctype = "text/html";
	form.encoding = "text/html";

	var urlElement = document.createElement('input');
	urlElement.type = "hidden";
	urlElement.name = "sendurl";
	urlElement.value = o.actionURL;
	form.appendChild(urlElement);

	for(var key in o.dataObj){
	    var inputHidden=document.createElement('input');
	    inputHidden.type="hidden";
	    inputHidden.name=key;
	    inputHidden.value=o.dataObj[key];
	    form.appendChild(inputHidden);
	}

	this.queue.push({
	    iframe: iframe,
	    form: form,
	    scope: o.scope || window,
	    dataObj: o.dataObj,
	    show: o.showIframeFlag,
	    dataSrc: o.dataSrc,
	    follow: o.follow || function() {},
	    callback: o.callback || function() {}
	});

	//execute if there's no current task
	//if there's a current task, this queued task will be auto executed when current task is finished
	if(!this.current) {
	    this.next();
	}
    },
    //shift to the next current task and execute next task in queue
    next : function() {
	this.current = null;
	if (this.queue.length) {
	   this.current = this.queue.shift();
	   this.current.form.submit();
	   this.sended[this.current.form.target] = this.current;
	   document.getElementsByTagName('body')[0].removeChild(this.current.form);
	}
    },
    callback : function(json) {
        this.current.callback.call(this.current.scope, json, this.current);
        //document.getElementsByTagName('head')[0].removeChild(this.current.script);
        this.next();
    },
    reset : function() {
	this.sended = {};
	this.finished = {};
    }
};

var JSONP={
    queue : [],
    current : null,
    request : function(o) {
        o=o || {};
        if (!o.url) {
            return;
        }

        var me=this;
        var params=(o.params ? o.params+'&' : '')+'callback=JSONP.callback&t='+new Date().getTime()+'&v='+API_VERSION;
        var script=document.createElement('script');
        script.type='text/javascript';

        this.queue.push({
            url: o.url,
            script: script,
            dataSrc: o.dataSrc,
	    follow: o.follow || function() {},
            callback: o.callback || function() {},
            scope: o.scope || window,
            params: params || null
        });

        //execute if there's no current task
        //if there's a current task, this queued task will be auto executed when current task is finished
        if (!this.current) {
            this.next();
        }
    },
    //shift to the next current task and execute next task in queue
    next : function() {
        this.current=null;
        if (this.queue.length) {
            this.current=this.queue.shift();
            this.current.script.src=this.current.url+(this.current.params ? ('?'+this.current.params) : '');
            document.getElementsByTagName('head')[0].appendChild(this.current.script);
        }
    },
    //the current task has returned and ready for execution
    callback : function(json) {
        this.current.callback.call(this.current.scope, json, this.current);
        document.getElementsByTagName('head')[0].removeChild(this.current.script);
        this.next();
    }
};

function $(id) { 
    return document.getElementById(id);
}

function setOption(element, value) {
    var options = element.options;
    for(var i = 0; i < options.length; i++) {
	if(options[i].text == value) options[i].selected = true;
    }
}
function setNumOption(element, num) {
    var options = element.options;
    for(var i = 0; i < options.length; i++) {
	if(parseFloat(options[i].text) == parseFloat(num)) options[i].selected = true;
    }
}
//Object.prototype.indexOf = indexOf;
function indexOf(value) {
    for(var i = 0; i < this.length; i++) {
	if(this[i] == value) return i;
    }
    return -1;
}

String.prototype.lTrim = function() { return this.replace(/(^\s*)/g, ""); }
String.prototype.rTrim = function() { return this.replace(/(\s*$)/g, ""); }
String.prototype.trim = function() { return this.lTrim().rTrim(); }

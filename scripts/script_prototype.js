function ScrollView (config) {
	this.viewCollection = config.viewCollection;
	this.linkCollection = config.linkCollection;
	// 用于事件委托
	this.linkBox = config.linkBox;
	this.init();

}

ScrollView.prototype.scrollToView = function(index){
	 if (index != null) {
	    	document.body.scrollTop = index * window.innerHeight;
	    }
};

ScrollView.prototype.getViewIndex = function(event) {
	if (event.target.nodeName.toLowerCase() == "a") {
	        var index = event.target.dataset.index;
	        return index;
	    } else {
	    	return null;
	    }
}

ScrollView.prototype.setDotClass = function(currEle) {
	if(currEle.nodeName.toLowerCase() == "a") {
	    	for (var i = 0, len = links.length; i < len; i++) {
	        links[i].className = links[i].className.replace("curr-dot", '');  // api还是不太熟悉
	    	}
	    	currEle.className += "curr-dot";
	    }
}

ScrollView.prototype.clickHandler = function(event) {
	var index = this.getViewIndex(event);
    var currEle = event.target;
    this.scrollToView(index);
    this.setDotClass(currEle);
}

ScrollView.prototype.wheelHandler = function(event) {
	  	var currDot = document.querySelector(".curr-dot");
	    var currIndex = parseInt(currDot.dataset.index);
	    var preIndex = currIndex - 1;
	    var nextIndex = currIndex + 1;
	    // 向上滚动
	    if(event.wheelDelta > 0 && currIndex > 0) {
	    	this.scrollToView(preIndex);
	    	this.setDotClass (linkCollection[preIndex]);
	    } else if(event.wheelDelta < 0 && currIndex < linkCollection.length-1) {
	    	console.log(this);
	    	console.log(typeof(scrollToView));
	    	// this.scrollToView(nextIndex);
	    	scrollToView.call(ScrollView, nextIndex);
	    	this.setDotClass(linkCollection[nextIndex]);
	    }
}

ScrollView.prototype.setFSHeight = function() {
	 	// viewport height
	    var FS = window.innerHeight;
	    // set height by loop
	    for (var i = 0, len = this.viewCollection.length; i < len; i++) {
	        this.viewCollection[i].style.height = FS + 'px';
	    }
}

ScrollView.prototype.init = function() {
	this.setFSHeight(this.viewCollection);
	// add Eventlistenr
	this.linkBox.addEventListener("click", this.clickHandler);
	document.addEventListener("mousewheel", this.wheelHandler);
	window.addEventListener("resize", function() {
	    // this.setFSHeight(this.viewCollection); // problem call apply bind?
	    setFSHeight.call(ScrollView, viewCollection);
	}, false);
}

var viewCollection = document.getElementsByClassName("box");
var linkCollection = document.querySelectorAll("[data-index]");
var linkBox = document.querySelector("#nav-list");
var configData = {viewCollection, linkCollection, linkBox};
var scrollveiw = new ScrollView(configData);
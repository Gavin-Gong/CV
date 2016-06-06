var viewCol = document.getElementsByClassName("box");
var linkCol = document.querySelectorAll("[data-index]");
var linkBox = document.querySelector("#nav-list");
var viewPort = document.querySelector(".content-wrapper");
var innerBox = document.querySelectorAll(".inner-box");
var config = {viewCol:viewCol, linkCol:linkCol, linkBox:linkBox, innerBox:innerBox};

(function(config) {
	// Position 
	function scrollToView(index) {
	    if (index != null) {
	    	viewPort.style.top = -(index * window.innerHeight) + "px";
	    	viewPortAniamte(index, config.innerBox);
	    }
	}
	//通过获取a标签的index, 获取要显示的部分
	function getViewIndex(event) {
	    if (event.target.nodeName.toLowerCase() == "a") {
	        // var index = event.target.dataset.index;
	        var index = parseInt(event.target.getAttribute('data-index'));
	        return index;
	    } else {
	    	return null;
	    }
	}
	// 不用event参数
	function setDotClass(currEle) {
	    // clear curr-dot class
	    // add target with class
	    if(currEle.nodeName.toLowerCase() == "a") {
	    	for (var i = 0, len = config.linkCol.length; i < len; i++) {
	        config.linkCol[i].className = config.linkCol[i].className.replace("curr-dot", '');  // api还是不太熟悉
	    	}
	    	currEle.className += "curr-dot";
	    }
	}

	function clickHandler(event) {
	    var index = getViewIndex(event);
	    var currEle = event.target;
	    scrollToView(index);
	    setDotClass(currEle);
	}
	var canScroll = true;
	function wheelHandler(event) {
	    var currDot = document.querySelector(".curr-dot");
	    var currIndex = parseInt(currDot.getAttribute('data-index'));
	    var preIndex = currIndex - 1;
	    var nextIndex = currIndex + 1;

	    if(event.deltaY < 0 && currIndex > 0 && canScroll) {
	    	scrollToView(preIndex);
	    	setDotClass(config.linkCol[preIndex]);
	    	canScroll = false
	    	// console.log()

	    } else if(canScroll && event.deltaY > 0 && currIndex < config.linkCol.length-1 ) {
	    	scrollToView(nextIndex);
	    	setDotClass(config.linkCol[nextIndex]);
	    	canScroll = false
	    } else {
	    	return;
	    }
	    if(!canScroll) {
	    	setTimeout(function() {
    		canScroll = true;		
	    	}, 1000);
	    }
    	
	} 

	// 设置定高函数 FSHeight == Full Screen Height
	function setFSHeight(Elements) {
	    // viewport height
	    var FS = window.innerHeight;
	    // set height by loop
	    for (var i = 0, len = Elements.length; i < len; i++) {
	        Elements[i].style.height = FS + 'px';
	    }
	}

	// Animate Function
	function addAniamate(Element, MotionName) {
		Element.className += " animated " + MotionName
	}
	function removeAnimate(Element, MotionName) {
		Element.className = Element.className.replace(' animated', "");
		Element.className = Element.className.replace(" " + MotionName, "");
		// console.log(Element.className);
	}

	// Animate Setting
	// 延时1000ms 删除， 因为动画时间长为1000ms
	function viewPortAniamte(index,innerBox) {
		switch (index) {
			case 0: 
				addAniamate(innerBox[index], "zoomInDown");
				setTimeout(function() {
					removeAnimate(innerBox[index], "zoomInDown")
				}, 1000);
				break;
			case 1:
				addAniamate(innerBox[index], "fadeInDown");
				setTimeout(function() {
					removeAnimate(innerBox[index], "fadeInDown")
				}, 1000);
				break;
			case 2:
				addAniamate(innerBox[index], "rollIn");
				setTimeout(function() {
					removeAnimate(innerBox[index], "rollIn")
				}, 1000);
				break;
			case 3:
				addAniamate(innerBox[index], "bounceInDown");
				setTimeout(function() {
					removeAnimate(innerBox[index], "bounceInDown")
				}, 1000);
				break;
			case 4:
				addAniamate(innerBox[index], "lightSpeedIn");
				setTimeout(function() {
					removeAnimate(innerBox[index], "lightSpeedIn")
				}, 1000);
				break;

			default:
				console.log("index overflow")
				break;
		}
	} 

	// 初始化全屏高度
	setFSHeight(config.viewCol);

	// add Eventlistenr
	linkBox.addEventListener("click", clickHandler);
	document.addEventListener("wheel", wheelHandler);
	// document.addEventListener("DOM")
	window.addEventListener("resize", function() {
	    setFSHeight(config.viewCol);
	}, false);

})(config)




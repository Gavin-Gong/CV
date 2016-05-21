
	var boxes = document.getElementsByClassName("box");
	var links = document.querySelectorAll("[data-index]");
	var linkBox = document.querySelector("#nav-list");
	// 传入要显示的元素
	function scrollToView(index) {
	    if (index != null) {
	    	document.body.scrollTop = index * window.innerHeight;
	    	// console.log(document.body.scrollTop);
	    }
	}
	//通过获取a标签的index, 获取要显示的部分
	function getViewIndex(event) {
	    // console.log(event.target.nodeName);
	    if (event.target.nodeName.toLowerCase() == "a") {
	        var index = event.target.dataset.index;
	        return index;
	    } else {
	    	return null;
	    }
	}
	// 不用event参数
	function setDotClass(currEle) {
	    // Links
	    var links = document.querySelectorAll('[data-index]');
	    // clear curr-dot class
	    
	    // add target with class
	    console.log(currEle);
	    if(currEle.nodeName.toLowerCase() == "a") {
	    	for (var i = 0, len = links.length; i < len; i++) {
	        links[i].className = links[i].className.replace("curr-dot", '');  // api还是不太熟悉
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

	function wheelHandler(event) {
	    var currDot = document.querySelector(".curr-dot");
	    var currIndex = parseInt(currDot.dataset.index);
	    var preIndex = currIndex - 1;
	    var nextIndex = currIndex + 1;

	    console.log(currIndex);
	    console.log(event.wheelDelta);
	    // 向上滚动
	    if(event.wheelDelta > 0 && currIndex > 0) {
	    	scrollToView(preIndex);
	    	setDotClass(links[preIndex]);
	    	console.log(boxes[preIndex]);

	    } else if(event.wheelDelta < 0 && currIndex < links.length-1) {
	    	scrollToView(nextIndex);
	    	setDotClass(links[nextIndex]);
	    	console.log(boxes[nextIndex]);
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

	// 初始化全屏高度
	setFSHeight(boxes);

	// add Eventlistenr
	linkBox.addEventListener("click", clickHandler);
	document.addEventListener("mousewheel", wheelHandler);
	window.addEventListener("resize", function() {
	    setFSHeight(boxes);
	}, false);
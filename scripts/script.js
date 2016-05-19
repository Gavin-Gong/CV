// 设置定高函数 FSHeight == Full Screen Height
	function setFSHeight(Elements) {
		// viewport height
		var FS = window.innerHeight;
		// set height by loop
		for (var i = 0, len = Elements.length; i < len; i++) {
			Elements[i].style.height = FS + 'px';
		}
	}

	var boxes = document.getElementsByClassName("box");
	// window.addEventListener("resize", setFSHeight(boxes, 60), false); 这样是不行的, 函参数只能只能
	setFSHeight(boxes);
	window.addEventListener("resize", function() {
		setFSHeight(boxes);
	}, false);


function swap() {
	//var swapped_ad = document.getElementById('ads.ozen.right');
	var swapped_ad = $('#ads.ozen.right');
    if (swapped_ad) {
		alert('good');
		//Creating Elements
		//document.getElementById('ads.ozen.right').innerHTML = "YOLO"
		//$("<p />", { text: "YOLO BLAT WE WIN" }).insertBefore('#ads.ozen.right');
		//$('<img src="http://i.telegraph.co.uk/multimedia/archive/03589/Wellcome_Image_Awa_3589699k.jpg"/>').insertAfter("div.block.B2b :first");
		$("#ads.ozen.right").hide();
		$('body').append('<img src="http://cdn.static-economist.com/sites/default/files/images/articles/migrated/20101211_tqp001_0.jpg" style="position:fixed;top:0;right:0;" />');
//		alert('added');
//		var btn = document.createElement("BUTTON");
//		var t = document.createTextNode("CLICK ME");
//		btn.appendChild(t);
		//Appending to DOM 
//		document.body.appendChild(btn);
	} else {
		alert('bad');
		setTimeout(swap, 1000);
	}
}

document.addEventListener("DOMContentLoaded", function(e) {
	//Somehow everything runs faster with it.
	//e.stopPropagation();
}, true);

setTimeout(swap, 1000);

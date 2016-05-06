function swap(new_ad_url) {
	//var swapped_ad = document.getElementById('ads.ozen.right');
	var swapped_ad = $('#ads.ozen.right');
    if (swapped_ad) {
//		alert('good');
		$("#ads.ozen.right").hide();
		$('body').append('<img src="' + new_ad_url + '" style="position:fixed;top:0;right:0;" />');
	} else {
//		alert('bad');
		setTimeout(function() {swap(new_ad_url)}, 500);
	}
}

$.ajax({
    type: 'GET',
    //url: 'http://localhost:8081/get_ad',
    url: 'http://localhost:8081/',
    //user_id : '123234',
    crossDomain: true,
    
    success: function (response) {
        alert('good');
        new_ad_url = 'http://cdn.static-economist.com/sites/default/files/images/articles/migrated/20101211_tqp001_0.jpg';
        swap(new_ad_url);
    },
    
    error: function (xhr,status,error) {
    	alert('bad');
    	console.log(xhr,status,error);
    }
});

function swap(new_ad_url) {
	//var swapped_ad = document.getElementById('ads.ozen.right');
	var swapped_ad = $('#ads.ozen.right');
    if (swapped_ad) {
		alert('good1');
		$("#ads.ozen.right").hide();
		$('body').append('<img src="' + new_ad_url + '" style="position:fixed;top:0;right:0;" />');
		//$('body').append('<img src="http://10.10.20.152:8081/ads/1347434767_1.jpeg" style="position:fixed;top:0;right:0;" />');
	} else {
		alert('bad1');
		setTimeout(function() {swap(new_ad_url)}, 500);
	}
}

$.ajax({
    type: 'GET',
    url: 'http://10.10.20.152:8081/',
    crossDomain: true,
    
    data: {user_id: 1347434767},
    
    success: function (response) {
        alert('good');
        console.log(response);
        new_ad_url = response;
        swap(new_ad_url);
    },
    
    error: function (xhr,status,error) {
    	alert('bad');
    	console.log(xhr,status,error);
    }
});

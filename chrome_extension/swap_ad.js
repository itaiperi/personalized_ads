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

console.log('getting user id');
$.ajax({
	type: 'GET',
	url: 'http://localhost:8081/get_user_id',
	crossDomain: true,
	
	success: function (response) {
		console.log('got user id = ' + response);
	    $.ajax({
			type: 'GET',
			url: 'http://10.10.20.212:8081/',
			crossDomain: true,
		
			data: {user_id: response},
		
			success: function (inner_response) {
				alert('good');
				console.log(inner_response);
				new_ad_url = inner_response;
				swap(new_ad_url);
			},
		
			error: function (xhr,status,error) {
				alert('bad');
				console.log(xhr,status,error);
			}
		});
	    
	},
	
  	error: function (xhr,status,error) {
  		console.log('user id get ERROR');
  		console.log(xhr,status,error);
	}
});

// console.log($('#ads.ozen.right'));
function swap(new_ad_url) {
	var swapped_ad = document.getElementById('ads.ozen.right');
    document.getElementById('ads.ozen.right').style.display = 'none';
    if (swapped_ad) {
        // alert('good1');
        document.getElementById('ads.ozen.right').style.display = 'none';
		$('body').append('<img src="' + new_ad_url + '" style="position:absolute;left:90px;top:100px;max-width:325px" />');
	} else {
		// alert('bad1');
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
			url: 'http://localhost:8081/get_ad',
			crossDomain: true,
		
			data: {user_id: response},
		
			success: function (inner_response) {
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
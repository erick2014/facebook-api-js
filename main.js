$(document).ready(function(){

	var permissions='email,user_friends,user_online_presence,public_profile,publish_actions';

	window.fbAsyncInit = function() {
		FB.init({
			appId      : '1557708047777672',
			status     : true,
			cookie     : true,  // enable cookies to allow the server to access 
			// the session
			xfbml      : true,  // parse social plugins on this page
			version    : 'v2.1' // use version 2.1
		});

		FB.getLoginStatus(function(response) {
			statusChangeCallback(response);
		});
	};

	// This is called with the results from from FB.getLoginStatus().
	var statusChangeCallback=function(response,doPost) {
		console.log(response);
		// The response object is returned with a status field that lets the
		// app know the current login status of the person.
		// Full docs on the response object can be found in the documentation
		// for FB.getLoginStatus().
		if (response.status === 'connected') {
			// Logged into your app and Facebook.
			getFacebookData();
			if(doPost){ postSomething(); }
		}
		else {
			//try to conect to facebook
			logIntoFacebook();
		}
	}

	var  getFacebookData=function() {
	
		FB.api('/me',function(response){
			$("#loginResults").html("Hello "+response.name);
		})
	}

	var postSomething=function(){
		console.log("posting something...");
		FB.api('/me/feed', 'post', {message: "Fuckyou+ erick"});
	}

	var logIntoFacebook=function(){
		FB.login(function(response){
			statusChangeCallback(response,true);
		},{scope:permissions});
	}


});
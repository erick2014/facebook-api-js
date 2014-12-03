$(document).ready(function(){

	var permissions='email,user_friends,user_online_presence,public_profile,publish_actions,read_stream';

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
	var statusChangeCallback=function(response) {
		console.log(response);
		// The response object is returned with a status field that lets the
		// app know the current login status of the person.
		// Full docs on the response object can be found in the documentation
		// for FB.getLoginStatus().
		if (response.status === 'connected') {
			// Logged into your app and Facebook and get the data
			getFacebookData();
			//get all posts
			getPosts();
			//get home publications
			get_home_publications();
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

	/*post method example
	var postSomething=function(){
		console.log("posting something...");
		FB.api('/me/feed', 'post', {message: "Fuckyou+ erick"});
	}*/

	var get_home_publications=function(){
		FB.api("9grados/feed",'get',function(response){
			console.log("getting home publications");
			console.log(response);
		})
	}

	var getPosts=function(){
		FB.api('me/feed','get',function(response){
			console.log("getting posts...");
			console.log(response);
		})
	}

	var logIntoFacebook=function(){
		FB.login(function(response){
			statusChangeCallback(response);
		},{scope:permissions});
	}


});
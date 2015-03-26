
/*
	Login, Signup, and Logout Functions
	These functions deal with user accounts.	
		


*/
	//signs up a new user
	function newUser() {
		var user = new Parse.User();
		var username = document.getElementById("new_username").value;
		var password = document.getElementById('new_password').value;
		var email = document.getElementById('new_email').value;
		user.set("username", username);
		user.set("password", password);
		user.set("email", email);
		user.set("squads", []);
		user.set("squadrons", []);
		//user.set("phone", document.getElementById('phone').text);
		  
		user.signUp(null, {
		  success: function(user) {
		    // Hooray! Let them use the app now.
		    window.open('feed.html', "_self");
		  },

		  error: function(user, error) {
		    // Show the error message somewhere and let the user try again.
		    $(".error_login").html(error.message);
		    $(".error_login").show();

		  }
		})}
		
	  
	 //logs in a new Parse user	
	function login(){
	  
	  Parse.User.logIn(document.getElementById('username').value, document.getElementById('password').value, {
	  success: function(user) {
	    // Do stuff after successful login.
	   		window.open("feed.html", "_self");
	  	},
	  		error: function(user, error) {
	    // The login failed. Check error to see why.
	    	$(".error_login").html(error.message);
	    	$(".error_login").show();
	  	}

		})
	};

	//logs out the Parse user
	function logout(){
		Parse.User.logOut();
		window.open('index.html', "_self");
	}

	function logMeIn(){
		  Parse.FacebookUtils.logIn(null, {
		  success: function(user) {
		    if (!user.existed()) {
		      alert("User signed up and logged in through Facebook!");
		    } else {
		      alert("User logged in through Facebook!");
		    }
		  },
		  error: function(user, error) {
		    alert("User cancelled the Facebook login or did not fully authorize.");
		  }

		});
		}
	
	function fb_login(){
		logMeIn();
		window.open('feed.html', "_self");
	}

$(document).ready(
	$("#password").keyup(function(e){
		if (e.which == 13){
			login();
		}
	})
		$("#new_password").keyup(function(e){
		if (e.which == 13){
			newUser();
		}
	})

	);


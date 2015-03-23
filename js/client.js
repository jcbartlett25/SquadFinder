
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
		//user.set("phone", document.getElementById('phone').text);
		  
		user.signUp(null, {
		  success: function(user) {
		    // Hooray! Let them use the app now.
		    window.open('feed.html', "_self");
		  },

		  error: function(user, error) {
		    // Show the error message somewhere and let the user try again.
		    $(".error_login").html(error.message);
		    $(".error_login").css("display","on");

		  }
		})}
		
	  //logs in a new Parse user	
	  function login(){
		};

	function login(){
	  Parse.User.logIn(document.getElementById('username').value, document.getElementById('password').value, {
	  success: function(user) {
	    // Do stuff after successful login.
	   		window.open("feed.html", "_self");
	  	},
	  		error: function(user, error) {
	    // The login failed. Check error to see why.
	    	$(".error_login").html(error.message);
	    	$(".error_login").css("display","on");
	  	}

		})
	};

	//logs out the Parse user
	function logout(){
		Parse.User.logOut();
		window.open('index.html', "_self");

	}
	
	function fb_login(){
		window.open('feed.html', "_self");
	}





	//signs up a new user
	function newUser() {
		var user = new Parse.User();
		user.set("username", document.getElementById("new_username").value);
		user.set("password", document.getElementById('new_password').value);
		user.set("email", document.getElementById('new_email').value);
		//user.set("phone", document.getElementById('phone').text);
		  
		user.signUp(null, {
		  success: function(user) {
		    // Hooray! Let them use the app now.
		    window.open('Profile.html', _self);
		  },
		  error: function(user, error) {
		    // Show the error message somewhere and let the user try again.
		    alert("Error: " + error.code + " " + error.message);
		  }
		});}

	function logIn(){

	  Parse.User.logIn(document.getElementById('username').text, document.getElementById('password').text), {
	  success: function(user) {
	    // Do stuff after successful login.
	    window.open('Profile.html', _self);
	  },
	  error: function(user, error) {
	    // The login failed. Check error to see why.
	  }
	};
	}
	





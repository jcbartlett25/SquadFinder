function newUser() {
var user = new Parse.User();
user.set("username", "therealdsmart");
user.set("password", "ayylmao123");
user.set("email", "davidsmart21@gmail.com");
  
// other fields can be set just like with Parse.Object
user.set("phone", "270 303 4449");
  
user.signUp(null, {
  success: function(user) {
    // Hooray! Let them use the app now.
  },
  error: function(user, error) {
    // Show the error message somewhere and let the user try again.
    alert("Error: " + error.code + " " + error.message);
  }
});}

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

document.getElementById("login").onclick="logMeIn()";
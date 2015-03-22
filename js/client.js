
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
		    var syncano = SyncanoConnector.getInstance();
		    var PROJECT_ID = 6289;
			var COLLECTION_ID = 18888;

				//Keys
  			var authData = {
    			api_key: "b50a00e33bb198286b779a53666249b90eb3f6dc",
    			instance: "sparkling-meadow-922472"
  			};
  
  			syncano.connect(authData, function (auth) {
    			console.log("Connected");
    			//Stores post in an object
    			var params = {
    				title: username,
    				text: "a valued user",
    				state: 'Moderated',
   					additional: {
   						squads: [],
   						squadrons: []
   					}
  				});
  				
  				//Actually pushes object to database
  				syncano.Data.new(PROJECT_ID, COLLECTION_ID, params, function(data){
    				console.log('Created new data object with ID = ', data.id);
  					})};
		    window.open('feed.html', "_self");
		  },
		  error: function(user, error) {
		    // Show the error message somewhere and let the user try again.
		    alert("Error: " + error.code + " " + error.message);
		  }
		})}

	  function login(){
	  Parse.User.logIn(document.getElementById('username').value, document.getElementById('password').value, {
	  success: function(user) {
	    // Do stuff after successful login.
	   		window.open("feed.html", "_self");
	  	},
	  		error: function(user, error) {
	    // The login failed. Check error to see why.
	  	}

		})
	};

	function logout(){
		Parse.User.logOut();
		window.open('index.html', "_self");

	}
	
	function fb_login(){
		window.open('feed.html', "_self");
	}





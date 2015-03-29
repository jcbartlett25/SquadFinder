function toggEditMenu(){
  $("#edit_profile_div").toggle();
}

function changeUsername(){
  my_username = document.getElementById("new_username").value;
  user = Parse.User.current();
  user.save({
    username: my_username
  }, {
    success: function(user) {
      // The object was saved successfully.
    },
    error: function(user, error) {
      // The save failed.
      // error is a Parse.Error with an error code and message.
    }
  });
  //user.setUsername("yeet");
}

function upload_pic(){
	// gets user
	var user = Parse.User.current();

/*
	//reference uploaded file
	var fileUploadControl = $("#pic_upload")[0];
	if (fileUploadControl.files.length > 0) {
  	var file = fileUploadControl.files[0];
  	var name = "photo.jpg";
  	var parseFile = new Parse.File(name, file);

  	//Save uploaded file
  	parseFile.save().then(function() {
  // The file has been saved to Parse.
	}, function(error) {
  // The file either could not be read, or could not be saved to Parse.
	});

  	//$("#profile_pic").attr('src', parseFile)
*/
  	//set user's profile pic to uploaded file
  	pic_url = document.getElementById("profile_pic_url").value;
  	user.set('profile_pic_url', pic_url);

  	//var profilePhoto = user.get("profile_pic");
	//$("#profile_pic")[0].src = profilePhoto.url();
	
}

$(document).ready(
  function(){
        var currentUser = Parse.User.current();

        $("#profile_name").html(currentUser.getUsername())

        //Changes pages if user is not logged in.
        //$("#menu_name").html(" - " + Parse.User.current().getUsername());

        
        if (currentUser) {
            
        } else {
          window.open('index.html', "_self");
            }

        //updates email verification string
        if (currentUser.attributes.emailVerified === true){
          $("#email_verify").html("Yes");
        }

        var profilePhoto = currentUser.attributes.profile_pic_url;
        //var profileURL = profilePhoto.URL();
        $("#profile_pic").attr('src', profilePhoto);
        //$("#profile_pic").fadeIn();
}
  );





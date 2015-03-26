$(document).ready(function load_pic(){
  var user = Parse.User.current();
  var profilePhoto = user.get("profile_pic_url");
  //var profileURL = profilePhoto.URL();
  $("#profile_pic").attr('src', profilePhoto);
  $("#profile_pic").fadeIn();
}
);

function toggEditMenu(){
  $("#edit_profile_menu").toggle();
}

function changeUsername(){
  username = document.getElementById("new_username").value;
  user = Parse.user.current();
  user.set("username", username);
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

    $("#profile_pic").attr("src", pic_url);
  	//var profilePhoto = user.get("profile_pic");
	//$("#profile_pic")[0].src = profilePhoto.url();
	
}





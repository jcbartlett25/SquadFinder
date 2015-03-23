function upload_pic(){
	// gets user
	var user = Parse.User.current();

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

  	//set user's profile pic to uploaded file
  	;
  	  	user.set('profile_pic', parseFile).then(function() {
  // The file has been saved to Parse.
  alert();
	}, function(error) {
  // The file either could not be read, or could not be saved to Parse.
	});


  	var profilePhoto = user.get("profile_pic");
	$("#profile_pic")[0].src = profilePhoto.url();
	
}
}
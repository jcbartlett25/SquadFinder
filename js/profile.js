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
  	user.set('profile_pic', '.SquadFinder1/img/david.jpg')

  	var profilePhoto = user.get("profile_pic");
	$("#profile_pic")[0].src = profilePhoto.url();
	
}
}

function load_pic(){
	var user = Parse.User.current();
	var profilePhoto = user.get("profile_pic");
	var profileURL = profilePhoto.URL();
	$("#profile_pic").attr('src', "http://files.parsetfss.com/3be3fd11-410d-4010-99a3-1304e98bdd9a/tfss-9bdc8c5a-e682-4253-9033-d9515e202c5d-Snapchat-20140724052553_opt.jpg");
}
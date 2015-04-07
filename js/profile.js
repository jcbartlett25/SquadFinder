function toggEditMenu(){
  $("#edit_profile_section").toggle();
}

function changeUsername(){
  my_username = document.getElementById("new_username").value;

  if(my_username.split(" ").length > 1){
      alert("Please don't put spaces in your username.");
      return;
  }

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
  location.reload()
}

function uploadPic(){
	var user = Parse.User.current(); //current user
	var fileUploadControl = $("#profile_pic_file")[0]; //current user

  if (fileUploadControl.files.length > 0) {
    var file = fileUploadControl.files[0]; //file from form
    var name = "photo.jpg"; //photo file name
    var profPic = new Parse.File(name, file); //creates a Parse file
  }

  //saves file to Parse
  profPic.save().then(function() {
    // The file has been saved to Parse.
  }, function(error) {
    // The file either could not be read, or could not be saved to Parse.
  });

  //associates profile pic with a User
  user.set("profilePic", profPic)

  user.save({
    profilePic: profPic
  }, {
    success: function(user) {
      // The object was saved successfully.
    },
    error: function(user, error) {
      // The save failed.
      // error is a Parse.Error with an error code and message.
    }
  });
}

function loadPic(){
  var currentUser = Parse.User.current();
  var profilePhoto = currentUser.get("profilePic");

  // $("#profile_pic")[0].src = profilePhoto.url();
  $("#profile_pic")[0].css('background-image', 'url('+ profilePhoto + ')');

}

$(document).ready(
  function(){
        var currentUser = Parse.User.current();

        //makes sure the user is logged in
        if (currentUser) {
            
        } else {
          window.open('index.html', "_self");
          return;
            }

        //display profile name
        $("#profile_name").html(currentUser.getUsername())


        //updates email verification string
        if (currentUser.attributes.emailVerified === true){
          $("#email_verify").html("Yes");

        }
        loadPic();


}
  );





$(document).ready(function(){
  var user = Parse.User.current();

  if(user){

  }
  else{
    $("#profile-link").hide();
    $("feed-link").hide();
  }

}
  )
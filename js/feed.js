$(document).ready(
  function() {
     //updates email verification string
        currentUser = Parse.User.current();
        if (currentUser.attributes.emailVerified === false){
            $("#please_verify").show();
        }
  }
  );


//POPULATES Feed with Posts
function populatePage(){
  
  var query = new Parse.Query("Post")

  //Actually pulls the objects down from Parse
  query.find({
    success: function(results) {

      console.log("Data retrieved");
      //Loops through objects and creates new squadPosts from the data
      for (var i = 0; i < results.length; i++) { 
        var obj = results[i];
        new squadPost(obj.get('descript'), obj.get('title'), obj.get('username'), obj.id, obj.get('goons'));
      }
    },

    //Alerts user of what error occurred 
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });
  
};


//Constructor for the squadPost object
function squadPost(descript, title, username, id, goons)
{

  this.descript = descript,
  this.title = title,
  this.username = username,
  this.id = id,
  this.goons = goons;

  $("#squad_descript").html(descript);
  $("#squad_title").html(title);
  $("#post_username").html(username);

  if (goons.length == 1) {
    $("#num-goons").html("0 goons")
  }
  else {
    $("#num-goons").html(goons.length + " goons")
  };

  $post = $("#template").clone();

  //Gives each div a unique name
  $post.removeAttr("id")
  $post.find("span").removeAttr("id")
  $post.find("p").removeAttr("id")
  $(".feed_div").prepend($post);
  $post.css("display", "block")

  //Adds on click functionality
  $post.click(function()
  {

    joinSquad(id)
    squadPost.fetch()

  })

}


//POST A SQUAD
function postSquad(){

  //Storing user given elements
  var descript = document.getElementById("new_post_descript").value;
  var title = document.getElementById("new_post_title").value;

  //Making sure user input is actual input
  if (title === "title" || descript === "i need a squad for...") {
    return;
  };

  if (title === ""){
    return;
  }

  if (descript === ""){
    return;
  }

  var username = Parse.User.current().getUsername();

  //Putting the new post in the feed
  $("#squad_descript").html(descript);
  $("#squad_title").html(title);
  $("#post_username").html(username);
  $("#num-goons").html("0 goons");
  $post = $("#template").clone();
  $(".feed_div").prepend($post);
  $post.fadeIn();

  document.getElementById("new_post_descript").value = "";
  document.getElementById("new_post_title").value = "";

  //Getting the Post class from Parse and saving the information
  var post = Parse.Object.extend("Post");
  var squadpost = new post()
  squadpost.save({
    title: title,
    descript: descript,
    username: username,
    goons: [username]
  }, {
    success: function() {
      console.log('success')
    },
    error: function(error) {
      console.log(error)
    }
  })
};


//Clears Text from Input Boxes
function clearText(){
  var descript = document.getElementById("new_post_descript").value;
  var title = document.getElementById("new_post_title").value;
  
  if (descript === "I need a squad for...") {
    document.getElementById("new_post_descript").value = "";
  };
  
  if (title === "Title") {
    document.getElementById("new_post_title").value = "";
  };
}


//Joins squads (self explanatory....)
var joinSquad = function(squadId){
  
  //adding the squadId to the user's squad
  var user = Parse.User.current();
  var username = user.getUsername();
  
  user.addUnique("squads", squadId);
  user.save();
  
  //Loads all objects in the Post class
  var query = new Parse.Query("Post")

  //Actually pulls the objects down from Parse
  query.get(squadId, {
    success: function(obj) {

      console.log("Object retrieved");
      obj.addUnique("goons", username)
      obj.save()
      //alert("You joined the squad!")
    },
    //Alerts user of what error occurred 
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });

}


populatePage();


$(document).ready(
  function() {
     //updates email verification string
        currentUser = Parse.User.current();
        if (currentUser.attributes.emailVerified === false){
            $("#please_verify").show();
        }
  }
  );

user = Parse.User.current();
alert(user.getUsername())

//POPULATES Feed with Posts
function populatePage(){
  
  var query = new Parse.Query("Post")
  var user = Parse.User.current().getUsername();
  //Sort by date
  query.ascending('createdAt')

  //Actually pulls the objects down from Parse
  query.find({
    success: function(results) {

      console.log("Data retrieved");
      //Loops through objects and creates new squadPosts from the data
      for (var i = 0; i < results.length; i++) {
        var obj = results[i];
        new squadPost(obj.get('descript'), obj.get('title'), obj.get('username'), obj.id, obj.get('goons'), obj.createdAt);
      }
    },

    //Alerts user of what error occurred 
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });
  
};


//Constructor for the squadPost object
function squadPost(descript, title, username, id, goons, time)
{

  this.descript = descript,
  this.title = title,
  this.username = username,
  this.id = id,
  this.goons = goons,
  this.time = time

  $("#squad_descript").html(descript);
  $("#squad_title").html(title);
  $("#post_username").html(username);

  if (goons.length == 1) {
    $("#num-goons").html("1 lonely goon")
  }
  else {
    $("#num-goons").html(goons.length + " goons")
  };
  //alert(contains(goons, user.getUsername()));
  if (contains(goons, user.getUsername())) {
      document.getElementById('joined').style.display = 'inline-block';
      document.getElementById('join-button').style.display = 'none';
      console.log("joined")
  }
  else {
    document.getElementById('join-button link').style.display = 'inline-block';
    console.log("join-button link")
  }

  $("#timestamp").html(timeSince(time));

  $post = $("#template").clone();
  //Gives each div a unique name
  $post.removeAttr("id")
  //$post.find("span").removeAttr("id")
  //$post.find("p").removeAttr("id")
  //$post.find("span").removeAttr("id")
  //$post.find("span").removeAttr("id")
  //$post.find("p").removeAttr("id")
  //$post.find("span").removeAttr("id")
  //$post.find("span").removeAttr("id")
  $(".feed_div").prepend($post);
  $post.css("display", "block")

  //Adds on click functionality
  $post.click(function()
  {

    joinSquad(id)
    console.log(time)

  })

}


//POST A SQUAD
function postSquad(){

  //Storing user given elements
  var descript = encodeHTML(document.getElementById("new_post_descript").value);
  var title = encodeHTML(document.getElementById("new_post_title").value);

  //Making sure user input is actual input
  if (title === "Title" || descript === "I need a squad for...") {
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
  $("#timestamp").html("Just now");
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

  //Actually pulls the specified object down from Parse
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

function showGoons() {
  $(".goons-in-squad").toggle();
}

function encodeHTML(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

var timeSince = function(date) {
    if (typeof date !== 'object') {
        date = new Date(date);
    }

    var seconds = Math.floor((new Date().getTime() - date) / 1000);
    var intervalType;

    var interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
        intervalType = 'year';
    } else {
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
            intervalType = 'month';
        } else {
            interval = Math.floor(seconds / 86400);
            if (interval >= 1) {
                intervalType = 'day';
            } else {
                interval = Math.floor(seconds / 3600);
                if (interval >= 1) {
                    intervalType = "hour";
                } else {
                    interval = Math.floor(seconds / 60);
                    if (interval >= 1) {
                        intervalType = "minute";
                    } else {
                        interval = seconds;
                        intervalType = "second";
                    }
                }
            }
        }
    }

    if (interval > 1 || interval === 0) {
        intervalType += 's';
    }

    if (intervalType === 'minute') {
      return 'A hot ' + intervalType + ' ago';
    }

    return interval + ' ' + intervalType + ' ago';
};

function contains(a, obj) {
    var i = a.length;
    while (i--) {
       if (a[i] === obj) {
           return true;
       }
    }
    return false;
}

populatePage();

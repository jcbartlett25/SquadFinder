var user = Parse.User.current();
var username = user.getUsername();
var app = angular.module('feed', []);
var postList = new Array();


$(document).ready(
  function() {
     //updates email verification string
        currentUser = Parse.User.current();
        if (currentUser.attributes.emailVerified === false){
            $("#please_verify").show();
        }
    }
  );

/*
//POPULATES Feed with Posts
function populatePage(){
  
  var query = new Parse.Query("Post");

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
*/

//POPULATES Feed with Posts
function populatePage(){
  
  var query = new Parse.Query("Post");
    //Sort by date
  query.ascending('createdAt')

  //Actually pulls the objects down from Parse
  var rawData = query.find({
    success: function(results) {
      console.log("Data retrieved")
    },

    //Alerts user of what error occurred 
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  }).then(function(results) {
      window.postList = new Array();
      for (i = 0; i < results.length; i++){
        console.log(results[i].toJSON());
        postList.push(results[i].toJSON());
      }
    }).then(function() {
      window.app = angular.module('feed', []);
    });
  };//)

  //return rawData
//};


function transformData(rawData) {
  data = rawData._result[0];
  length = data.length;
  newData = new Array();

  for (i = 0; i < length; i++){
    transformedObj = data[i].toJSON();
    newData.push(transformedObj);
  }

  return newData
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

  /*
  $("#squad_descript").html(descript);
  $("#squad_title").html(title);
  $("#post_username").html(username);

  // Display quantity of goons in squad
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
    document.getElementById('leave-button').style.display = 'inline-block';
    console.log("joined")
  }
  else {
    document.getElementById('joined').style.display = 'none';
    document.getElementById('join-button').style.display = 'inline-block';
    document.getElementById('leave-button').style.display = 'none';
    console.log("not joined")
  }

  $("#timestamp").html(timeSince(time));
  $post = $("#template").clone();
  //Gives each div a unique name
  $post.removeAttr("id")
  $post.find("span").removeAttr("id");
  $post.find("p").removeAttr("id");
  $post.find("span").removeAttr("id");
  $post.find("span").removeAttr("id");
  $post.find("p").removeAttr("id");
  $(".feed_div").prepend($post);
  $post.slideDown();
  $post.css("display", "block");

  //Add user to squad on click
  $(".join-button").click(function() {
    joinSquad(id)
  })

  $(".leave-button").click(function() {
    leaveSquad(id)
  })
  */
};

/*
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
  $("#num-goons").html("1 lonely goon");
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
*/

//Join squads (self explanatory....)
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

};


var leaveSquad = function(squadId){

  var user = Parse.User.current();
  var username = user.getUsername();
  
  //Loads all objects in the Post class
  var query = new Parse.Query("Post")

  //Actually pulls the specified object down from Parse
  query.get(squadId, {
    success: function(obj) {

      console.log("Object retrieved");
      obj.remove("goons", username);
      obj.save();
      //alert("You joined the squad!")
    },
    //Alerts user of what error occurred 
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });

};


function showGoons() {
  $(".goons-in-squad").toggle();
};


function encodeHTML(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
};


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
      return 'a hot ' + intervalType + ' ago';
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
};

populatePage();

app.controller('FeedController', function(){
  this.feedPosts = postList;
  this.bool = true;
};
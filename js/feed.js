$(document).ready(
  function() {
     //updates email verification string
        currentUser = Parse.User.current();
        if (currentUser.attributes.emailVerified === false){
            $("#please_verify").show();
        }
  }
  );

//var syncano = SyncanoConnector.getInstance(); 
//POPULATES Feed with Posts

function populatePage(){

  //Connects to Syncano
  /*
  var authData = {
    api_key: "b50a00e33bb198286b779a53666249b90eb3f6dc",
    instance: "sparkling-meadow-922472"
  };
  var PROJECT_ID = 6289;
  var COLLECTION_ID = 18888;
  
   
  syncano.connect(authData, function (auth) {
    console.log("Connected");
  });
  
  syncano.on('syncano:authorized', function(auth){
    console.log("authorized");
  });
    
  var params = {
    include_children: false,
    folders: 'Default'
  }
  

  // Pulls post objects from Syncano and fills in each template
  syncano.Data.get(PROJECT_ID, COLLECTION_ID, params, function (data) {
    //console.log('Received', data.length, 'objects');
    //looping through each object received from Syncano and filling the template
    for (i in data) {
     	var obj = data[i];
    	new squadPost(obj.text, obj.title, obj.additional.username, obj.id, obj.additional.goons);
    };
    //Logging each object to the console			
    data.forEach(function (d) {
     	//console.log(d);
    });
  });

  syncano.off();
  */

  var query = new Parse.Query("Post")
  query.find({
  success: function(results) {
    alert("Successfully retrieved " + results.length + " scores.");
    // Do something with the returned Parse.Object values
    for (var i = 0; i < results.length; i++) { 
      var obj = results[i];
      alert(obj.id + ' - ' + obj.get('playerName'));
      new squadPost(obj.text, obj.title, obj.creator, obj.id, obj.goons);
    }
  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
});
  


};


function squadPost(descript, title, username, id, goons)
{

  this.descript = descript,
  this.title = title,
  this.username = username,
  this.id = id,
  this.goons = goons.split(" ");
  //console.log(goons.split(" ").length)

  $("#squad_descript").html(descript);
  $("#squad_title").html(title);
  $("#post_username").html(username);
  $("#num-goons").html(goons.split(" ").length + " goons")
  $post = $("#template").clone();
  //Gives each div a unique name
  $post.removeAttr("id")
  $post.find("span").removeAttr("id")
  $post.find("p").removeAttr("id")
  $(".feed_div").prepend($post);
  $post.css("display", "block")

  $post.click(function()
  {

    joinSquad(id, goons, title, descript, username)

  })

}

//POST A SQUAD
function postSquad(){
  var descript = document.getElementById("new_post_descript").value;
  var title = document.getElementById("new_post_title").value;

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

  $("#squad_descript").html(descript);
  $("#squad_title").html(title);
  $("#post_username").html(username);
  //$("#squad_post").attr('id', obj.id)
  $post = $("#template").clone();
  //Gives each div a unique name
  //$post.attr("id", obj.id);
  $(".feed_div").prepend($post);
  $post.fadeIn();


  document.getElementById("new_post_descript").value = "";
  document.getElementById("new_post_title").value = "";

  /*
  //var syncano = SyncanoConnector.getInstance(); 
  //Project = Squad Finder && Collection = posts
  var PROJECT_ID = 6289;
  var COLLECTION_ID = 18888;

  //Keys
  var authData = {
    api_key: "b50a00e33bb198286b779a53666249b90eb3f6dc",
    instance: "sparkling-meadow-922472"
  };
  
  //syncano.connect(authData, function (auth) {
    //console.log("Connected");
  //Stores post in an object
  var params = {
    title: title,
    text: descript,
    state: 'Moderated',
    additional: {
      username: username,
      goons: username
    }
  };
          
  //Actually pushes object to database
  syncano.Data.new(PROJECT_ID, COLLECTION_ID, params, function(data){
    //console.log('Created new data object with ID = ', data.id);
  });
  */

  //});
  //var $div = $("#squad_post").html();
  //$(".content").append($div);

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

var joinSquad = function(squadId, goons, title, descript, squadOwner){
  
  var user = Parse.User.current();
  var username = user.getUsername();

  
  user.addUnique("squads", squadId);
  user.save();


  
  /*
  console.log(syncano)
  
  var authData = {
    api_key: "b50a00e33bb198286b779a53666249b90eb3f6dc",
    instance: "sparkling-meadow-922472"
  };
  

  alert(authData.api_key + " " + authData.instance)

  var PROJECT_ID = 6289;
  alert(PROJECT_ID)
  var COLLECTION_ID = 18888;
  alert(COLLECTION_ID)

  
  syncano.connect(authData, function (auth) {
    alert("Connected");
  });
  

  
  syncano.on('syncano:authorized', function(auth){
    alert("authorized");
  });
  

  var DATA_ID = squadId;
  alert(DATA_ID)
  
  //syncano.Data.getOne(PROJECT_ID, COLLECTION_ID, DATA_ID, function (data) {
    //alert(data);

  var params = {
    title: title,
    text: descript,
    state: 'Moderated',
    additional: {
      username: squadOwner,
      goons: goons + " " + username
    }
  };

  alert(params.additional.username)
  alert(params.additional.goons)

  syncano.Data.update(PROJECT_ID, COLLECTION_ID, DATA_ID, params, function(data){
    alert("updated");
  });

  //});
  */
}

populatePage();


//POPULATES Feed with Posts
var syncano = SyncanoConnector.getInstance(); 
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


// Populates the feed on login
syncano.Data.get(PROJECT_ID, COLLECTION_ID, params, function (data) {
  console.log('Received', data.length, 'objects');
  for (i in data) {
   	var obj = data[i];
  	$("#squad_descript").html(obj.text);
		$("#squad_title").html(obj.title);
		$("#post_username").html(obj.additional.username);
		$post = $("#template").clone();
		$post.removeAttr('id');
		$(".feed_div").prepend($post);
		$post.fadeIn();
  };
   			
  data.forEach(function (d) {
   	console.log(d);
  });
});

syncano.off();


//POST A SQUAD
function postSquad(){
  var descript = document.getElementById("new_post_descript").value;
  var title = document.getElementById("new_post_title").value;

  if (title === "title" || descript === "i need a squad for...") {
    return;
  };

  var username = Parse.User.current().getUsername();

  $("#squad_descript").html(descript);
  $("#squad_title").html(title);
  $("#post_username").html(username);
  $post = $("#template").clone();
  $post.removeAttr('id');
  $(".feed_div").prepend($post);
  $post.fadeIn();


  document.getElementById("new_post_descript").value = "";
  document.getElementById("new_post_title").value = "";

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
      joinSquad: joinSquad(this.title)
    }
  };
          
  //Actually pushes object to database
  syncano.Data.new(PROJECT_ID, COLLECTION_ID, params, function(data){
    console.log('Created new data object with ID = ', data.id);
  });
  //});
  //var $div = $("#squad_post").html();
  //$(".content").append($div);
};


//Clears Text from Input Boxes
function clearText(){
  var descript = document.getElementById("new_post_descript").value;
  var title = document.getElementById("new_post_title").value;
  
  if (descript === "i need a squad for...") {
    document.getElementById("new_post_descript").value = "";
  };
  
  if (title === "title") {
    document.getElementById("new_post_title").value = "";
  };
}

function joinSquad(squad){
  var user = Parse.User.current();
  user.addUnique("squads", squad);
  user.save();
}
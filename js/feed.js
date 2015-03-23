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
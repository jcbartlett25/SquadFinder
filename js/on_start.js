      // Initialize Parse
      Parse.initialize("m6cPbArnJyhg0yoMeAwU5bpClSXWjZnuTOcaChuq", "3z3mull3Uyyqs6bJLfNTt0uU4sZ5H1VEkjD75NBp");
     
     //Facebook 
      window.fbAsyncInit = function() {
        Parse.FacebookUtils.init({ // this line replaces FB.init({
          appId      : '697679580354991', // Facebook App ID
          status     : false,  // check Facebook Login status
          cookie     : true,  // enable cookies to allow Parse to access the session
          xfbml      : true,  // initialize Facebook social plugins on the page
          version    : 'v2.2' // point to the latest Facebook Graph API version
        });
     
        // Run code after the Facebook SDK is loaded.
    };
      
      //Loads Facebook SDK
      (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));

var profpic = FB.api(
    "/me/picture",
    {
        "redirect": false,
        "height": 200,
        "width": 200,
        "type": "normal"
    },
    function (response) {
      if (response && !response.error) {
        /* handle the result */
      }
    }
);

document.getElementById("profile_pic").innerHTML = profpic;
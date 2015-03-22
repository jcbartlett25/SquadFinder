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
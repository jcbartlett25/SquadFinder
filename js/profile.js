function upload_pic(){
	var pic = document.getElementById("pic_upload");
	var profile_pic = new Parse.File("photo.jpg", pic);
	$("#profile_pic").html(profile_pic);
}
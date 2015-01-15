/*
	http://davidwalsh.name/browser-camera
*/

jQuery(document).ready(function($) {
	var initialized = false;
	var $video = $("#profile-video"),
		$snapshot = $("#profile-snapshot"),
		$button = $("#camera-button"),
		$default = $(".photo-default");
	var width = $video.attr("width"),
		height = $video.attr("height");

	// Grab elements, create settings, etc.
	var canvas = $snapshot[0],
		context = canvas.getContext("2d"),
		video = $video[0],
		videoObj = { "video": true },
		errBack = function(error) {
			console.log("Video capture error: ", error.code); 
		};

	var play = function() {
		$default.hide();
		$video.show();
		$snapshot.hide();
		video.play();
	};
	
	var snapshot = function() {
		$default.hide();
		video.pause();
		$video.hide();
		$snapshot.show();
		context.drawImage(video, 0, 0, width, height);
	};

	var initialize = function() {
		// Put video listeners into place
		if(navigator.getUserMedia) { // Standard
			navigator.getUserMedia(videoObj, function(stream) {
				video.src = stream;
				video.play();
			}, errBack);
		} else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
			navigator.webkitGetUserMedia(videoObj, function(stream){
				video.src = window.webkitURL.createObjectURL(stream);
				play();
			}, errBack);
		}
		else if(navigator.mozGetUserMedia) { // Firefox-prefixed
			navigator.mozGetUserMedia(videoObj, function(stream){
				video.src = window.URL.createObjectURL(stream);
				play();
			}, errBack);
		}
		else {
			var err = "Sorry, video capture is not supported on this device.";
			alert(err);
		}
	};
	
	// button listener to snapshot
	$button.click(function(e) {
		e.preventDefault();
		if (!initialized) {
			initialized = true;
			initialize();
		} else if (video.paused) {
			play();
		} else {
			snapshot();	
		}
	});
});
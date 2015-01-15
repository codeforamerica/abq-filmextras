/*
	http://davidwalsh.name/browser-camera
*/

jQuery(document).ready(function($) {
	var initialized = false;
	var width = 640,
		height = 480;
	var $video = $("#profile-video"),
		$snapshot = $("#profile-snapshot"),
		$button = $("#camera-button");

	// Grab elements, create settings, etc.
	var canvas = $snapshot[0],
		context = canvas.getContext("2d"),
		video = $video[0],
		videoObj = { "video": true },
		errBack = function(error) {
			console.log("Video capture error: ", error.code); 
		};

	var play = function() {
		$video.show();
		$snapshot.hide();
		video.play();
	};
	
	var snapshot = function() {
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
	};
	
	// button listener to snapshot
	$button.click(function(e) {
		if (initialized) {
			snapshot();
		} else {
			initialized = true;
			initialize();	
		}
	});
});
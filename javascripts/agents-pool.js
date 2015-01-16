jQuery(document).ready(function($) {
	var $pool = $(".pool"),
		$cards = $pool.find(".vcard"),
		selectedClass = "selected";
	
	$cards.click(function(e) {
		e.preventDefault();
		var $card = $(this);
		$card.toggleClass(selectedClass);
	});
});
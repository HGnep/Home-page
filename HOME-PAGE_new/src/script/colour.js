window.addEventListener('load', function() {
	console.log('hi');
	//first set the background image in a (hidden) image element
	let imgSrc = $('body').css('background-image');
	imgSrc = imgSrc.replace('url(','').replace(')','').replace(/\"/gi, "");
	const imgElt = document.getElementById('bg-img');
	imgElt.src = imgSrc;

	imgElt.addEventListener('load', function() {
		console.log('loaded');
		const colorThief = new ColorThief();
		let result = colorThief.getColor(imgElt);
		console.log(result);
	});
})
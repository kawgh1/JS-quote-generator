


const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteButton = document.getElementById("new-quote");


// loader
const loader = document.getElementById("loader");


function showLoadingSpinner() {
	// show loader
	loader.hidden = false;
	// hide quote container
	quoteContainer.hidden = true;
}


function removeSpinnerShowQuote() {
	if (!loader.hidden) {
		quoteContainer.hidden = false;
		loader.hidden = true;
	}
}


// Get Quote from forismatic.com/en/api API
async function getQuoteFromAPI() {

	var i; // used to catch errors


	// display loader first
	showLoadingSpinner();

	const proxyUrl = "https://mysterious-reaches-23758.herokuapp.com/";
	const apiUrl =
		"http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

	try {
		const response = await fetch(proxyUrl + apiUrl);
		const data = await response.json();

		// console.log(data)

		// If author field is blank, add 'Unknown'
		if (data.quoteAuthor === "") {
			authorText.innerText = "Unknown";
		} else {
			authorText.innerText = data.quoteAuthor;
		}

		// Dynamically reduce font size for longer quotes
		if (data.quoteText.length > 120) {
			quoteText.classList.add("long-quote");
		} else {
			// un-apply 'long-quote' class if new quote had it applied previously
			quoteText.classList.remove("long-quote");
		}

		quoteText.innerText = data.quoteText;


		// Stop Loader, Show Quote
		removeSpinnerShowQuote();


	} catch (error) {

		// prevent recursive error handling
		while (i < 5) {

			getQuoteFromAPI();
			i++;
		}

		console.log('Failed to get new quote from API!');
		console.log(error);
		// window.stop();
		// console.log('whoops, no quote', error)
	}
}



// Tweet quote function
function tweetQuote() {
	const quote = quoteText.innerText;
	const author = authorText.innerText;
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

	// open tweet in new window
	window.open(twitterUrl, "_blank");
}



// Event Listeners
newQuoteButton.addEventListener("click", getQuoteFromAPI);

twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuoteFromAPI();

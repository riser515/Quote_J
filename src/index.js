import './styles.css';

const quoteContainer = document.getElementById("quote-container");
const quoteContent = document.getElementById("quote-content");
const quoteAuthor = document.getElementById("quote-author");
const twitterButton = document.getElementById("twitter");
const whatsappButton = document.getElementById("whatsapp");
const newQuoteButton = document.getElementById("new-quote");
const loader = document.getElementById("loader");

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete(){
    if(!loader.hidden){
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}

async function fetchQuote(){
    loading();
    const url = "http://api.quotable.io/random";
    try{
        const r = await fetch(url);
        const data = await r.json();
        quoteAuthor.innerText = data.author;
        if (data.length > 120){
            quoteContent.classList.add("long-quote");
        }
        else{
            quoteContent.classList.remove("long-quote");
        }
        quoteContent.innerText = data.content;
        complete();
    }
    catch(e){
        console.log("Error");
    }
}

function tweetQuote(){
    const tweetURL = `https://twitter.com/intent/tweet?text=${quoteContent.innerText}%0a ~ ${quoteAuthor.innerText}`;
    window.open(tweetURL, '_blank');
}

function whatsappQuote(){
    const whatsappURL = `https://api.whatsapp.com/send?text=${quoteContent.innerText}%0a ~ ${quoteAuthor.innerText}`
    window.open(whatsappURL, '_blank');
}

newQuoteButton.addEventListener("click", fetchQuote);
twitterButton.addEventListener("click", tweetQuote);
whatsappButton.addEventListener("click", whatsappQuote);

fetchQuote();
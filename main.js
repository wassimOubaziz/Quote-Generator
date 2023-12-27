const article = document.querySelector("article");
const element = document.querySelector("article h5");
const author = document.querySelector("article p");
const quoteBtn = document.querySelector(".quoteBtn");
const shareBtn = document.querySelector(".share");
const loader = document.querySelector(".loader");

let apiQuotes = [];

function loading() {
  loader.style.display = "block";
  article.style.display = "none";
}

function complete() {
  loader.style.display = "none";
  article.style.display = "block";
}

function randomQuote() {
  loading();
  const quote = apiQuotes[Math.floor(Math.random() * (apiQuotes.length + 1))];

  if (!quote.author) {
    author.textContent = "Unknown";
  } else {
    author.textContent = quote.author;
  }

  if (quote.text.length > 120) {
    element.classList.add("longQuote");
  } else {
    element.classList.remove("longQuote");
  }
  element.textContent = quote.text;
  complete();
}

async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    randomQuote();
  } catch (error) {
    alert(error);
  }
}

getQuotes();

function tweet() {
  const tweetUrl = `https://twitter.com/intent/tweet?text='${element.textContent} - ${author.textContent}'`;
  window.open(tweetUrl, "_blank");
}

quoteBtn.addEventListener("click", randomQuote);
shareBtn.addEventListener("click", tweet);

//loading();

const quotes = document.getElementById("quotes");
const author = document.getElementById("author");
const newQuotesBtn = document.getElementById("newQuotesBtn");
const tweetBtn = document.getElementById("tweetBtn");

let realData = "";
let quotesData = "";
const getNewQuotes = () => {
  let rnum = Math.floor(Math.random() * 10);
  quotesData = realData[rnum];
  quotes.innerText = `${quotesData.text}`;
  quotesData.author == null
    ? (author.innerText = "Unknown")
    : (author.innerText = `${realData[rnum].author}`);
};
const tweetNow = () => {
  let tweetPost = `https://twitter.com/intent/tweet?text="${quotesData.text}" by ${quotesData.author}`;
  window.open(tweetPost);
};
const getQuotes = async () => {
  const api = "https://type.fit/api/quotes";
  try {
    let data = await fetch(api);
    realData = await data.json();
    getNewQuotes();
    //   console.log(realData);
  } catch (error) {}
};
getQuotes();

tweetBtn.addEventListener("click", tweetNow);
newQuotesBtn.addEventListener("click", getNewQuotes);
import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Spinner from "./components/Spinner";

function App() {
  const [quote, setQuote] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showtooltipText, setShowtooltipText] = useState("");
  const [bgcolor, setBgColor] = useState("#f0f0f0");

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return setBgColor(color);
  }

  useEffect(() => {
    getRandomQuote();
  }, []);

  const getRandomQuote = async () => {
    setIsLoading(true);
    getRandomColor();
    const res = await fetch("https://api.quotable.io/random");
    const data = await res.json();
    setQuote(data);

    setIsLoading(false);
  };

  const speak = () => {
    let utterance = new SpeechSynthesisUtterance(
      `${quote.content} by ${quote.author}`
    );
    speechSynthesis.speak(utterance);
  };

  const copy = () => {
    navigator.clipboard.writeText(quote.content);
    setShowtooltipText(true);
    setTimeout(() => {
      setShowtooltipText(false);
    }, 1000);
  };
  const twitterShare = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${quote.content}`,
      "_blank"
    );
  };

  return (
    <>
      <div
        style={{ backgroundColor: bgcolor }}
        className="bg-blue-400 w-screen h-[100vh] overflow-hidden flex justify-center items-center font-mono"
      >
        <div className="bg-white p-3 rounded-md shadow-lg md:w-[50%] sm:w-[70%] w-[90%]">
          <div className="mt-8 w-full">
            <h3 className="text-center w-full text-2xl font-semibold m-4">
              Quote of the Day
            </h3>
            {!isLoading ? (
              <div>
                <div className="text-md  md:px-8 px-2 flex flex-row justify-center">
                  <>
                    <i className="fas fa-quote-left"></i>
                    <p className="m-2">{quote?.content} </p>
                    <i className="fas fa-quote-right self-end"></i>
                  </>
                </div>
                <div className="flex justify-end mr-10 mt-4">
                  - {quote?.author}
                </div>
              </div>
            ) : (
              <div className="w-full justify-center flex">
                {" "}
                <Spinner />
              </div>
            )}
          </div>
          <div className="border-t-2 m-8 flex justify-between items-start  md:flex-row flex-col">
            <div className="flex gap-6 text-blue-600  mt-4 mx-6 cursor-pointer">
              <span>
                <i className="fas fa-volume-up" onClick={speak}></i>
              </span>
              <span>
                <i className="fas fa-copy" onClick={copy}></i>
                {showtooltipText && (
                  <span className="text-blue-500 text-[14px] ml-1">copied</span>
                )}
              </span>
              <span>
                <i className="fab fa-twitter" onClick={twitterShare}></i>
              </span>
            </div>
            <div className="mt-4 mx-6">
              <button
                className="bg-red-300 text-red-700 py-1 px-4 rounded-md shadow-md"
                onClick={getRandomQuote}
              >
                New Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

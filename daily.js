// भाषा बदलने पर संबंधित स्टोरीज़ दिखाओ
document.getElementById("languageSelect").addEventListener("change", function () {
  const lang = this.value;

  // सभी story-container को छुपाओ
  document.getElementById("en-stories").style.display = "none";
  document.getElementById("hi-stories").style.display = "none";
  document.getElementById("as-stories").style.display = "none";

  // चुनी गई भाषा का सेक्शन दिखाओ
  if (lang === "en") {
    document.getElementById("en-stories").style.display = "grid";
  } else if (lang === "hi") {
    document.getElementById("hi-stories").style.display = "grid";
  } else if (lang === "as") {
    document.getElementById("as-stories").style.display = "grid";
  }
});


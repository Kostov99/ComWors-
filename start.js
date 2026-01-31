let currentLang = "hi";
let currentStories = stories_hi;
let index = 0;

function loadLanguage(lang) {
  currentLang = lang;

  if (lang === "hi") currentStories = stories_hi;
  if (lang === "en") currentStories = stories_en;
  if (lang === "as") currentStories = stories_as;
  if (lang === "hinglish") currentStories = stories_hinglish;

  backToList();
  renderList();
}

function renderList() {
  const list = document.getElementById("listPage");
  list.innerHTML = "";

  currentStories.forEach((s, i) => {
    list.innerHTML += `
      <div class="story-card" onclick="openReader(${i})">
        <h3>${s.title}</h3>
        <p>⏱ ${s.time}</p>
      </div>
    `;
  });
}

function openReader(i) {
  index = i;
  document.getElementById("listPage").style.display = "none";
  document.getElementById("readerPage").style.display = "flex";
  loadStory();
}

function loadStory() {
  const s = currentStories[index];
  document.getElementById("title").innerText = s.title;
  document.getElementById("content").innerText = s.content;
  document.getElementById("readTime").innerText = "⏱ " + s.time;
  document.getElementById("storyNumber").innerText = "Story " + (index + 1);
}

function nextStory() {
  index = (index + 1) % currentStories.length;
  loadStory();
}

function backToList() {
  document.getElementById("readerPage").style.display = "none";
  document.getElementById("listPage").style.display = "block";
}

function searchStory() {
  const text = document.getElementById("searchInput").value.toLowerCase();
  document.querySelectorAll(".story-card").forEach(card => {
    card.style.display = card.innerText.toLowerCase().includes(text)
      ? "block" : "none";
  });
}

function shareStory() {
  const url =
    window.location.origin +
    window.location.pathname +
    `?lang=${currentLang}&id=${index}`;

  const s = currentStories[index];

  if (navigator.share) {
    navigator.share({
      title: s.title,
      text: s.content,
      url: url
    });
  } else {
    navigator.clipboard.writeText(url);
    alert("Link copied:\n" + url);
  }
}

function loadFromURL() {
  const params = new URLSearchParams(window.location.search);
  const lang = params.get("lang");
  const id = params.get("id");

  if (lang) loadLanguage(lang);
  if (id !== null) setTimeout(() => openReader(parseInt(id)), 100);
}

renderList();
loadFromURL();

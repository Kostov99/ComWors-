let currentStories = [];
let currentIndex = 0;

/* Load language */
function loadLanguage(lang) {
  currentStories = window["stories_" + lang];
  renderList();
}

/* Render story cards */
function renderList() {
  const list = document.getElementById("listPage");
  list.innerHTML = "";

  currentStories.forEach((s, i) => {
    const card = document.createElement("div");
    card.className = "story-card";
    card.innerHTML = `
      <h3>${s.title}</h3>
      <small>${getReadTime(s.content)}</small>
    `;
    card.onclick = () => openStory(i);

    list.appendChild(card);
  });

  showList();
}

/* Open story */
function openStory(index) {
  currentIndex = index;
  const story = currentStories[index];

  document.getElementById("title").innerText = story.title;
  document.getElementById("content").innerText = story.content;
  document.getElementById("storyNumber").innerText =
    `Story ${index + 1}/${currentStories.length}`;
  document.getElementById("readTime").innerText =
    getReadTime(story.content);

  document.getElementById("listPage").style.display = "none";
  document.getElementById("readerPage").style.display = "block";
}

/* Back */
function backToList() {
  showList();
}

function showList() {
  document.getElementById("readerPage").style.display = "none";
  document.getElementById("listPage").style.display = "grid";
}

/* Next */
function nextStory() {
  currentIndex = (currentIndex + 1) % currentStories.length;
  openStory(currentIndex);
}

/* Share */
function shareStory() {
  const story = currentStories[currentIndex];
  const text = `${story.title}\n\nRead on ComWors 😄`;

  if (navigator.share) {
    navigator.share({ text });
  } else {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  }
}

/* Search */
function searchStory() {
  const value = document
    .getElementById("searchInput")
    .value.toLowerCase();

  const cards = document.querySelectorAll(".story-card");

  cards.forEach((card, i) => {
    card.style.display =
      currentStories[i].title.toLowerCase().includes(value)
        ? "block"
        : "none";
  });
}

/* Read time */
function getReadTime(text) {
  const words = text.split(" ").length;
  const min = Math.ceil(words / 200);
  return `${min} min read`;
}

/* Default load */
loadLanguage("en");

let currentStories = [];
let currentIndex = 0;

/* Language loader */
function loadLanguage(lang) {
  currentStories = window["stories_" + lang] || [];
  renderList();
}

/* Render cards */
function renderList() {
  const list = document.getElementById("listPage");
  list.innerHTML = "";

  currentStories.forEach((story, i) => {
    const card = document.createElement("div");
    card.className = "story-card";

    card.innerHTML = `
      <h3>${story.title}</h3>
      <small>${getReadTime(story.content)}</small>
    `;

    card.onclick = () => openStory(i);
    list.appendChild(card);
  });

  showList();
}

/* Open reader */
function openStory(index) {
  currentIndex = index;
  const s = currentStories[index];

  title.innerText = s.title;
  content.innerText = s.content;

  storyNumber.innerText = `Story ${index + 1}/${currentStories.length}`;
  readTime.innerText = getReadTime(s.content);

  listPage.style.display = "none";
  readerPage.style.display = "block";
}

/* Back */
function backToList() {
  showList();
}

function showList() {
  readerPage.style.display = "none";
  listPage.style.display = "grid";
}

/* Next */
function nextStory() {
  currentIndex = (currentIndex + 1) % currentStories.length;
  openStory(currentIndex);
}

/* Share */
function shareStory() {
  const s = currentStories[currentIndex];

  const text = `${s.title}\n\n${s.content.slice(0, 80)}...\n\nRead on ComWors 😄`;

  if (navigator.share) {
    navigator.share({ text });
  } else {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  }
}

/* Search */
function searchStory() {
  const value = searchInput.value.toLowerCase();

  document.querySelectorAll(".story-card").forEach((card, i) => {
    card.style.display =
      currentStories[i].title.toLowerCase().includes(value)
        ? "block"
        : "none";
  });
}

/* Read time */
function getReadTime(text) {
  const words = text.split(" ").length;
  return `${Math.ceil(words / 200)} min read`;
}

/* DEFAULT = Hinglish */
loadLanguage("hin");

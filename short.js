const storageKeys = {
  hindi: ['short_hi_1', 'short_hi_2', 'short_hi_3', 'short_hi_4'],
  english: ['short_en_1', 'short_en_2', 'short_en_3', 'short_en_4'],
  assamese: ['short_as_1', 'short_as_2', 'short_as_3', 'short_as_4'],
};

// 👇👇 Hardcoded Story Here 👇👇
const hardcodedStory = {
  text: "एक बार की बात है, एक बकरी बस में चढ़ गई और conductor से पूछा – 'मेहंदी लगे हाथों से ticket फाड़ सकते हो?' 🐐🤣",
  id: Date.now()
};

const languageSelect = document.getElementById('languageSelect');
const storyList = document.getElementById('storyList');
const searchInput = document.getElementById('search');
const saveBtn = document.getElementById('saveBtn');

function loadHardcodedStory() {
  storyList.innerHTML = '';
  const lang = languageSelect.value;

  if (hardcodedStory.text && hardcodedStory.text.trim().length > 0) {
    const div = document.createElement('div');
    div.className = 'story';
    const shareUrl = `${window.location.origin}${window.location.pathname}?id=${hardcodedStory.id}&lang=${lang}`;
    div.innerHTML = `
      <p>${hardcodedStory.text}</p>
      <small><a href="${shareUrl}" target="_blank">🔗 Share Story</a></small>
    `;
    storyList.appendChild(div);
    saveBtn.style.display = 'inline-block'; // Show save button
  } else {
    storyList.innerHTML = `<p>😶 कोई कहानी उपलब्ध नहीं है।</p>`;
    saveBtn.style.display = 'none'; // Hide save button
  }
}

function saveStory() {
  const lang = languageSelect.value;
  const keys = storageKeys[lang];
  const story = { ...hardcodedStory, id: Date.now() };

  let saved = false;

  for (let key of keys) {
    let arr = JSON.parse(localStorage.getItem(key) || '[]');
    if (arr.length < 50) {
      arr.push(story);
      localStorage.setItem(key, JSON.stringify(arr));
      saved = true;
      break;
    }
  }

  if (saved) {
    alert("✅ कहानी सफलतापूर्वक सेव हो गई!");
    saveBtn.style.display = 'none'; // Hide after saving
  } else {
    alert("❌ इस भाषा के सभी स्टोरेज फुल हो चुके हैं!");
  }
}

function loadAllSavedStories() {
  const lang = languageSelect.value;
  const keys = storageKeys[lang];
  let allStories = [];

  for (let key of keys) {
    const arr = JSON.parse(localStorage.getItem(key) || '[]');
    allStories = allStories.concat(arr);
  }

  const search = searchInput.value.toLowerCase();
  const filtered = allStories.filter(s => s.text.toLowerCase().includes(search));

  filtered.reverse().forEach(s => {
    const div = document.createElement('div');
    div.className = 'story';
    div.innerHTML = `
      <p>${s.text}</p>
      <small><a href="#">🗃️ Saved Story</a></small>
    `;
    storyList.appendChild(div);
  });
}

// Search & Language Change Events
languageSelect.addEventListener('change', () => {
  storyList.innerHTML = '';
  loadHardcodedStory();
  loadAllSavedStories();
});

searchInput.addEventListener('input', () => {
  storyList.innerHTML = '';
  loadHardcodedStory();
  loadAllSavedStories();
});

// Initial load
loadHardcodedStory();
loadAllSavedStories();

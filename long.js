const languageSelect = document.getElementById('languageSelect');
const searchInput = document.getElementById('search');
const allStories = Array.from(document.querySelectorAll('.story'));

function filterStories() {
  const selectedLang = languageSelect.value;
  const query = searchInput.value.toLowerCase();

  allStories.forEach(story => {
    const matchesLang = story.getAttribute('data-lang') === selectedLang;
    const matchesSearch = story.textContent.toLowerCase().includes(query);
    story.style.display = matchesLang && matchesSearch ? 'block' : 'none';
  });
}

// Initial Filter
filterStories();

languageSelect.addEventListener('change', filterStories);
searchInput.addEventListener('input', filterStories);


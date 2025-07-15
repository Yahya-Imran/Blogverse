function sanitizeHTML(str) {
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
}

const categories = [
  { value: "morning-routines", label: "Morning Routines" },
  { value: "productivity", label: "Productivity Hacks" },
  { value: "procrastination", label: "Procrastination Tips" },
  { value: "mindset", label: "Positive Mindset" },
  { value: "goals", label: "Goal Setting" },
  { value: "meal-prep", label: "Meal Prep" },
  { value: "fasting", label: "Intermittent Fasting" },
  { value: "workouts", label: "Home Workouts" },
  { value: "sleep", label: "Sleep Better" },
  { value: "stress", label: "Stress Relief" },
  { value: "budgeting", label: "Budgeting" },
  { value: "side-hustles", label: "Side Hustles" },
  { value: "investing", label: "Investing Basics" },
  { value: "grocery", label: "Grocery Savings" },
  { value: "debt", label: "Debt Freedom" },
  { value: "productivity-apps", label: "Productivity Apps" },
  { value: "privacy", label: "Online Privacy" },
  { value: "ai", label: "AI Tools" },
  { value: "smart-homes", label: "Smart Homes" },
  { value: "coding", label: "Coding Basics" },
  { value: "travel", label: "Budget Travel" },
  { value: "packing", label: "Packing Tips" },
  { value: "solo-travel", label: "Solo Travel" },
  { value: "minimalism", label: "Minimalism" }
];
const filtersContainer = document.getElementById("filters");

function renderFilterButtons() {
  filtersContainer.innerHTML = '';

  const allBtn = document.createElement('button');
  allBtn.className = 'filter-btn';
  allBtn.dataset.category = 'all';
  allBtn.textContent = 'All';
  filtersContainer.appendChild(allBtn);

  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn';
    btn.dataset.category = cat.value;
    btn.textContent = cat.label;
    filtersContainer.appendChild(btn);
  });
}


const blogContainer = document.getElementById('blog-container');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');
const newPostBtn = document.getElementById('newPostBtn');
const postModal = document.getElementById('postModal');
const submitPost = document.getElementById('submitPost');
const closeModal = document.getElementById('closeModal');

let posts = JSON.parse(localStorage.getItem('blogPosts')) || [
  { title: "Understanding React in 2025", content: "React remains a powerful...", category: "tech" },
  { title: "Backpacking Through Italy", content: "Exploring Italy was unforgettable.", category: "travel" },
  { title: "Vegan Tacos", content: "Here's how to make them in under 30 minutes!", category: "food" },
];

let currentFilter = 'all';

function savePosts() {
  localStorage.setItem('blogPosts', JSON.stringify(posts));
}

function renderPosts(filter = 'all', search = '') {
  blogContainer.innerHTML = '';

  const filtered = posts.filter(post => {
    return (filter === 'all' || post.category === filter) &&
           post.title.toLowerCase().includes(search.toLowerCase());
  });

  if (filtered.length === 0) {
    blogContainer.innerHTML = '<p>No posts found.</p>';
    return;
  }

  filtered.forEach(post => {
    const postEl = document.createElement('div');
    postEl.classList.add('blog-post');
    postEl.innerHTML = `
  <h2 class="clickable-title" data-index="${index}">${post.title}</h2>
  <p><strong>Category:</strong> ${post.category}</p>
  <p>${post.content.slice(0, 100)}...</p>
  <button class="read-more" data-index="${index}">Read More</button>
`;
    blogContainer.appendChild(postEl);
  });
}

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    currentFilter = btn.getAttribute('data-category');
    renderPosts(currentFilter, searchInput.value);
  });
});

searchInput.addEventListener('input', () => {
  renderPosts(currentFilter, searchInput.value);
});

newPostBtn.addEventListener('click', () => {
  postModal.classList.remove('hidden');
});

closeModal.addEventListener('click', () => {
  postModal.classList.add('hidden');
});

submitPost.addEventListener('click', () => {
  const title = sanitizeHTML(document.getElementById('postTitle').value);
  const category = document.getElementById('postCategory').value;
  const content = sanitizeHTML(document.getElementById('postContent').value);


  if (!title || !content) {
    alert('Please fill all fields.');
    return;
  }

  posts.unshift({ title, content, category });
  savePosts();
  renderPosts(currentFilter, searchInput.value);
  postModal.classList.add('hidden');

  document.getElementById('postTitle').value = '';
  document.getElementById('postContent').value = '';
});
renderFilterButtons();
function populateCategoryDropdown() {
  const postCategorySelect = document.getElementById('postCategory');
  postCategorySelect.innerHTML = '';

  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat.value;
    option.textContent = cat.label;
    postCategorySelect.appendChild(option);
  });
}
populateCategoryDropdown();

// First load
renderPosts();
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('filter-btn')) {
    const cat = e.target.getAttribute('data-category');
    renderPosts(cat, searchInput.value);
  }
});
document.addEventListener('click', e => {
  if (e.target.classList.contains('read-more') || e.target.classList.contains('clickable-title')) {
    const index = e.target.getAttribute('data-index');
    const post = blogPosts[index];
    document.getElementById('readPostTitle').textContent = post.title;
    document.getElementById('readPostCategory').innerHTML = `<strong>Category:</strong> ${post.category}`;
    document.getElementById('readPostContent').textContent = post.content;
    document.getElementById('readPostModal').classList.remove('hidden');
  }

  if (e.target.id === 'closeReadModal') {
    document.getElementById('readPostModal').classList.add('hidden');
  }
});

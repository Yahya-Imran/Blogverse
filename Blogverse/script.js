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
      <h2>${post.title}</h2>
      <p><strong>Category:</strong> ${post.category}</p>
      <p>${post.content}</p>
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
  const title = document.getElementById('postTitle').value;
  const category = document.getElementById('postCategory').value;
  const content = document.getElementById('postContent').value;

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

// First load
renderPosts();

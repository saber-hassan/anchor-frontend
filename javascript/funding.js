

window.addEventListener('load', () => {
    // Add the fade-in class
    document.body.classList.add('fade-in');

    // Enable scrolling after fade-in
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
  });



// ---------------------
// FILTERS
// ---------------------

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove 'active' from all buttons
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    const posts = document.querySelectorAll('.card');

    posts.forEach(post => {
      if (filter === 'all' || post.dataset.filter === filter) {
        post.style.display = 'block';
      } else {
        post.style.display = 'none';
      }
    });
  });
});

// ---------------------
// SEARCH
// ---------------------
document.getElementById('searchInput').addEventListener('input', e => {
  const term = e.target.value.toLowerCase();
  const posts = document.querySelectorAll('.card');

  posts.forEach(post => {
    const title = post.querySelector('h3').textContent.toLowerCase();
    const desc = post.querySelector('p').textContent.toLowerCase();

    if (title.includes(term) || desc.includes(term)) {
      post.style.display = 'block';
    } else {
      post.style.display = 'none';
    }
  });
});

// ---------------------
// DONATE BUTTONS: OPEN PAYMENT MODAL
// ---------------------
document.querySelectorAll('.donate-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Optional: pass amount from button data-attribute
        const amount = btn.dataset.amount ? Number(btn.dataset.amount) : 10000;
        openPaymentModal(amount);
    });
});


// Dark mode
const root = document.documentElement;
const darkToggle = document.getElementById('darkToggle');
if (localStorage.getItem('theme') === 'dark') root.setAttribute('data-theme', 'dark');
if (darkToggle) {
  darkToggle.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    root.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  });
}

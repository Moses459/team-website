/* M&F Web Studio — shared JavaScript for all pages. */
const yearEl = document.querySelector('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('#site-nav');
if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const themeToggle = document.querySelector('.theme-toggle');
const THEME_KEY = 'mf-team-theme';
function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark', isDark);
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.textContent = isDark ? 'Light mode' : 'Dark mode';
  }
}
const savedTheme = localStorage.getItem(THEME_KEY);
const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
applyTheme(savedTheme || preferredTheme);
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme);
  });
}

/* Projects: generated from data, filter buttons and live search (extension E3). */
const projects = [
  { title: 'Team landing page', category: 'html', description: 'A semantic home page introducing our team and the work we are learning to build.' },
  { title: 'Responsive profile cards', category: 'css', description: 'A flexible card layout that adapts from desktop screens to small phones.' },
  { title: 'Interactive project explorer', category: 'js', description: 'A searchable project collection with live category filters and result counts.' },
  { title: 'Accessible contact form', category: 'html', description: 'Labelled form fields with clear validation messages and keyboard support.' },
  { title: 'Theme switcher', category: 'js', description: 'A light and dark colour theme that remembers the visitor’s preference.' },
  { title: 'Git collaboration workflow', category: 'git', description: 'A shared repository workflow for commits, co-author credit, pull and push.' },
  { title: 'GitHub Pages deployment', category: 'git', description: 'Publishing a static website from the main branch so it can be viewed online.' }
];
const categoryNames = { html: 'HTML', css: 'CSS', js: 'JavaScript', git: 'Git & GitHub' };
const projectList = document.querySelector('#project-list');
const projectCount = document.querySelector('#project-count');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectSearch = document.querySelector('#project-search');
let activeFilter = 'all';

function renderProjects() {
  if (!projectList || !projectCount) return;
  const query = projectSearch ? projectSearch.value.trim().toLowerCase() : '';
  const visible = projects.filter((project) => {
    const matchesCategory = activeFilter === 'all' || project.category === activeFilter;
    const matchesSearch = `${project.title} ${project.description} ${categoryNames[project.category]}`.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });
  projectList.replaceChildren();
  projectCount.textContent = `Showing ${visible.length} of ${projects.length} projects`;
  if (visible.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'empty-state';
    empty.textContent = 'No projects match that search. Try another word or choose “All work”.';
    projectList.append(empty);
    return;
  }
  visible.forEach((project) => {
    const card = document.createElement('article');
    card.className = 'project-card';
    const tag = document.createElement('p');
    tag.className = 'tag';
    tag.textContent = categoryNames[project.category];
    const heading = document.createElement('h2');
    heading.textContent = project.title;
    const description = document.createElement('p');
    description.textContent = project.description;
    card.append(tag, heading, description);
    projectList.append(card);
  });
}
if (projectList) {
  renderProjects();
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter;
      filterButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
      renderProjects();
    });
  });
  if (projectSearch) projectSearch.addEventListener('input', renderProjects);
}

/* Contact form: client-side validation only; no server is connected. */
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  const nameInput = document.querySelector('#name');
  const emailInput = document.querySelector('#email');
  const messageInput = document.querySelector('#message');
  const charCount = document.querySelector('#char-count');
  const formStatus = document.querySelector('#form-status');
  const fields = [
    { input: nameInput, error: document.querySelector('#name-error'), validate: value => value.trim().length > 0, message: 'Please enter your name.' },
    { input: emailInput, error: document.querySelector('#email-error'), validate: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), message: 'Please enter a valid email address.' },
    { input: messageInput, error: document.querySelector('#message-error'), validate: value => value.trim().length >= 20, message: 'Your message must be at least 20 characters.' }
  ];
  function updateCount() { if (charCount) charCount.textContent = messageInput.value.length; }
  messageInput.addEventListener('input', updateCount);
  fields.forEach(({ input, error }) => input.addEventListener('input', () => {
    input.removeAttribute('aria-invalid');
    error.textContent = '';
    formStatus.textContent = '';
  }));
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let firstInvalid = null;
    fields.forEach(({ input, error, validate, message }) => {
      const valid = validate(input.value);
      input.setAttribute('aria-invalid', String(!valid));
      error.textContent = valid ? '' : message;
      if (!valid && !firstInvalid) firstInvalid = input;
    });
    if (firstInvalid) { formStatus.textContent = ''; firstInvalid.focus(); return; }
    formStatus.textContent = 'Thank you! Your message passed the checks. This demo form is not connected to email yet.';
    contactForm.reset();
    updateCount();
    fields.forEach(({ input, error }) => { input.removeAttribute('aria-invalid'); error.textContent = ''; });
  });
}

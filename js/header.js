function smoothScrollTo(target) {
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top, behavior: 'smooth' });
}

function updateHeroPin() {
  if (!hero) return;

  const heroTop = hero.offsetTop;
  const heroEnd = heroTop + hero.offsetHeight - window.innerHeight;
  const scrollY = window.scrollY;

  hero.classList.remove('is-pinned', 'is-ended');

  if (scrollY >= heroTop && scrollY < heroEnd) {
    hero.classList.add('is-pinned');
  }

  if (scrollY >= heroEnd) {
    hero.classList.add('is-ended');
  }
}

function updateHeroMessage() {
  if (!hero || messages.length === 0) return;

  const heroTop = hero.offsetTop;
  const scrollRange = Math.max(hero.offsetHeight - window.innerHeight, 1);
  const scrolled = window.scrollY - heroTop;
  const progress = Math.min(Math.max(scrolled / scrollRange, 0), 1);

  const activeIndex = Math.min(
    messages.length - 1,
    Math.floor(progress * messages.length)
  );

  messages.forEach((message, index) => {
    message.classList.toggle('is-active', index === activeIndex);
  });
}

function setHeaderMode(mode) {
  if (!header || !headerBrand || !headerCategory || currentHeaderMode === mode) return;

  currentHeaderMode = mode;
  header.classList.add('is-changing');

  window.setTimeout(() => {
    headerBrand.textContent = headerBrand.dataset[`${mode}Text`] || headerBrand.textContent;
    headerCategory.textContent = headerCategory.dataset[`${mode}Text`] || headerCategory.textContent;
    header.dataset.mode = mode;
    header.classList.remove('is-changing');
  }, 220);
}

function updateHeaderText() {
  const detailVisible = document.body.classList.contains('is-detail-view');

  if (detailVisible) {
    setHeaderMode('project');
    return;
  }

  const marker = window.innerHeight * 0.38;
  const aboutSection = document.querySelector('#about');
  const contactSection = document.querySelector('#contact');

  if (contactSection && contactSection.getBoundingClientRect().top <= marker) {
    setHeaderMode('contact');
    return;
  }

  if (aboutSection && aboutSection.getBoundingClientRect().top <= marker) {
    setHeaderMode('about');
    return;
  }

  if (project) {
    const projectTop = project.getBoundingClientRect().top;
    const isProjectVisible = projectTop <= window.innerHeight * 0.35;
    setHeaderMode(isProjectVisible ? 'project' : 'hero');
    return;
  }

  setHeaderMode('hero');
}

function updatePageState() {
  updateHeroPin();
  updateHeroMessage();
  updateHeaderText();
}
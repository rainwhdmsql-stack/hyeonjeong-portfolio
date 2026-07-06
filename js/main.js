const hero = document.querySelector('.hero');
const project = document.querySelector('.project');
const messages = document.querySelectorAll('.hero__message');
const header = document.querySelector('.hero__header');
const headerBrand = document.querySelector('.hero__brand');
const headerCategory = document.querySelector('.hero__category');
const categoryCards = document.querySelector('#categoryCards');
const detailSection = document.querySelector('#project-detail');
const detailMount = document.querySelector('#projectDetailMount');

let activeCategoryId = null;
let activeProjectId = null;
let currentHeaderMode = 'hero';

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderCategoryCards() {
  if (!categoryCards || !Array.isArray(portfolioCategories)) return;

  categoryCards.innerHTML = portfolioCategories.map((category) => `
    <li aria-label="${escapeHtml(category.title)} 카테고리 카드">
      <a class="project-card" href="#category-${escapeHtml(category.id)}" data-category-id="${escapeHtml(category.id)}" aria-label="${escapeHtml(category.title)} 보기">
        <span class="project-card__mockup">
          <img src="${escapeHtml(category.thumbnail)}" alt="${escapeHtml(category.title)} 썸네일" />
        </span>
        <span class="project-card__content">
          <span class="project-card__meta">
            <strong>${escapeHtml(category.title)}</strong>
            <em>${escapeHtml(category.label)}</em>
          </span>
          <span class="project-card__desc">${escapeHtml(category.description)}</span>
          <span class="project-card__cta">${escapeHtml(category.cta)} <span aria-hidden="true">→</span></span>
        </span>
      </a>
    </li>
  `).join('');
}

function getCategory(id) {
  return portfolioCategories.find((item) => item.id === id) || portfolioCategories[0];
}

function getProjects(categoryId) {
  return portfolioProjects[categoryId] || [];
}

function makeButtons(buttons = []) {
  if (!buttons.length) return '';
  return `<div class="work-actions">${buttons.map((button) => `
    <a class="work-action" href="${escapeHtml(button.url || '#')}" target="${button.url && button.url !== '#' ? '_blank' : '_self'}" rel="noreferrer">
      ${escapeHtml(button.text)}
    </a>
  `).join('')}</div>`;
}

function makeMeta(project) {
  return `
    <dl class="work-meta">
      <div><dt>Category</dt><dd>${escapeHtml(project.subtitle || project.category || '')}</dd></div>
      <div><dt>Tool</dt><dd>${escapeHtml(project.tool || '')}</dd></div>
      <div><dt>Contribution</dt><dd>${escapeHtml(project.contribution || '')}</dd></div>
    </dl>
  `;
}

function openCategory(categoryId, projectId, options = {}) {
  const category = getCategory(categoryId);
  const projects = getProjects(category.id);
  if (!category || !projects.length || !detailMount || !detailSection) return;

  activeCategoryId = category.id;
  activeProjectId = projectId || projects[0].id;

  document.body.classList.add('is-detail-view');
  detailSection.classList.add('is-active');
  renderDetail(category.id, activeProjectId);

  if (options.updateHash !== false) {
    history.pushState({ categoryId: category.id, projectId: activeProjectId }, '', `#category-${category.id}`);
  }

  window.scrollTo({ top: 0, behavior: options.instant ? 'auto' : 'smooth' });
  updatePageState();
}

function exitDetail(targetId = 'projects', options = {}) {
  activeCategoryId = null;
  activeProjectId = null;
  document.body.classList.remove('is-detail-view');
  if (detailSection) detailSection.classList.remove('is-active');

  if (options.updateHash !== false) {
    history.pushState({}, '', `#${targetId}`);
  }

  window.setTimeout(() => {
    const target = document.getElementById(targetId) || document.getElementById('page');
    smoothScrollTo(target);
    updatePageState();
  }, 30);
}

function renderDetail(categoryId, projectId) {
  const category = getCategory(categoryId);
  const projects = getProjects(categoryId);
  const selected = projects.find((item) => item.id === projectId) || projects[0];
  activeProjectId = selected.id;

  if (category.viewer === 'ux') renderUxViewer(category, projects, selected);
  if (category.viewer === 'publishing') renderPublishingViewer(category, projects, selected);
  if (category.viewer === 'design') renderDesignViewer(category, projects, selected);
}

function renderUxViewer(category, projects, selected) {
  detailMount.innerHTML = `
    <article class="work-viewer work-viewer--ux" data-category="${escapeHtml(category.id)}">
      <aside class="work-list" aria-label="UX/UI 프로젝트 목록">
        <p class="work-list__eyebrow">${escapeHtml(category.title)}</p>
        ${projects.map((project) => `
          <button class="work-list__item ${project.id === selected.id ? 'is-active' : ''}" type="button" data-project-id="${escapeHtml(project.id)}">
            <img src="${escapeHtml(project.thumbnail)}" alt="" />
            <span><strong>${escapeHtml(project.title)}</strong><em>${escapeHtml(project.subtitle)}</em></span>
          </button>
        `).join('')}
      </aside>
      <div class="ux-panel">
        <div class="ux-panel__top">
          <p class="project-detail__eyebrow">PROJECT DETAIL</p>
          <h2>${escapeHtml(selected.title)}</h2>
          <p>${escapeHtml(selected.description)}</p>
          ${makeMeta(selected)}
          ${makeButtons(selected.buttons)}
        </div>
        <div class="process-viewer">
          <img src="${escapeHtml(selected.processImage || selected.hero)}" alt="${escapeHtml(selected.title)} 프로세스 이미지" />
        </div>
      </div>
    </article>
  `;
  bindProjectSwitch('uxui');
}

function renderPublishingViewer(category, projects, selected) {
  detailMount.innerHTML = `
    <article class="work-viewer work-viewer--publishing" data-category="${escapeHtml(category.id)}">
      <div class="publishing-preview">
        <img src="${escapeHtml(selected.hero)}" alt="${escapeHtml(selected.title)} 결과물 미리보기" />
      </div>
      <div class="publishing-info">
        <p class="project-detail__eyebrow">${escapeHtml(category.title)}</p>
        <h2>${escapeHtml(selected.title)}</h2>
        <p>${escapeHtml(selected.description)}</p>
        ${makeMeta(selected)}
        ${makeButtons(selected.buttons)}
      </div>
    </article>
  `;
}

function renderDesignViewer(category, projects, selected) {
  detailMount.innerHTML = `
    <article class="work-viewer work-viewer--design" data-category="${escapeHtml(category.id)}">
      <div class="design-main">
        <div class="design-main__image">
          <img src="${escapeHtml(selected.hero)}" alt="${escapeHtml(selected.title)} 결과물 이미지" />
        </div>
        <div class="design-main__info">
          <p class="project-detail__eyebrow">${escapeHtml(category.title)}</p>
          <h2>${escapeHtml(selected.title)}</h2>
          <p>${escapeHtml(selected.description)}</p>
          ${makeMeta(selected)}
          ${makeButtons(selected.buttons)}
        </div>
        ${selected.processImage ? `
          <details class="design-process">
            <summary>View Process</summary>
            <img src="${escapeHtml(selected.processImage)}" alt="${escapeHtml(selected.title)} 디자인 프로세스 이미지" />
          </details>
        ` : ''}
      </div>
      <aside class="design-gallery" aria-label="Design Works 썸네일 갤러리">
        ${projects.map((project) => `
          <button class="design-thumb ${project.id === selected.id ? 'is-active' : ''}" type="button" data-project-id="${escapeHtml(project.id)}">
            <img src="${escapeHtml(project.thumbnail)}" alt="${escapeHtml(project.title)} 썸네일" />
            <span><strong>${escapeHtml(project.title)}</strong><em>${escapeHtml(project.subtitle)}</em></span>
          </button>
        `).join('')}
      </aside>
    </article>
  `;
  bindProjectSwitch('designworks');
}

function bindProjectSwitch(categoryId) {
  detailMount.querySelectorAll('[data-project-id]').forEach((button) => {
    button.addEventListener('click', () => {
      const projectId = button.dataset.projectId;
      renderDetail(categoryId, projectId);
    });
  });
}

function initProjectSlider() {
  const gallery = document.querySelector('.gallery');
  const cards = Array.from(document.querySelectorAll('.cards li'));
  const nextButton = document.querySelector('.next');
  const prevButton = document.querySelector('.prev');
  if (!gallery || !cards.length) return;

  let activeStep = 0;
  let isAnimating = false;
  const maxStep = cards.length - 1;
  const totalCards = cards.length;
  const canUseGsap = Boolean(window.gsap && typeof window.gsap.to === 'function');

  function setCardState(card, values, immediate = false) {
    const { xPercent, opacity, scale, zIndex } = values;

    if (canUseGsap) {
      gsap.to(card, {
        xPercent,
        opacity,
        scale,
        zIndex,
        duration: immediate ? 0 : 0.65,
        ease: 'expo.out',
        overwrite: true
      });
      return;
    }

    card.style.transition = immediate
      ? 'none'
      : 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1)';
    card.style.transform = `translateX(${xPercent}%) scale(${scale})`;
    card.style.opacity = opacity;
    card.style.zIndex = zIndex;
  }

  function getLoopDistance(index, activeIndex) {
    let distance = index - activeIndex;
    if (distance > totalCards / 2) distance -= totalCards;
    if (distance < -totalCards / 2) distance += totalCards;
    return distance;
  }

  function renderSlider(activeIndex, immediate = false) {
    cards.forEach((card, index) => {
      const distance = getLoopDistance(index, activeIndex);
      const absDistance = Math.abs(distance);

      card.classList.toggle('is-active', absDistance === 0);
      card.classList.toggle('is-preview', absDistance === 1);

      let opacity = 0;
      let scale = 0.58;
      if (absDistance === 0) { opacity = 1; scale = 1; }
      else if (absDistance === 1) { opacity = 0.56; scale = 0.76; }
      else if (absDistance === 2) { opacity = 0.12; scale = 0.62; }

      setCardState(card, {
        xPercent: distance * 112,
        opacity,
        scale,
        zIndex: Math.round(100 - absDistance * 10)
      }, immediate);
    });
  }

  function goToStep(step) {
    let targetStep = step;
    if (targetStep > maxStep) targetStep = 0;
    if (targetStep < 0) targetStep = maxStep;
    if (isAnimating && targetStep !== activeStep) return;

    activeStep = targetStep;
    isAnimating = true;
    gallery.classList.add('is-sliding');
    renderSlider(activeStep);
    window.setTimeout(() => {
      isAnimating = false;
      gallery.classList.remove('is-sliding');
    }, 650);
  }

  renderSlider(activeStep, true);

  let wheelLock = false;
  gallery.addEventListener('wheel', (event) => {
    event.preventDefault();
    if (wheelLock) return;
    wheelLock = true;
    const isNext = event.deltaY > 0 || event.deltaX > 0;
    goToStep(activeStep + (isNext ? 1 : -1));
    window.setTimeout(() => { wheelLock = false; }, 650);
  }, { passive: false });

  nextButton?.addEventListener('click', () => goToStep(activeStep + 1));
  prevButton?.addEventListener('click', () => goToStep(activeStep - 1));

  cards.forEach((card, index) => {
    const link = card.querySelector('.project-card');
    if (!link) return;

    link.addEventListener('click', (event) => {
      event.preventDefault();
      if (!card.classList.contains('is-active')) {
        goToStep(index);
        return;
      }
      const categoryId = link.dataset.categoryId;
      if (canUseGsap) {
        gsap.to(card, {
          scale: 1.08,
          duration: 0.32,
          ease: 'power3.out',
          yoyo: true,
          repeat: 1,
          onComplete: () => openCategory(categoryId)
        });
      } else {
        openCategory(categoryId);
      }
    });
  });
}

function smoothScrollTo(target) {
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top, behavior: 'smooth' });
}

function updateHeroMessage() {
  if (!hero || messages.length === 0) return;
  const heroTop = hero.offsetTop;
  const scrollRange = hero.offsetHeight - window.innerHeight;
  const scrolled = window.scrollY - heroTop;
  const progress = Math.min(Math.max(scrolled / scrollRange, 0), 1);
  const activeIndex = Math.min(messages.length - 1, Math.floor(progress * messages.length));
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
    header.classList.remove('is-changing');
  }, 220);
}

function updateHeaderText() {
  if (!project) return;
  const projectTop = project.getBoundingClientRect().top;
  const detailVisible = document.body.classList.contains('is-detail-view');
  const isProjectVisible = projectTop <= window.innerHeight * 0.35 || detailVisible;
  setHeaderMode(isProjectVisible ? 'project' : 'hero');
}

function updatePageState() {
  updateHeroMessage();
  updateHeaderText();
}

function handleInitialRoute() {
  const hash = window.location.hash.replace('#', '');
  if (hash.startsWith('category-')) {
    const categoryId = hash.replace('category-', '');
    if (getCategory(categoryId)) openCategory(categoryId, null, { instant: true, updateHash: false });
  }
}

function bindNavigation() {
  document.addEventListener('click', (event) => {
    const back = event.target.closest('.detail-back');
    if (back) {
      event.preventDefault();
      exitDetail('projects');
      return;
    }

    const home = event.target.closest('.hero__home');
    if (home && document.body.classList.contains('is-detail-view')) {
      event.preventDefault();
      exitDetail('page');
    }
  });

  window.addEventListener('popstate', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash.startsWith('category-')) {
      openCategory(hash.replace('category-', ''), null, { instant: true, updateHash: false });
    } else {
      document.body.classList.remove('is-detail-view');
      if (detailSection) detailSection.classList.remove('is-active');
      updatePageState();
    }
  });
}

renderCategoryCards();
initProjectSlider();
bindNavigation();
handleInitialRoute();
updatePageState();
window.addEventListener('scroll', updatePageState, { passive: true });
window.addEventListener('resize', updatePageState);

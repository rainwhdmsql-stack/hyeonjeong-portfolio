const hero = document.querySelector('.hero');
const project = document.querySelector('.project');
const messages = document.querySelectorAll('.hero__message');
const header = document.querySelector('.hero__header');
const headerBrand = document.querySelector('.hero__brand');
const headerCategory = document.querySelector('.hero__category');

const projectData = [
  { id: 'process-app-design', title: 'APP DESIGN', image: 'asset/image/project/app_design.png' },
  { id: 'process-bisang-clonecoding', title: 'BISANG', image: 'asset/image/project/bisang_clonecoding.png' },
  { id: 'process-branding-design', title: 'BRANDING', image: 'asset/image/project/branding_design.png' },
  { id: 'process-cafe24-design', title: 'CAFE24', image: 'asset/image/project/cafe24_design.png' },
  { id: 'process-chimack-design', title: 'CHIMAC', image: 'asset/image/project/chimack_design.png' },
  { id: 'process-detailpage-design', title: 'DETAIL PAGE', image: 'asset/image/project/detailpage_design.png' },
  { id: 'process-roomlit-brandsite', title: 'ROOMLIT', image: 'asset/image/project/roomlit_brandsite.png' },
  { id: 'process-sns-design', title: 'SNS DESIGN', image: 'asset/image/project/sns_design.jpg' },
  { id: 'process-teamproject', title: 'TEAM PROJECT', image: 'asset/image/project/teamproject.png' }
];


let activeDetailId = null;

function getDetailSections() {
  return Array.from(document.querySelectorAll('.project-detail'));
}

function enterDetail(detailId, options = {}) {
  const target = document.getElementById(detailId);
  if (!target) return;

  activeDetailId = detailId;
  document.body.classList.add('is-detail-view');

  getDetailSections().forEach((section) => {
    const isActive = section.id === detailId;
    section.classList.toggle('is-active', isActive);
  });

  if (options.updateHash !== false) {
    history.pushState({ detailId }, '', `#${detailId}`);
  }

  window.scrollTo({ top: 0, behavior: options.instant ? 'auto' : 'smooth' });
  updatePageState();
}

function exitDetail(targetId = 'projects', options = {}) {
  activeDetailId = null;
  document.body.classList.remove('is-detail-view');
  getDetailSections().forEach((section) => section.classList.remove('is-active'));

  const target = document.getElementById(targetId) || document.getElementById('page');

  if (options.updateHash !== false) {
    history.pushState({}, '', targetId === 'page' ? '#page' : `#${targetId}`);
  }

  window.setTimeout(() => {
    if (targetId === 'page') {
      window.scrollTo({ top: 0, behavior: options.instant ? 'auto' : 'smooth' });
    } else {
      smoothScrollTo(target);
    }
    updatePageState();
  }, 30);
}

function handleInitialRoute() {
  const hash = window.location.hash.replace('#', '');
  if (hash && document.getElementById(hash)?.classList.contains('project-detail')) {
    enterDetail(hash, { instant: true, updateHash: false });
  }
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

let currentHeaderMode = 'hero';

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

function initProjectSlider() {
  if (!window.gsap) return;

  const gallery = document.querySelector('.gallery');
  const cards = gsap.utils.toArray('.cards li');
  const nextButton = document.querySelector('.next');
  const prevButton = document.querySelector('.prev');

  if (!gallery || !cards.length) return;

  let activeStep = 0;
  let isAnimating = false;
  const maxStep = cards.length - 1;
  const totalCards = cards.length;

  gsap.set(cards, {
    opacity: 0,
    scale: 0.68,
    xPercent: 0,
    zIndex: 0,
    transformOrigin: '50% 50%'
  });

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

      if (absDistance === 0) {
        opacity = 1;
        scale = 1;
      } else if (absDistance === 1) {
        opacity = 0.56;
        scale = 0.76;
      } else if (absDistance === 2) {
        opacity = 0.12;
        scale = 0.62;
      }

      gsap.to(card, {
        xPercent: distance * 112,
        opacity,
        scale,
        zIndex: Math.round(100 - absDistance * 10),
        duration: immediate ? 0 : 0.65,
        ease: 'expo.out',
        overwrite: true
      });
    });
  }

  function goToStep(step) {
    let targetStep = step;
    if (targetStep > maxStep) targetStep = 0;
    if (targetStep < 0) targetStep = maxStep;
    if (isAnimating && targetStep === activeStep) return;

    activeStep = targetStep;
    isAnimating = true;
    gallery.classList.add('is-sliding');
    renderSlider(activeStep);

    window.setTimeout(() => {
      isAnimating = false;
      gallery.classList.remove('is-sliding');
    }, 520);
  }

  function goNextSlide() { goToStep(activeStep + 1); }
  function goPrevSlide() { goToStep(activeStep - 1); }

  renderSlider(activeStep, true);

  let wheelLock = false;

  gallery.addEventListener('wheel', (event) => {
    event.preventDefault();
    if (wheelLock) return;

    wheelLock = true;
    const isNext = event.deltaY > 0 || event.deltaX > 0;
    isNext ? goNextSlide() : goPrevSlide();

    window.setTimeout(() => {
      wheelLock = false;
    }, 650);
  }, { passive: false });

  gallery.addEventListener('mousedown', () => gallery.classList.add('is-sliding'));
  window.addEventListener('mouseup', () => gallery.classList.remove('is-sliding'));

  cards.forEach((card) => {
    const link = card.querySelector('.project-card');
    if (!link) return;

    link.addEventListener('click', (event) => {
      event.preventDefault();
      if (!card.classList.contains('is-active')) {
        goToStep(cards.indexOf(card));
        return;
      }

      const target = document.querySelector(link.getAttribute('href'));
      gsap.to(card, {
        scale: 1.08,
        duration: 0.32,
        ease: 'power3.out',
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          if (target && target.classList.contains('project-detail')) {
            enterDetail(target.id);
          } else {
            smoothScrollTo(target);
          }
        }
      });
    });
  });

  if (nextButton) nextButton.addEventListener('click', goNextSlide);
  if (prevButton) prevButton.addEventListener('click', goPrevSlide);
}

function initMoreProjects() {
  const containers = document.querySelectorAll('.more-projects__list');
  containers.forEach((container) => {
    const currentSection = container.closest('.project-detail');
    const currentId = currentSection ? currentSection.id : '';

    const html = projectData
      .filter((item) => item.id !== currentId)
      .slice(0, 4)
      .map((item) => `
        <a class="more-project-card" href="#${item.id}" aria-label="${item.title} 프로젝트 상세 보기">
          <img src="${item.image}" alt="${item.title} 썸네일" />
          <span>${item.title}<b aria-hidden="true">→</b></span>
        </a>
      `)
      .join('');

    container.innerHTML = html;
  });

  document.querySelectorAll('.more-project-card, .detail-home, .detail-back, .hero__home').forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();

      if (target.classList.contains('project-detail')) {
        enterDetail(target.id);
        return;
      }

      if (link.classList.contains('detail-back')) {
        exitDetail('projects');
        return;
      }

      if (link.classList.contains('detail-home') || link.classList.contains('hero__home')) {
        exitDetail('page');
        return;
      }

      smoothScrollTo(target);
    });
  });
}

function updatePageState() {
  updateHeroMessage();
  updateHeaderText();
}

window.addEventListener('scroll', updatePageState, { passive: true });
window.addEventListener('resize', updatePageState);
window.addEventListener('popstate', () => {
  const hash = window.location.hash.replace('#', '');
  if (hash && document.getElementById(hash)?.classList.contains('project-detail')) {
    enterDetail(hash, { instant: true, updateHash: false });
  } else {
    exitDetail(hash || 'page', { instant: true, updateHash: false });
  }
});

window.addEventListener('load', () => {
  updatePageState();
  initProjectSlider();
  initMoreProjects();
  handleInitialRoute();
});

updatePageState();

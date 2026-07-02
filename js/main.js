const hero = document.querySelector('.hero');
const project = document.querySelector('.project');
const messages = document.querySelectorAll('.hero__message');
const header = document.querySelector('.hero__header');
const headerBrand = document.querySelector('.hero__brand');
const headerCategory = document.querySelector('.hero__category');

function updateHeroMessage() {
  if (!hero || messages.length === 0) return;

  const heroTop = hero.offsetTop;
  const scrollRange = hero.offsetHeight - window.innerHeight;
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
  const isProjectVisible = projectTop <= window.innerHeight * 0.35;
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

      let opacity = 0;
      let scale = 0.58;

      if (absDistance === 0) {
        opacity = 1;
        scale = 1;
      } else if (absDistance === 1) {
        opacity = 0.48;
        scale = 0.82;
      } else if (absDistance === 2) {
        opacity = 0.16;
        scale = 0.68;
      }

      gsap.to(card, {
        xPercent: distance * 118,
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

  function goNextSlide() {
    goToStep(activeStep + 1);
  }

  function goPrevSlide() {
    goToStep(activeStep - 1);
  }

  renderSlider(activeStep, true);

  let wheelLock = false;

  gallery.addEventListener('wheel', (event) => {
    event.preventDefault();

    if (wheelLock) return;

    wheelLock = true;
    const isNext = event.deltaY > 0 || event.deltaX > 0;

    if (isNext) {
      goNextSlide();
    } else {
      goPrevSlide();
    }

    window.setTimeout(() => {
      wheelLock = false;
    }, 650);
  }, { passive: false });

  gallery.addEventListener('mousedown', () => {
    gallery.classList.add('is-sliding');
  });

  window.addEventListener('mouseup', () => {
    gallery.classList.remove('is-sliding');
  });

  if (nextButton) {
    nextButton.addEventListener('click', goNextSlide);
  }

  if (prevButton) {
    prevButton.addEventListener('click', goPrevSlide);
  }
}

function updatePageState() {
  updateHeroMessage();
  updateHeaderText();
}

window.addEventListener('scroll', updatePageState, { passive: true });
window.addEventListener('resize', updatePageState);
window.addEventListener('load', () => {
  updatePageState();
  initProjectSlider();
});

updatePageState();

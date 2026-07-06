/* =========================================================
   Projects category slider
   - 메인 Projects 섹션의 카테고리 슬라이드 이동을 담당합니다.
   ========================================================= */
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


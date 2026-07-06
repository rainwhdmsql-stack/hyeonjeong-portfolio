/* =========================================================
   Header / section state
   - 스크롤 위치에 따라 상단 헤더 문구와 Hero 메시지를 갱신합니다.
   ========================================================= */
function smoothScrollTo(target) {
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top, behavior: 'smooth' });
}

// Hero 스크롤 진행도에 맞춰 인트로 메시지를 전환합니다.
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

// 현재 섹션 모드에 맞춰 헤더 텍스트를 교체합니다.
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

// 스크롤 위치를 기준으로 hero/project/about/contact 상태를 판단합니다.
// v1.3: 각 섹션의 실제 화면 위치(getBoundingClientRect)를 기준으로 계산해
// About 진입 시 header에 ABOUT 텍스트가 안정적으로 반영되도록 보정했습니다.
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
  updateHeroMessage();
  updateHeaderText();
}


/* =========================================================
   App entry point
   - 각 기능 모듈을 순서대로 초기화합니다.
   ========================================================= */
renderCategoryCards();
initProjectSlider();
bindNavigation();
handleInitialRoute();
updatePageState();
window.addEventListener('scroll', updatePageState, { passive: true });
window.addEventListener('resize', updatePageState);


// About 섹션 인터랙션 초기화
initAboutPuzzle();
initToolStickers();

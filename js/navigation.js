/* =========================================================
   Navigation / routing
   - 상세 화면 진입·복귀, URL hash, 브라우저 뒤로가기를 처리합니다.
   ========================================================= */
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


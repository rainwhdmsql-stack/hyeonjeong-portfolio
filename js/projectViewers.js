/* =========================================================
   Projects data rendering / category detail viewers
   - 카테고리 카드, UX/UI·Publishing·Design Works 상세 뷰어를 생성합니다.
   ========================================================= */
// Projects 메인 슬라이더에 카테고리 카드를 렌더링합니다.
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

// 카테고리 클릭 시 상세 뷰어로 진입합니다.
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

// 상세 뷰어에서 메인 흐름으로 돌아갑니다.
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

// 카테고리 타입에 따라 알맞은 상세 뷰어를 선택합니다.
function renderDetail(categoryId, projectId) {
  const category = getCategory(categoryId);
  const projects = getProjects(categoryId);
  const selected = projects.find((item) => item.id === projectId) || projects[0];
  activeProjectId = selected.id;

  if (category.viewer === 'ux') renderUxViewer(category, projects, selected);
  if (category.viewer === 'publishing') renderPublishingViewer(category, projects, selected);
  if (category.viewer === 'design') renderDesignViewer(category, projects, selected);
}

// UX/UI Design: 좌측 목록 + 우측 프로세스 이미지 뷰어를 렌더링합니다.
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

// Web Publishing: 결과물 중심 미리보기 뷰어를 렌더링합니다.
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

// Design Works: 결과물 중심 뷰어와 우측 썸네일 갤러리를 렌더링합니다.
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


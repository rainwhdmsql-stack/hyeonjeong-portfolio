/* =========================================================
   Core DOM references / shared state
   - 전체 스크립트에서 공통으로 사용하는 DOM과 상태값입니다.
   ========================================================= */
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


/* =========================================================
   About: draggable tool stickers
   - asset/tool-sticker 이미지를 About 영역 안에서 드래그할 수 있게 합니다.
   ========================================================= */
function initToolStickers() {
  const playground = document.querySelector('#aboutPlayground');
  const stickers = Array.from(document.querySelectorAll('.tool-sticker'));
  if (!playground || !stickers.length) return;

  stickers.forEach((sticker) => {
    sticker.addEventListener('dragstart', (event) => event.preventDefault());

    // Pointer Events로 마우스/터치 드래그를 함께 처리합니다.
    sticker.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      sticker.setPointerCapture(event.pointerId);
      sticker.classList.add('is-dragging');

      const areaRect = playground.getBoundingClientRect();
      const stickerRect = sticker.getBoundingClientRect();
      const shiftX = event.clientX - stickerRect.left;
      const shiftY = event.clientY - stickerRect.top;

      function move(clientX, clientY) {
        const maxX = areaRect.width - stickerRect.width;
        const maxY = areaRect.height - stickerRect.height;
        const nextX = Math.min(Math.max(clientX - areaRect.left - shiftX, 0), maxX);
        const nextY = Math.min(Math.max(clientY - areaRect.top - shiftY, 0), maxY);
        sticker.style.left = `${nextX}px`;
        sticker.style.top = `${nextY}px`;
        sticker.style.right = 'auto';
        sticker.style.transform = 'rotate(var(--sticker-rotate, 0deg))';
      }

      function handleMove(moveEvent) {
        move(moveEvent.clientX, moveEvent.clientY);
      }

      function handleUp(upEvent) {
        sticker.classList.remove('is-dragging');
        sticker.releasePointerCapture(upEvent.pointerId);
        sticker.removeEventListener('pointermove', handleMove);
        sticker.removeEventListener('pointerup', handleUp);
        sticker.removeEventListener('pointercancel', handleUp);
      }

      sticker.addEventListener('pointermove', handleMove);
      sticker.addEventListener('pointerup', handleUp);
      sticker.addEventListener('pointercancel', handleUp);
    });
  });
}


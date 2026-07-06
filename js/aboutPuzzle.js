/* =========================================================
   About: Piece by Piece sliding puzzle
   - 1st click: 정보 조각이 클릭한 퍼즐 조각 자리에서 인접 빈칸으로 슬라이드됩니다.
   - 2nd click: 정보 조각이 다시 클릭한 퍼즐 조각 자리로 돌아가며 닫힙니다.
   - 3rd click: 퍼즐 조각 자체가 직전 정보 조각이 있던 빈칸으로 이동합니다.
   - 이동 우선순위는 우 → 좌 → 상 → 하입니다.
   ========================================================= */
function initAboutPuzzle() {
  const board = document.querySelector('#puzzleBoard');
  const description = document.querySelector('#puzzleDescription');
  if (!board || !description) return;

  const pieces = Array.from(board.querySelectorAll('.puzzle-piece'));
  const descTitle = description.querySelector('.puzzle-description__title');
  const descText = description.querySelector('.puzzle-description__text');

  /* About puzzle data: 각 오브젝트에 연결되는 작업 방식 설명 */
  const pieceContent = {
    why: {
      title: 'Why?',
      text: '겉으로 보이는 현상보다, 문제의 원인을 먼저 찾습니다.'
    },
    simplify: {
      title: 'Simplify',
      text: '복잡할수록 단순하게 정리하려고 합니다.'
    },
    perspective: {
      title: 'Perspective',
      text: '사용자의 입장에서 한 번 더 생각합니다.'
    },
    handsOn: {
      title: 'Hands-on',
      text: '직접 만들어보며 디자인을 다시 확인합니다.'
    },
    refine: {
      title: 'Refine',
      text: '한 번으로 끝내지 않고 계속 다듬습니다.'
    },
    details: {
      title: 'Details',
      text: '작은 차이가 경험의 완성도를 만든다고 생각합니다.'
    }
  };

  /* Puzzle piece position: 3x3 보드에서 현재 퍼즐 조각의 위치 */
  const positions = {
    why: 0,
    simplify: 1,
    perspective: 2,
    handsOn: 3,
    refine: 5,
    details: 7
  };

  let openPieceId = null;
  let descriptionPosition = null;
  let descriptionSourcePosition = null;
  let pendingMovePieceId = null;
  let pendingMovePosition = null;
  let pendingMoveDirection = null;
  let isClosing = false;

  function getRow(position) { return Math.floor(position / 3); }
  function getCol(position) { return position % 3; }

  function positionToTransform(position) {
    const row = getRow(position);
    const col = getCol(position);
    const gap = parseFloat(window.getComputedStyle(board).columnGap) || 8;
    return `translate(calc(${col} * (100% + ${gap}px)), calc(${row} * (100% + ${gap}px)))`;
  }

  function getOccupiedPositions() {
    return new Set(Object.values(positions));
  }

  function getAdjacentPosition(position, direction) {
    const row = getRow(position);
    const col = getCol(position);
    if (direction === 'right' && col < 2) return position + 1;
    if (direction === 'left' && col > 0) return position - 1;
    if (direction === 'up' && row > 0) return position - 3;
    if (direction === 'down' && row < 2) return position + 3;
    return null;
  }

  /* Description target: 선택한 조각 주변의 빈칸을 우 → 좌 → 상 → 하 순서로 찾습니다. */
  function findDescriptionTarget(pieceId) {
    const current = positions[pieceId];
    const occupied = getOccupiedPositions();
    const priority = ['right', 'left', 'up', 'down'];

    for (const direction of priority) {
      const target = getAdjacentPosition(current, direction);
      if (target !== null && !occupied.has(target)) {
        return { position: target, direction };
      }
    }

    return null;
  }

  function clearPuzzleLinkClasses() {
    description.classList.remove('is-link-right', 'is-link-left', 'is-link-up', 'is-link-down', 'is-entering', 'is-returning');
    pieces.forEach((piece) => {
      piece.classList.remove('is-linked-right', 'is-linked-left', 'is-linked-up', 'is-linked-down');
    });
  }

  function clearPendingMove() {
    pendingMovePieceId = null;
    pendingMovePosition = null;
    pendingMoveDirection = null;
  }

  function applyPiecePositions() {
    pieces.forEach((piece) => {
      const id = piece.dataset.pieceId;
      piece.style.transform = positionToTransform(positions[id]);
      piece.classList.toggle('is-active', id === openPieceId || id === pendingMovePieceId);
      piece.classList.toggle('is-muted', openPieceId !== null && id !== openPieceId);
    });
  }

  function lockPieceFeedback(piece) {
    piece.classList.remove('is-locked');
    void piece.offsetWidth;
    piece.classList.add('is-locked');
  }

  function hideDescriptionImmediately() {
    description.hidden = true;
    descriptionPosition = null;
    descriptionSourcePosition = null;
    openPieceId = null;
    isClosing = false;
    clearPuzzleLinkClasses();
    pieces.forEach((piece) => piece.classList.remove('is-active', 'is-muted'));
    applyPiecePositions();
  }

  /* Description close: 정보 조각이 열린 빈칸에서 클릭한 퍼즐 자리로 다시 슬라이드되어 닫힙니다. */
  function closeDescription() {
    if (!openPieceId || descriptionPosition === null || descriptionSourcePosition === null) return;

    isClosing = true;
    pendingMovePieceId = openPieceId;
    pendingMovePosition = descriptionPosition;
    pendingMoveDirection = pendingMoveDirection || null;

    description.classList.add('is-returning');
    description.style.transform = positionToTransform(descriptionSourcePosition);

    window.setTimeout(() => {
      description.hidden = true;
      descriptionPosition = null;
      descriptionSourcePosition = null;
      openPieceId = null;
      isClosing = false;
      clearPuzzleLinkClasses();
      pieces.forEach((piece) => piece.classList.remove('is-active', 'is-muted'));
      applyPiecePositions();
    }, 420);
  }

  /* Puzzle move: 닫힌 직후 같은 퍼즐을 한 번 더 누르면, 퍼즐 조각이 직전 정보 조각의 빈칸으로 이동합니다. */
  function movePendingPiece(pieceId) {
    const piece = pieces.find((item) => item.dataset.pieceId === pieceId);
    if (!piece) return;

    if (pendingMovePieceId !== pieceId || pendingMovePosition === null) {
      return false;
    }

    const occupied = getOccupiedPositions();
    if (occupied.has(pendingMovePosition)) {
      clearPendingMove();
      lockPieceFeedback(piece);
      return true;
    }

    positions[pieceId] = pendingMovePosition;
    clearPendingMove();
    applyPiecePositions();
    return true;
  }

  /* Description open: 정보 조각은 선택한 조각 위치에서 시작해 인접한 빈칸으로 슬라이드됩니다. */
  function openDescription(pieceId) {
    const piece = pieces.find((item) => item.dataset.pieceId === pieceId);
    if (!piece || isClosing) return;

    // 열린 상태에서 같은 퍼즐을 누르면 정보 조각만 다시 제자리로 접습니다.
    if (openPieceId === pieceId) {
      closeDescription();
      return;
    }

    // 접힌 직후 같은 퍼즐을 다시 누르면 퍼즐 조각 자체가 직전 빈칸으로 이동합니다.
    if (openPieceId === null && pendingMovePieceId === pieceId && pendingMovePosition !== null) {
      movePendingPiece(pieceId);
      return;
    }

    // 다른 퍼즐을 누르면 이전 대기 이동 상태는 취소하고 새 정보 조각을 엽니다.
    clearPendingMove();

    if (openPieceId !== null) {
      hideDescriptionImmediately();
    }

    const currentPosition = positions[pieceId];
    const target = findDescriptionTarget(pieceId);

    if (target === null) {
      lockPieceFeedback(piece);
      return;
    }

    openPieceId = pieceId;
    descriptionSourcePosition = currentPosition;
    descriptionPosition = target.position;
    pendingMoveDirection = target.direction;

    const content = pieceContent[pieceId] || { title: '', text: '' };
    descTitle.textContent = content.title;
    descText.textContent = content.text;

    description.classList.toggle('puzzle-description--yellow', !piece.classList.contains('puzzle-piece--yellow'));
    description.classList.toggle('puzzle-description--pink', piece.classList.contains('puzzle-piece--yellow'));
    description.classList.add(`is-link-${target.direction}`, 'is-entering');
    piece.classList.add(`is-linked-${target.direction}`);

    // 선택한 조각 자리에서 정보 조각이 시작되도록 한 프레임 먼저 배치합니다.
    description.style.transform = positionToTransform(currentPosition);
    description.hidden = false;
    applyPiecePositions();

    window.requestAnimationFrame(() => {
      description.style.transform = positionToTransform(descriptionPosition);
      window.setTimeout(() => description.classList.remove('is-entering'), 420);
    });
  }

  pieces.forEach((piece) => {
    piece.addEventListener('click', () => openDescription(piece.dataset.pieceId));
  });

  window.addEventListener('resize', () => {
    applyPiecePositions();
    if (descriptionPosition !== null) {
      description.style.transform = positionToTransform(descriptionPosition);
    }
  });

  applyPiecePositions();
}

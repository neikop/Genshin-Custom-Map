window.addEventListener('load', () => {
  const YOU_TOUCH = document.getElementById('you-touch');
  const REACT_MAP = document.getElementById('react-map');

  let SCALE = 0.5;
  const SPEED = 1.08;

  let active = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;
  let xOffset = 0;
  let yOffset = 0;

  const setPosition = (xPos, yPos) => {
    REACT_MAP.style.left = xPos + 'px';
    REACT_MAP.style.top = yPos + 'px';
    currentX = xPos;
    currentY = yPos;
    xOffset = currentX;
    yOffset = currentY;
  };

  const onTouchStart = (event) => {
    if (event.type === 'touchstart') {
      initialX = event.touches[0].clientX - xOffset;
      initialY = event.touches[0].clientY - yOffset;
    } else {
      initialX = event.clientX - xOffset;
      initialY = event.clientY - yOffset;
    }

    if (event.target === YOU_TOUCH) {
      active = true;
    }
  };

  const onTouchEnd = (event) => {
    initialX = currentX;
    initialY = currentY;
    active = false;
  };

  const onTouchMove = (event) => {
    if (active) {
      event.preventDefault();
      if (event.type === 'touchmove') {
        currentX = event.touches[0].clientX - initialX;
        currentY = event.touches[0].clientY - currentY;
      } else {
        currentX = event.clientX - initialX;
        currentY = event.clientY - initialY;
      }
      setPosition(currentX, currentY);
    }
  };

  YOU_TOUCH.addEventListener('touchstart', onTouchStart, false);
  YOU_TOUCH.addEventListener('touchend', onTouchEnd, false);
  YOU_TOUCH.addEventListener('touchmove', onTouchMove, false);

  YOU_TOUCH.addEventListener('mousedown', onTouchStart, false);
  YOU_TOUCH.addEventListener('mouseup', onTouchEnd, false);
  YOU_TOUCH.addEventListener('mousemove', onTouchMove, false);

  const squares = document.getElementsByClassName('box-square');
  const icons = document.getElementsByClassName('box-icon');

  const initScreen = () => {
    const size = Math.sqrt(squares.length);
    const long = size * 256 * SCALE;
    setPosition((window.innerWidth - long) / 2, (window.innerHeight - long) / 2);

    REACT_MAP.style.opacity = 1;
  };
  initScreen();

  // SCROLL WHEELING
  const onWheel = (event) => {
    const PREV = SCALE;
    const { left: X, top: Y } = REACT_MAP.style;
    const { clientX, clientY } = event;
    if (event.deltaY < 0) {
      SCALE *= SPEED;
      if (SCALE > 1) SCALE = 1;
      setPosition(Num(X) - (clientX - Num(X)) * (SCALE / PREV - 1), Num(Y) - (clientY - Num(Y)) * (SCALE / PREV - 1));
    } else if (event.deltaY > 0) {
      SCALE /= SPEED;
      if (SCALE < 0.2) SCALE = 0.2;
      setPosition(Num(X) + (clientX - Num(X)) * (1 - SCALE / PREV), Num(Y) + (clientY - Num(Y)) * (1 - SCALE / PREV));
    }
    window.SCALE = SCALE;

    REACT_MAP.style.transform = `scale(${SCALE})`;
    for (let i = 0; i < icons.length; i++) {
      if (1 / SCALE < 2) icons[i].style.transform = `scale(${1 / SCALE})`;
    }
  };

  window.addEventListener('wheel', onWheel, false);
});

const Num = (pixel) => Number(pixel.substr(0, pixel.length - 2));

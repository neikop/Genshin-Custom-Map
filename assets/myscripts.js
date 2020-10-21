const ICON_TYPE = {
  TELEPORT: 'https://genshin-impact-map.appsample.com/images/marker-teleport.png',
};

window.addEventListener('load', () => {
  const OVER = document.getElementById('pointer');
  const CONTAINER = document.getElementById('container');
  const ICONS = document.getElementById('icons');

  const setPosition = (xPos, yPos) => {
    CONTAINER.style.left = xPos + 'px';
    CONTAINER.style.top = yPos + 'px';
    currentX = xPos;
    currentY = yPos;
    xOffset = currentX;
    yOffset = currentY;
    console.log({ xPos, yPos });
  };

  let active = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;
  let xOffset = 0;
  let yOffset = 0;

  const onTouchStart = (event) => {
    if (event.type === 'touchstart') {
      initialX = event.touches[0].clientX - xOffset;
      initialY = event.touches[0].clientY - yOffset;
    } else {
      initialX = event.clientX - xOffset;
      initialY = event.clientY - yOffset;
    }

    if (event.target === OVER) {
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
        currentY = event.touches[0].clientY - initialY;
      } else {
        currentX = event.clientX - initialX;
        currentY = event.clientY - initialY;
      }

      setPosition(currentX, currentY);
    }
  };

  OVER.addEventListener('touchstart', onTouchStart, false);
  OVER.addEventListener('touchend', onTouchEnd, false);
  OVER.addEventListener('touchmove', onTouchMove, false);

  OVER.addEventListener('mousedown', onTouchStart, false);
  OVER.addEventListener('mouseup', onTouchEnd, false);
  OVER.addEventListener('mousemove', onTouchMove, false);

  let SCALE = 0.5;
  const SPEED = 1.08;

  const squares = document.getElementsByClassName('box-square');
  const icons = document.getElementsByClassName('icon');

  const initScreen = () => {
    const size = Math.sqrt(squares.length);
    const long = size * 256 * SCALE;
    setPosition((window.innerWidth - long) / 2, (window.innerHeight - long) / 2);

    CONTAINER.style.opacity = 1;
  };
  initScreen();

  // SCROLL WHEELING
  const onWheel = (event) => {
    const PREV = SCALE;
    const { left: X, top: Y } = CONTAINER.style;
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
    console.log({ SCALE });

    CONTAINER.style.transform = `scale(${SCALE})`;
    for (let i = 0; i < icons.length; i++) {
      if (1 / SCALE < 2) icons[i].style.transform = `scale(${1 / SCALE})`;
    }
  };

  window.addEventListener('wheel', onWheel, false);

  // MOUSE CLICK
  OVER.addEventListener(
    'click',
    (event) => {
      const { clientX, clientY } = event;
      const boxIcon = document.createElement('div');
      boxIcon.className = 'box-icon';
      boxIcon.style.left = (clientX - currentX) / SCALE + 'px';
      boxIcon.style.top = (clientY - currentY) / SCALE + 'px';
      ICONS.appendChild(boxIcon);
      const imgIcon = document.createElement('img');
      imgIcon.className = 'icon';
      imgIcon.alt = '';
      imgIcon.src = ICON_TYPE['TELEPORT'];
      boxIcon.appendChild(imgIcon);
    },
    false,
  );
});

const Num = (pixel) => Number(pixel.substr(0, pixel.length - 2));

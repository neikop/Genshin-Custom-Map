const fs = require('fs');
const { ICON_TYPE, ICONS } = require('./data');

const MAP = {
  12: [2038, 2041],
  13: [4077, 4082],
  14: [8154, 8165],
  15: [16308, 16331],
  16: [32616, 32663],
  17: [65232, 65327],
};

const imgSrc = (size, x, y) => {
  const [min, max] = MAP[size];
  return `https://cdn.mapgenie.io/images/tiles/genshin-impact/teyvat/default-v2/${size}/${min + x}/${min + y}.png`;
};

const generate = (size) => {
  const [min, max] = MAP[size];
  console.log({ size, min, max });

  let squares = ``;
  for (let y = 0; y <= max - min; y++) {
    for (let x = 0; x <= max - min; x++) {
      const square = `
        <div class="box-square" style="left: ${x * 256}px; top: ${y * 256}px">
          <img class="image" alt="" src="${imgSrc(size, x, y)}" />
        </div>`;
      squares += `${square}`;
    }
  }

  let icons = '';
  for (let i = 0; i < size * 10; i++) {
    const yRng = Math.floor((Math.random() + 0.5) * (max - min + 1) * 128);
    const xRng = Math.floor((Math.random() + 0.5) * (max - min + 1) * 128);
    ICONS.push({ x: xRng, y: yRng, type: 'TELEPORT' });
  }
  ICONS.forEach(({ x, y, type }) => {
    const url = ICON_TYPE[type];
    const icon = `
        <div class="box-icon" style="left: ${x}px; top: ${y}px">
          <img class="icon" alt="" src="${ICON_TYPE[type]}" />
        </div>`;
    icons += icon;
  });

  let content = fs.readFileSync('./template.html', { encoding: 'utf-8' });
  content = content.replace('_ICONS_', icons);
  content = content.replace('_SQUARES_', squares);
  fs.writeFileSync(`./index${size}.html`, content);
};

generate(17);

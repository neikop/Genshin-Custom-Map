const fs = require('fs');

const stream = fs.readFileSync(__dirname + '/icons.html', 'utf-8');

const exporter = `left: ([0-9]+)px; top: ([0-9]+)px; z-index: [0-9]+;" title="([\\w ]+)"`;

const icons = [];
stream.match(new RegExp(exporter, 'g')).forEach((item) => {
  const [, x, y, type] = new RegExp(exporter, 'g').exec(item);
  icons.push({ left: Number(x), top: Number(y), type });
});

fs.writeFileSync(__dirname + '/icons.json', JSON.stringify(icons));

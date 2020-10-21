import React from 'react';
import { MAP_SIZE } from 'constants/map';

const MapSquares = ({ size }) => {
  const [min, max] = MAP_SIZE[size];
  const length = max - min + 1;
  const outsource = `https://cdn.mapgenie.io/images/tiles/genshin-impact/teyvat/default-v2`;

  return Array.from({ length }).reduce(
    (cols, _, y) =>
      cols.concat(
        Array.from({ length }).reduce(
          (rows, _, x) =>
            rows.concat(
              <div key={`${x}_${y}`} className='box-square' style={{ left: x * 256, top: y * 256 }}>
                <img alt='' className='item-square' src={`${outsource}/${size}/${min + x}/${min + y}.png`} />
              </div>,
            ),
          [],
        ),
      ),
    [],
  );
};

export default MapSquares;

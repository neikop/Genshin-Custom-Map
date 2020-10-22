import React from 'react';
import { MAP_SIZE_SAMPLE } from 'constants/map';

const outsource = `https://genshin-impact.b-cdn.net`;

const MapSquares = ({ size = 7 }) => {
  const [min, max] = MAP_SIZE_SAMPLE[size];
  const length = max - min + 1;

  return Array.from({ length }).reduce(
    (cols, _, y) =>
      cols.concat(
        Array.from({ length }).reduce(
          (rows, _, x) =>
            rows.concat(
              <div key={`${x}_${y}`} className='box-square' style={{ left: x * 256, top: y * 256 }}>
                <img alt='' className='item-square' src={`${outsource}/jpg-v1/${size}/tile-${min + x}_${max - y}.jpg`} />
              </div>,
            ),
          [],
        ),
      ),
    [],
  );
};

export default MapSquares;

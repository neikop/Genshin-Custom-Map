import React from 'react';
import { MAP_ICONS } from 'constants/map';

const ICON_TYPE = {
  StatueOf7: 'marker-god',
  Teleporter: 'marker-teleport',
  Shrine: 'marker-shrine',
  CrystalChunk: 'marker-727',
  WhiteIronChunk: 'marker-726',
};

const MapIcons = () => {
  return MAP_ICONS.reduce((icons, { left, top, type }, index) => {
    const name = type.split(' ').join('');
    return icons.concat(
      <div key={index} className={`box-icon ${name}`} style={{ left, top }} title={type}>
        <img alt='' className={`item-icon ${name}`} src={`/assets/icons/${ICON_TYPE[name]}.png`} />
      </div>,
    );
  }, []);
};

export default MapIcons;

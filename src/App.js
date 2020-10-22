import React from 'react';
import MapIcons from 'components/MapIcons';
import MapSquares from 'components/MapSquares';

const App = () => {
  React.useEffect(() => {
    //
    return () => {
      //
    };
  }, []);

  return (
    <>
      <div id='you-touch'></div>
      <div id='react-map'>
        <div id='icons'>
          <MapIcons />
        </div>
        <div id='squares'>
          <MapSquares />
        </div>
      </div>
    </>
  );
};

export default App;

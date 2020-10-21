import React from 'react';
import MapSquares from 'components/MapSquares';

const App = ({ size = 15, initScale = 0.5 }) => {
  React.useEffect(() => {
    //
    return () => {
      //
    };
  }, []);

  return (
    <>
      <div id='you-touch'></div>
      <div id='react-map' style={{ transform: `scale(${initScale})` }}>
        <div id='icons'></div>
        <div id='squares'>
          <MapSquares size={size} />
        </div>
      </div>
    </>
  );
};

export default App;

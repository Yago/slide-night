import React, { useState } from 'react';
import Projector from 'Projector';
import SlideTray from 'SlideTray';

const App = () => {
  const [slides, setSlides] = useState<string[]>([]);

  return (
    <>
      {slides.length > 0 && <Projector slides={slides} />}
      {slides.length === 0 && <SlideTray onChange={setSlides} />}
    </>
  );
};

export default App;

/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';

import './SlideTray.css';

type Props = {
  onChange: (slides: string[]) => void;
};

const SlideTray = ({ onChange }: Props): JSX.Element => {
  const [slides, setSlides] = useState<FileList | null>(null);

  useEffect(
    () =>
      onChange(Array.from(slides ?? []).map(file => URL.createObjectURL(file))),
    [slides, onChange]
  );

  return (
    <div className="slide-tray">
      <label htmlFor="slides">
        Load your slides
        <br />
        <span>↓</span>
        <img
          src="/images/np_carousel-slide-projector_1123953_000000.svg"
          alt="slide projector icon"
        />
        <i>
          *your photographs will not leave your browser, there is no upload to a
          server
        </i>
      </label>
      <input
        id="slides"
        type="file"
        name="slides"
        accept="image/png, image/jpeg, image/webp, image/avif, image/tiff"
        multiple
        onChange={e => setSlides(e.target.files)}
      />
    </div>
  );
};

export default SlideTray;

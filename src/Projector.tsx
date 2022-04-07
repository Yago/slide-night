/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useKey } from 'rooks';

import './Projector.css';

const inSound = new Audio('/sounds/in.mp3');
const outSound = new Audio('/sounds/out.mp3');

type Props = {
  slides: string[];
};

const Projector = ({ slides }: Props): JSX.Element => {
  const [index, setIndex] = useState(0);
  const [muted, setMuted] = useState(true);

  const increment = () =>
    setIndex(i => (i < slides.length ? i + 1 : slides.length));
  const decrement = () => setIndex(i => (i > 0 ? i - 1 : 0));

  useKey(['f'], () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  });
  useKey(['m'], () => setMuted(i => !i));
  useKey([37], decrement);
  useKey([39], increment);

  useEffect(() => {
    if (!muted) {
      outSound.play();
      setTimeout(() => {
        inSound.play();
      }, 470);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <div className="projector" onClick={increment}>
      {['/images/intro.jpg', ...slides].map((slide, i) => (
        <motion.div
          key={`slide-${slide}`}
          variants={{
            hidden: {
              x: '-100%',
              transition: {
                duration: 0.47, // out.mp3
                type: 'tween',
                ease: 'easeIn',
              },
            },
            visible: {
              x: 0,
              transition: {
                delay: 0.47,
                duration: 0.3, // in.mp3
                type: 'tween',
                ease: 'easeIn',
              },
            },
          }}
          initial="hidden"
          animate={i === index ? 'visible' : 'hidden'}
          className="slide"
        >
          <div className="slide-image">
            <img src={slide} alt="nice landscape" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Projector;

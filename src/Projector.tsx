/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useInterval, useKey } from 'rooks';

import './Projector.css';

const inSound = new Audio('/sounds/in.mp3');
const outSound = new Audio('/sounds/out.mp3');

type Props = {
  slides: string[];
};

const Projector = ({ slides }: Props): JSX.Element => {
  const [index, setIndex] = useState(0);
  const [muted, setMuted] = useState(false);
  const [auto, setAuto] = useState(false);

  const increment = () => setIndex(i => (i < slides.length ? i + 1 : 0));
  const decrement = () => setIndex(i => (i > 0 ? i - 1 : 0));

  const { start, stop } = useInterval(() => {
    increment();
  }, 4000) as unknown as { start: () => void; stop: () => void };

  const toggleAuto = () => {
    if (auto) {
      stop();
    } else {
      start();
    }
    setAuto(i => !i);
  };

  useKey(['f'], () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  });
  useKey(['m'], () => setMuted(i => !i));
  useKey(['a'], toggleAuto);
  useKey([37], decrement);
  useKey([39], increment);
  useKey([32], toggleAuto);

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
      <AnimatePresence>
        {auto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="projector-progress"
              animate={{
                width: 0,
              }}
              transition={{
                duration: 4,
                repeatType: 'loop',
                repeat: Infinity,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {['./images/intro.jpg', ...slides].map((slide, i) => (
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

import { useCallback, useEffect, useRef } from 'react';

/* eslint-disable import/prefer-default-export */
// Je créer un hook qui va me permettre de jouer un son
export const useSound = (sound: string) => {
  // Je vais créer une reference qui contiendra un élément audio HTML
  const audioElm = useRef<HTMLAudioElement | null>(null);

  const playSound = useCallback(() => {
    if (audioElm.current) {
      audioElm.current.currentTime = 0;
      audioElm.current.play();
    }
  }, []);

  // Lorsque j'utilise mon hook, je vais charger le son
  useEffect(() => {
    audioElm.current = new Audio(sound);
  }, [sound]);

  return playSound;
};

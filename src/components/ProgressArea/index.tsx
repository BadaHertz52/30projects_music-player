import React, {
  forwardRef,
  useRef,
  useState,
  useImperativeHandle,
  useCallback,
  MouseEvent,
  SyntheticEvent,
} from "react";
import styles from "./style.module.scss";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { MusicPlayerState } from "../../store/types";
import {
  nextMusic,
  playMusic,
  stopMusic,
} from "../../store/musicPlayerReducer";

export type AudioPlayerHandle = {
  play: () => void;
  pause: () => void;
  changeVolume: (number: number) => void;
  resetDuration: () => void;
};

const ProgressArea = forwardRef<AudioPlayerHandle>((_, ref) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { playList, currentIndex, repeat } = useSelector(
    (state: MusicPlayerState) => state,
    shallowEqual
  );
  const [currentTime, setCurrentTime] = useState<string>("00:00");
  const [duration, setDuration] = useState<string>("00:00");
  useImperativeHandle(
    ref,
    () => ({
      play: async () => {
        return new Promise((resolve, reject) => {
          audioRef.current?.play();
          resolve();
        });
      },
      pause: () => {
        audioRef.current?.pause();
      },
      changeVolume: (volume: number) => {
        if (audioRef.current?.volume) audioRef.current.volume = volume;
      },
      resetDuration: () => {
        if (audioRef.current?.currentTime) audioRef.current.currentTime = 0;
      },
    }),
    []
  );
  const onPlay = useCallback(() => {
    dispatch(playMusic());
  }, [dispatch]);
  /**
   * 시간은 "mm:ss" 형식으로 변경
   */
  const getTime = useCallback((time: number) => {
    const minutes = `${~~(time / 60)}`;
    const seconds = `${~~(time % 60)}`;
    return `${minutes.length >= 2 ? minutes : 0 + minutes}:${
      seconds.length >= 2 ? seconds : 0 + seconds
    }`;
  }, []);
  const onClickProgress = useCallback((event: MouseEvent<HTMLElement>) => {
    const progressAreaWidth = event.currentTarget.clientWidth;
    const { offsetX } = event.nativeEvent;

    if (audioRef.current) {
      const duration = audioRef.current.duration;
      audioRef.current.currentTime = (offsetX / progressAreaWidth) * duration;
    }
  }, []);

  const onTimeUpdate = useCallback(
    (event: SyntheticEvent<HTMLAudioElement>) => {
      const target = event.target as HTMLAudioElement;
      if (target.readyState === 0) return;

      const { currentTime, duration } = target;
      // progressBar 의 width는 progressArea의 %
      const progressBarWidth = (currentTime / duration) * 100;
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${progressBarWidth}%`;
      }
      setCurrentTime(getTime(currentTime));
      setDuration(getTime(duration));
    },
    [getTime]
  );
  const onPause = useCallback(() => {
    dispatch(stopMusic());
  }, [dispatch]);

  const onEnded = useCallback(() => {
    if (repeat === "ONE" && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      dispatch(nextMusic());
    }
  }, [repeat, dispatch]);
  return (
    <div className={styles.progressArea} onClick={onClickProgress}>
      <div className={styles.progressBar} ref={progressBarRef}>
        <audio
          ref={audioRef}
          autoPlay
          onPlay={onPlay}
          onPause={onPause}
          onEnded={onEnded}
          onTimeUpdate={onTimeUpdate}
          src={playList[currentIndex].src}
        ></audio>
      </div>
      <div className={styles.musicTimer}>
        <span aria-description="current time">{currentTime}</span>
        <span aria-description="duration">{duration}</span>
      </div>
    </div>
  );
});

export default ProgressArea;

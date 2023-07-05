import React, {
  forwardRef,
  useRef,
  useState,
  useImperativeHandle,
  useCallback,
  MouseEvent,
  SyntheticEvent,
  memo,
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
  const { playList, repeat, currentIndex } = useSelector(
    (state: MusicPlayerState) => ({
      playList: state.playList,
      repeat: state.repeat,
      currentIndex: state.currentIndex,
    }),
    shallowEqual
  );
  // currentTime, duration의 value 는 audio event target을 통해서 가져옴
  const [currentTime, setCurrentTime] = useState<string>("00:00");
  const [duration, setDuration] = useState<string>("00:00");
  // ref로 지정한 element에 대해 부모 노드가 다룰 수 있는 event 지정
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
  /**
   *  유저가 progress를 클릭해 변경시킬때, 변경된 progress 위치에 맞추어  오디오의 currentTime을 변경함
   */
  const onClickProgress = useCallback((event: MouseEvent<HTMLElement>) => {
    const progressAreaWidth = event.currentTarget.clientWidth;
    const { offsetX } = event.nativeEvent;

    if (audioRef.current) {
      const targetDuration = audioRef.current.duration;
      audioRef.current.currentTime =
        (offsetX / progressAreaWidth) * targetDuration;
    }
  }, []);
  /**
   * audio의 timeUpdate 이벤트가 발생했을 경우(ex: 다른 노래로 변경되거나 progress 이동),  변경된 시간에 맞추어 progress bar의 너비, currentTime 상태와 duration 상태를 변경함
   */
  const onTimeUpdate = useCallback(
    (event: SyntheticEvent<HTMLAudioElement>) => {
      const target = event.target as HTMLAudioElement;
      if (target.readyState === 0) return;
      // progressBar 의 width는 progressArea의 %
      const progressBarWidth = (target.currentTime / target.duration) * 100;
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${progressBarWidth}%`;
      }
      setCurrentTime(getTime(target.currentTime));
      setDuration(getTime(target.duration));
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
        <span aria-description="audio current time">{currentTime}</span>
        <span aria-description="audio duration">{duration}</span>
      </div>
    </div>
  );
});

export default memo(ProgressArea);

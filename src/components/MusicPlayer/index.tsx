import { useCallback, useState, useRef, memo } from "react";
import { AudioPlayerHandle } from "../ProgressArea";
import { Controls, PlayList, ProgressArea, SongDetail } from "../index";
import styles from "./style.module.scss";

const MusicPlayer = () => {
  const audioRef = useRef<AudioPlayerHandle>(null);
  const [showPlayList, setShowPlayList] = useState<boolean>(false);
  const onPlay = useCallback(() => {
    audioRef.current?.play();
  }, []);
  const onPause = useCallback(() => {
    audioRef.current?.pause();
  }, []);
  const changeVolume = useCallback((v: number) => {
    audioRef.current?.changeVolume(v);
  }, []);
  const resetDuration = useCallback(() => {
    audioRef.current?.resetDuration();
  }, []);

  return (
    <div className={styles.musicPlayer}>
      <div className={styles.container}>
        <SongDetail />
        <ProgressArea ref={audioRef} />
        <Controls
          setShowPlayList={setShowPlayList}
          play={onPlay}
          pause={onPause}
          changeVolume={changeVolume}
          resetDuration={resetDuration}
        />
        <PlayList
          showPlayList={showPlayList}
          setShowPlayList={setShowPlayList}
        />
      </div>
    </div>
  );
};

export default memo(MusicPlayer);

import React, { useCallback, useState, useRef } from "react";
import SongDetail from "./components/SongDetail";
import Controls from "./components/Controls";
import ProgressArea from "./components/ProgressArea";
import styles from "./App.module.scss";
import PlayList from "./components/PlayList";
const App = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showPlayList, setShowPlayList] = useState<boolean>(false);
  const onPlay = useCallback(() => {
    audioRef.current?.play();
  }, []);
  const onPause = useCallback(() => {
    audioRef.current?.pause();
  }, []);
  const changeVolume = useCallback((v: number) => {
    if (audioRef.current) audioRef.current.volume = v;
  }, []);
  return (
    <div className="App">
      <div className={styles.container}>
        <SongDetail />
        <ProgressArea ref={audioRef} />
        <Controls
          setShowPlayList={setShowPlayList}
          play={onPlay}
          pause={onPause}
          changeVolume={changeVolume}
        />
        <PlayList
          showPlayList={showPlayList}
          setShowPlayList={setShowPlayList}
        />
      </div>
    </div>
  );
};

export default App;

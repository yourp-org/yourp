import React, { useEffect, useState } from "react";
import "./App.css";

let main: HTMLVideoElement | null = null;

const App = () => {
  const [masterRef, setMasterRef] = useState<HTMLDivElement | null>(null);
  const [other1Ref, setOther1Ref] = useState<HTMLDivElement | null>(null);
  const [other2Ref, setOther2Ref] = useState<HTMLDivElement | null>(null);
  const [other3Ref, setOther3Ref] = useState<HTMLDivElement | null>(null);

  const url1 =
    "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_30MB.mp4";
  const url2 =
    "https://test-videos.co.uk/vids/jellyfish/mp4/h264/360/Jellyfish_360_10s_30MB.mp4";
  const url3 =
    "https://test-videos.co.uk/vids/sintel/mp4/av1/360/Sintel_360_10s_10MB.mp4";
  const url4 =
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4";

  const createStuff = (ref: HTMLElement | null, url: string, index: number) => {
    if (!ref) return;
    const video = ref.appendChild(document.createElement("video"));
    video.setAttribute("autoplay", "");
    video.setAttribute("loop", "");
    video.setAttribute("mute", "");
    video.setAttribute("controls", "");
    const source = video.appendChild(document.createElement("source"));
    source.setAttribute("src", url);
    source.setAttribute("type", "video/mp4");
    video.onclick = (e) => {
      e.preventDefault();
      handleClick(video);
    };
  };

  const handleClick = (video: HTMLVideoElement) => {
    if (main === video) return;
    main = video;

    const masterVideo = masterRef?.firstElementChild as HTMLVideoElement;

    video.parentElement?.appendChild(masterVideo);
    masterRef?.appendChild(video);

    masterVideo.play();
    masterVideo.muted = true;
    video.play();
    video.muted = true;
  };

  useEffect(() => {
    createStuff(masterRef, url1, 0);
  }, [masterRef]);

  useEffect(() => {
    createStuff(other1Ref, url2, 1);
  }, [other1Ref]);

  useEffect(() => {
    createStuff(other2Ref, url3, 1);
  }, [other2Ref]);

  useEffect(() => {
    createStuff(other3Ref, url4, 1);
  }, [other3Ref]);

  return (
    <>
      <div className="App">
        <div className="the-grid">
          <div className="main" ref={setMasterRef}></div>
          <div className="others">
            <div className="other1" ref={setOther1Ref}></div>
            <div className="other2" ref={setOther2Ref}></div>
            <div className="other3" ref={setOther3Ref}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

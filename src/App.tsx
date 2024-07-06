import React, { useEffect, useRef, useState } from "react";
import "./App.css";

import jelly from "./jelly.mp4";
import manifest from "./manifest.m3u8";

import videojs from "video.js";
import "video.js/dist/video-js.css";

let main: HTMLElement | null = null;

export const VideoJS = (props: any) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const { options, onReady } = props;

  React.useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      (videoRef.current as any).appendChild(videoElement);

      const player = ((playerRef.current as any) = videojs(
        videoElement,
        options,
        () => {
          videojs.log("player is ready");
          onReady && onReady(player);
        }
      ));

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current as any;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current as any;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player style={{ width: "80%" }}>
      <div ref={videoRef} />
    </div>
  );
};

const handleClick = (ref: HTMLElement) => {
  if (!main) return;

  if (main === ref) return;

  main.className = "other";
  ref.className = "main";
  main = ref;
};

const addVideo = (ref: HTMLElement | null, url: string, index: number) => {
  if (!ref || ref.childElementCount !== 0) return;

  const video = ref.appendChild(document.createElement("video"));
  video.setAttribute("loop", "");
  video.setAttribute("mute", "");
  video.setAttribute("autoplay", "");
  video.setAttribute("controls", "");

  video.onclick = (e) => {
    e.preventDefault();
    handleClick(ref);
  };

  // video.onloadedmetadata = () => {
  //   console.log(url, video.videoWidth, video.videoHeight);
  // };

  const source = video.appendChild(document.createElement("source"));
  source.setAttribute("src", url);
  source.setAttribute("type", url.endsWith("mp4") ? "video/mp4" : "video/mp2t");
};

// const url1 =
//   "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_30MB.mp4";
const url1 =
  "https://ev.phncdn.com/videos/202406/27/454396371/480P_2000K_454396371.mp4?validfrom=1720038024&validto=1720045224&rate=500k&burst=1400k&ip=90.92.24.119&ipa=90.92.24.119&hash=6%2BnAUJEZxB%2BOdGiSkzDaCEp%2BjAs%3D";
const url2 =
  "https://ev.phncdn.com/videos/202406/07/453488691/480P_2000K_453488691.mp4?validfrom=1720038406&validto=1720045606&rate=500k&burst=1400k&ip=90.92.24.119&ipa=90.92.24.119&hash=65ne9M%2BmfORGuTo8TIG9RXzQR5s%3D";
const url3 =
  "https://test-videos.co.uk/vids/sintel/mp4/av1/360/Sintel_360_10s_10MB.mp4";
const url4 =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4";

const App = () => {
  const [mainRef, setMainRef] = useState<HTMLDivElement | null>(null);
  const [other1Ref, setOther1Ref] = useState<HTMLDivElement | null>(null);
  const [other2Ref, setOther2Ref] = useState<HTMLDivElement | null>(null);
  const [other3Ref, setOther3Ref] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mainRef) return;
    addVideo(mainRef, url1, 0);
    mainRef.className = "main";
    main = mainRef;
  }, [mainRef]);

  useEffect(() => {
    if (!other1Ref) return;
    addVideo(other1Ref, url2, 1);
    other1Ref.className = "other";
  }, [other1Ref]);

  useEffect(() => {
    if (!other2Ref) return;
    addVideo(other2Ref, url3, 1);
    other2Ref.className = "other";
  }, [other2Ref]);

  useEffect(() => {
    if (!other3Ref) return;
    addVideo(other3Ref, url4, 1);
    other3Ref.className = "other";
  }, [other3Ref]);

  return (
    <>
      <div className="App">
        <div className="the-grid">
          <iframe
            allowFullScreen
            title="test1"
            src="https://www.pornhub.com/embed/f4cc0ad3819a36752467?autoplay=1&muted=1"
            className="main"
          ></iframe>
          <iframe
            allowFullScreen
            title="test2"
            src="https://www.pornhub.com/embed/3eee609d05b90c14222f?autoplay=1&muted=1"
            className="other"
          ></iframe>
          <iframe
            allowFullScreen
            title="test3"
            src="https://www.pornhub.com/embed/e5e9f6611e2ee05a31ce?autoplay=1&muted=1"
            className="other"
          ></iframe>
          <iframe
            allowFullScreen
            title="test4"
            src="https://www.pornhub.com/embed/f8e13f14b405e038deb6?autoplay=1&muted=1"
            className="other"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default App;

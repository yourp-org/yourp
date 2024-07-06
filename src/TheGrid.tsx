import React from "react";
import "./TheGrid.css";

// let main: HTMLElement | null = null;

// const handleClick = (ref: HTMLElement) => {
//   if (!main) return;

//   if (main === ref) return;

//   main.className = "other";
//   ref.className = "main";
//   main = ref;
// };

// const addVideo = (ref: HTMLElement | null, url: string, index: number) => {
//   if (!ref || ref.childElementCount !== 0) return;

//   const video = ref.appendChild(document.createElement("video"));
//   video.setAttribute("loop", "");
//   video.setAttribute("mute", "");
//   video.setAttribute("autoplay", "");
//   video.setAttribute("controls", "");

//   video.onclick = (e) => {
//     e.preventDefault();
//     handleClick(ref);
//   };

//   // video.onloadedmetadata = () => {
//   //   console.log(url, video.videoWidth, video.videoHeight);
//   // };

//   const source = video.appendChild(document.createElement("source"));
//   source.setAttribute("src", url);
//   source.setAttribute("type", url.endsWith("mp4") ? "video/mp4" : "video/mp2t");
// };

export const TheGrid = ({
  id1,
  id2,
  id3,
  id4,
}: {
  id1: string;
  id2: string;
  id3: string;
  id4: string;
}) => {
  return (
    <div className="the-grid">
      <iframe
        allowFullScreen
        title="test1"
        src={`https://www.pornhub.com/embed/${id1}?autoplay=1&muted=1`}
        className="main"
      ></iframe>
      <iframe
        allowFullScreen
        title="test2"
        src={`https://www.pornhub.com/embed/${id2}?autoplay=1&muted=1`}
        className="other"
      ></iframe>
      <iframe
        allowFullScreen
        title="test3"
        src={`https://www.pornhub.com/embed/${id3}?autoplay=1&muted=1`}
        className="other"
      ></iframe>
      <iframe
        allowFullScreen
        title="test4"
        src={`https://www.pornhub.com/embed/${id4}?autoplay=1&muted=1`}
        className="other"
      ></iframe>
    </div>
  );
};

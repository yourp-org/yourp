import React, { useEffect, useState } from "react";
import "./App.css";
import { createPortal } from "react-dom";

const Video = ({ props }: { props: { url: string; callback: () => void } }) => {
  return (
    <video muted autoPlay onClick={props.callback}>
      <source src={props.url} type="video/mp4" />
    </video>
  );
};

const App = () => {
  const [refMaster, setRefMaster] = useState<HTMLDivElement | null>(null);
  const [refOther1, setRefOther1] = useState<HTMLDivElement | null>(null);
  const [refOther2, setRefOther2] = useState<HTMLDivElement | null>(null);
  const [refOther3, setRefOther3] = useState<HTMLDivElement | null>(null);

  const [o, setO] = useState({
    master: refMaster,
    other1: refOther1,
    other2: refOther2,
    other3: refOther3,
  });

  const url1 =
    "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_30MB.mp4";
  const url2 =
    "https://test-videos.co.uk/vids/jellyfish/mp4/h264/360/Jellyfish_360_10s_30MB.mp4";
  const url3 =
    "https://test-videos.co.uk/vids/sintel/mp4/av1/360/Sintel_360_10s_10MB.mp4";
  const url4 =
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4";

  useEffect(() => {
    if (!refMaster) return;
    setO({
      master: refMaster,
      other1: refOther1,
      other2: refOther2,
      other3: refOther3,
    });
  }, [refMaster, refOther1, refOther2, refOther3]);

  const handleClick = (index: number) => {
    if (index === 0) return;
    const newO = { ...o };
    console.log(newO);
    if (index === 1) [newO.master, newO.other1] = [newO.other1, newO.master];
    if (index === 2) [newO.master, newO.other2] = [newO.other2, newO.master];
    if (index === 3) [newO.master, newO.other3] = [newO.other3, newO.master];
    setO(newO);
  };

  return (
    <>
      <div className="App">
        <div className="the-grid">
          <div className="main" ref={setRefMaster}></div>

          <div className="others">
            <div ref={setRefOther1}></div>
            <div ref={setRefOther2}></div>
            <div ref={setRefOther3}></div>
          </div>
        </div>

        {o.master &&
          createPortal(
            <Video
              props={{
                url: url1,
                callback: () => handleClick(0),
              }}
            />,
            o.master
          )}
        {o.other1 &&
          createPortal(
            <Video
              props={{
                url: url2,
                callback: () => handleClick(1),
              }}
            />,
            o.other1
          )}
        {o.other2 &&
          createPortal(
            <Video
              props={{
                url: url3,
                callback: () => handleClick(2),
              }}
            />,
            o.other2
          )}
        {o.other3 &&
          createPortal(
            <Video
              props={{
                url: url4,
                callback: () => handleClick(3),
              }}
            />,
            o.other3
          )}
      </div>
    </>
  );
};

export default App;

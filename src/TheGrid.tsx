import React, { useEffect, useRef, useState } from "react";
import "./TheGrid.css";
import { Player } from "player.js";

import IconButton from "@mui/material/IconButton";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";

let main: PlayerElement | null = null;

const handleClick = (player: PlayerElement, players: PlayerElements) => {
  if (!main || !player.ref) return;
  if (!main.ref.parentElement || !player.ref.parentElement) return;
  if (main.ref === player.ref) return;

  main.ref.parentElement.className = "other";
  player.ref.parentElement.className = "main";
  main = player;

  Object.values(players).forEach((player) => player.player.mute());
  main.player.unmute();
};

type PlayerElement = { ready: boolean; player: any; ref: HTMLIFrameElement };

type PlayerElements = {
  [key: string]: PlayerElement;
};

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
  const [ref1, setRef1] = useState<HTMLIFrameElement | null>(null);
  const [ref2, setRef2] = useState<HTMLIFrameElement | null>(null);
  const [ref3, setRef3] = useState<HTMLIFrameElement | null>(null);
  const [ref4, setRef4] = useState<HTMLIFrameElement | null>(null);

  const init = useRef(false);
  const [mainPlayed, setMainPlayed] = useState(false);

  const [players, setPlayers] = useState<PlayerElements>({});

  useEffect(() => {
    main = null;
  }, []);

  useEffect(() => {
    if (!ref1) return;
    const player = new Player(ref1);

    player.on("ready", () => {
      const newPlayer = { ready: true, player, ref: ref1 };
      setPlayers((players) => ({
        ...players,
        [id1]: newPlayer,
      }));
      main = newPlayer;
    });

    player.on("play", () => {
      setMainPlayed(true);
    });
  }, [ref1, id1]);

  useEffect(() => {
    if (!ref2) return;
    const player = new Player(ref2);
    player.on("ready", () => {
      setPlayers((players) => ({
        ...players,
        [id2]: { ready: true, player, ref: ref2 },
      }));
    });
  }, [ref2, id2]);

  useEffect(() => {
    if (!ref3) return;
    const player = new Player(ref3);
    player.on("ready", () => {
      setPlayers((players) => ({
        ...players,
        [id3]: { ready: true, player, ref: ref3 },
      }));
    });
  }, [ref3, id3]);

  useEffect(() => {
    if (!ref4) return;
    const player = new Player(ref4);
    player.on("ready", () => {
      setPlayers((players) => ({
        ...players,
        [id4]: { ready: true, player, ref: ref4 },
      }));
    });
  }, [ref4, id4]);

  useEffect(() => {
    if (init.current || Object.keys(players).length !== 4 || !mainPlayed)
      return;
    init.current = true;

    players[id2].player.play();
    players[id2].player.mute();
    players[id3].player.play();
    players[id3].player.mute();
    players[id4].player.play();
    players[id4].player.mute();
  }, [players, id1, id2, id3, id4, mainPlayed]);

  return (
    <div className="the-grid">
      <div className="main">
        <iframe
          ref={setRef1}
          title="url1"
          src={`https://iframe.mediadelivery.net/embed/266139/${id1}?autoplay=false&preload=true&responsive=true`}
          loading="lazy"
          frameBorder={0}
          allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
        />
        <IconButton
          className="buttonFullScreen"
          onClick={() => handleClick(players[id1], players)}
        >
          <OpenInFullIcon />
        </IconButton>
      </div>

      <div className="other">
        <iframe
          ref={setRef2}
          title="id2"
          src={`https://iframe.mediadelivery.net/embed/266139/${id2}?autoplay=false&preload=true&responsive=true`}
          loading="lazy"
          frameBorder={0}
          allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
        />
        <IconButton
          className="buttonFullScreen"
          onClick={() => handleClick(players[id2], players)}
        >
          <OpenInFullIcon />
        </IconButton>
      </div>

      <div className="other">
        <iframe
          ref={setRef3}
          title="id3"
          src={`https://iframe.mediadelivery.net/embed/266139/${id3}?autoplay=false&preload=true&responsive=true`}
          loading="lazy"
          frameBorder={0}
          allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
        />

        <IconButton
          className="buttonFullScreen"
          onClick={() => handleClick(players[id3], players)}
        >
          <OpenInFullIcon />
        </IconButton>
      </div>

      <div className="other">
        <iframe
          ref={setRef4}
          title="id4"
          src={`https://iframe.mediadelivery.net/embed/266139/${id4}?autoplay=false&preload=true&responsive=true`}
          loading="lazy"
          frameBorder={0}
          allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
        />
        <IconButton
          className="buttonFullScreen"
          onClick={() => handleClick(players[id4], players)}
        >
          <OpenInFullIcon />
        </IconButton>
      </div>
    </div>
  );
};

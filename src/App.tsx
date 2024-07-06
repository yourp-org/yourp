import React, { useState } from "react";
import "./App.css";

import { TheGrid } from "./TheGrid";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";

import data from "./assets/filtered_dump.json";

type Video = {
  id: string;
  title: string;
  pornstar: string;

  tags: string[];
  categories: string[];

  thumbnail_lq: string;
  thumbnail_hq: string;
  thumbnail_nb: number;

  date: string;
  views: number;
  duration_s: number;
  likes: number;
  dislikes: number;
  like_percent: number;
};

const GridItem = ({
  video,
  onClick,
  selected,
}: {
  video: Video;
  onClick: () => void;
  selected: boolean;
}) => {
  const thumbnail = parseInt(
    video.thumbnail_hq.split(")").at(-1)?.split(".jpg")[0] as string
  );

  const thumbnail_url =
    video.thumbnail_hq.split(")").slice(0, -1).join(")") + ")";

  const [index, setIndex] = useState<number | null>(null);
  const [isHover, setIsHover] = useState(false);
  const [intervalId, setIntervalId] = useState(0);

  const startChange = () => {
    setIsHover(true);
    setIntervalId(
      window.setInterval(() => {
        setIndex((index) =>
          index === null ? 1 : index < video.thumbnail_nb - 1 ? index + 1 : 1
        );
      }, 750)
    );
  };

  const endChange = () => {
    setIsHover(false);
    setIndex(null);

    window.clearInterval(intervalId);
    setIntervalId(0);
  };

  return (
    <Grid
      item
      xs={3}
      onMouseEnter={() => startChange()}
      onMouseLeave={() => endChange()}
      onClick={onClick}
      style={{
        opacity: selected ? (isHover ? 0.9 : 1) : isHover ? 0.75 : 0.5,
        transition: "opacity 0.3s",
      }}
    >
      <Paper className="gridItem">
        <img src={`${thumbnail_url}${index ?? thumbnail}.jpg`} alt="" />
      </Paper>
    </Grid>
  );
};

const App = () => {
  const videos = ((data as any).videos as Video[]).slice(-50);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleClick = (id: string) => {
    if (selectedIds.length === 4) return;
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <>
      {selectedIds.length < 4 ? (
        <Container maxWidth="lg">
          <Grid container spacing={2} sx={{ marginTop: 2, marginBottom: 2 }}>
            {videos.map((video) => (
              <GridItem
                key={video.id}
                video={video}
                onClick={() => handleClick(video.id)}
                selected={selectedIds.includes(video.id)}
              />
            ))}
          </Grid>
        </Container>
      ) : (
        <TheGrid
          id1={selectedIds[0]}
          id2={selectedIds[1]}
          id3={selectedIds[2]}
          id4={selectedIds[3]}
        />
      )}
    </>
  );
};

export default App;

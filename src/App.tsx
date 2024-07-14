import React, { Fragment, useEffect, useState } from "react";
import "./App.css";

import { TheGrid } from "./TheGrid";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import database from "./assets/filtered_dump_52.json";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

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
      style={{
        opacity: selected ? (isHover ? 0.9 : 1) : isHover ? 0.75 : 0.5,
        transition: "opacity 0.3s",
      }}
    >
      <Paper
        className="gridItem"
        onMouseEnter={() => startChange()}
        onMouseLeave={() => endChange()}
        onClick={onClick}
        id={video.id}
      >
        <img src={`${thumbnail_url}${index ?? thumbnail}.jpg`} alt="" />
      </Paper>
    </Grid>
  );
};

const App = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [videoToGuid, setVideoToGuid] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/.netlify/functions/videos");
        const data = await response.json();

        const newVideos = (database as any).videos as Video[];
        const newVideoGuid: { [key: string]: string } = {};

        data.data.items.forEach((item: any) => {
          const id = item.title.replace(".mp4", "");
          const video = newVideos.find((video) => video.id === id);
          if (video) newVideoGuid[video.id] = item.guid;
        });

        setVideos(newVideos);
        setVideoToGuid(newVideoGuid);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

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
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        {selectedIds.length < 4 ? (
          <>
            <AppBar position="fixed">
              <Toolbar>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, textAlign: "center" }}
                >
                  {`Selected ${selectedIds.length}/4 videos...`}
                </Typography>
              </Toolbar>
            </AppBar>
            <Container maxWidth="lg">
              <Grid
                container
                spacing={2}
                sx={{ marginTop: 8, marginBottom: 2 }}
              >
                {videos
                  .filter((video) => video.id in videoToGuid)
                  .map((video) => (
                    <Fragment key={video.id}>
                      <GridItem
                        video={video}
                        onClick={() => handleClick(video.id)}
                        selected={selectedIds.includes(video.id)}
                      />
                    </Fragment>
                  ))}
              </Grid>
            </Container>
          </>
        ) : (
          <TheGrid
            id1={videoToGuid[selectedIds[0]]}
            id2={videoToGuid[selectedIds[1]]}
            id3={videoToGuid[selectedIds[2]]}
            id4={videoToGuid[selectedIds[3]]}
          />
        )}
      </ThemeProvider>
    </>
  );
};

export default App;

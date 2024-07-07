/// <reference types="react-scripts" />

declare module "*.mp4" {
  const src: string;
  export default src;
}

declare module "*.m3u8" {
  const src: string;
  export default src;
}

declare module "player.js";

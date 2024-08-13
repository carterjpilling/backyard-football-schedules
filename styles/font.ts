import { Comic_Neue, Anton, Rubik_Mono_One, Playball, Pacifico, Londrina_Outline, Knewave, Londrina_Solid } from "next/font/google";

const comicNeue700 = Comic_Neue({
  weight: "700",
  preload: true,
  subsets: ["latin"],
  // variable: '--font-hubot',
});

const comicNeue400 = Comic_Neue({
  weight: "400",
  preload: true,
  subsets: ["latin"],
});

const comicNeue300 = Comic_Neue({
  weight: "300",
  preload: true,
  subsets: ["latin"],
});

const anton400 = Anton({
  weight: "400",
  preload: true,
  subsets: ["latin"],
  // variable: '--font-anton',
});

const rubikMonoOne400 = Rubik_Mono_One({
  weight: "400",
  preload: true,
  subsets: ["latin"],
  // variable: '--font-rubik-mono-one',
});

const playball400 = Playball({
  weight: "400",
  preload: true,
  subsets: ["latin"],
});

const pacifico400 = Pacifico({
  weight: "400",
  preload: true,
  subsets: ["latin"],
});

const londrinaOutline = Londrina_Outline({
  weight: "400",
  preload: true,
  subsets: ["latin"],
});

const londrinaSolid = Londrina_Solid({
  weight: "400",
  preload: true,
  subsets: ["latin"],
});

const knewwave = Knewave({
  weight: "400",
  preload: true,
  subsets: ["latin"],
});



export { comicNeue700, comicNeue400, comicNeue300, anton400, rubikMonoOne400, playball400, pacifico400, londrinaOutline, knewwave, londrinaSolid };
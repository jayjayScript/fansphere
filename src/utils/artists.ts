// import juiceImg from '../assets/juiceworld.png';
// import novaImg from '../assets/nava.png';
// import leoImg from '../assets/leo.png';
// import zaraImg from '../assets/zara.png';
// import theoImg from '../assets/theo.png';
// import felixImg from '../assets/felix.png';
// import maxxImg from '../assets/maxx.png';
// import irisImg from '../assets/iris.png';
// import lunaImg from '../assets/luna.png';
// import blazeImg from '../assets/blaze.png';
// import serenaImg from '../assets/serena.png';
// import orionImg from '../assets/orion.png';
// import echoImg from '../assets/echo.png';
// import danteImg from '../assets/dante.png';
// import celesteImg from '../assets/celeste.png';
// import kaiImg from '../assets/kai.png';
// import avaImg from '../assets/ava.png';
// import knightImg from '../assets/knight.png';
// import miraImg from '../assets/mira.png';
// import { StaticImageData } from 'next/image';
import axios from 'axios';

interface Artist {
  id: number;
  name: string;
  para1: string;
  para2: string;
  para3: string;
  hitSong: string;
  platforms: {
    spotify: string;
    soundCloud: string;
    youtube: string;
    instagram: string;
    appleMusic: string;
    beatport?: string;
    bandcamp?: string;
    twitter: string;
    deezer?: string;
    audiomack?: string;
    twitch?: string;
  };
  img: string;
  text: string;
}

const fetchArtists = async (): Promise<Artist[]> => {
  try {
    const response = await axios.get('http://localhost:5000/api/artists');
    return response.data;
  } catch (error) {
    console.error('Error fetching artists:', error);
    return [];
  }
};

// Example usage
fetchArtists().then((artists) => {
  console.log('Fetched artists:', artists);
  // You can now use the fetched artists data in your application
});
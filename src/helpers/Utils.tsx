import loctaionIMG from './ImageImport';

export const travelArray = [
  { name: 'Amsterdam', img: loctaionIMG.amsterdamIMG, id: 'bdhdiud988373' },
  { name: 'New-York', img: loctaionIMG.newYorkIMG, id: 'i88383hhj3u383ui' },
  { name: 'Paris', img: loctaionIMG.parisIMG, id: 'hagarq4552627' },
  { name: 'London', img: loctaionIMG.londonIMG, id: '366484943jkejdj' },
  { name: 'Rome', img: loctaionIMG.romeIMG, id: 'kkdkd9e903i848' },
  { name: 'Venice', img: loctaionIMG.veniceIMG, id: 'kmkdikd003938' },
];

export const homeArray = [
  { id: 26262728, img: loctaionIMG.canalIMG },
  { id: 9987799, img: loctaionIMG.canalIMG1 },
  { id: 2627828282, img: loctaionIMG.beachIMG },
  { id: 93938738, img: loctaionIMG.canalIMG1 },
  { id: 8383837337, img: loctaionIMG.canalIMG },
  { id: 737377238728, img: loctaionIMG.beachIMG },
];

export type TravelItemType = ReturnType<() => typeof travelArray[0]>;

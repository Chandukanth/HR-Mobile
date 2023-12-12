// atoms.js
import { atom } from 'recoil';

export const isClosingState = atom({
  key: 'isClosingState',
  default: false,
});
export const sideMenu = atom({
    key: 'sideMenu',
    default: false,
  });

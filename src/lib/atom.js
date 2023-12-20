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
export const CategorySelect = atom({
  key: 'category',
  default: false,
});
export const activeTab = atom({
  key: 'Tab',
  default: 0,
});
export const projectId = atom({
  key: 'project',
  default: 0,
});
export const company = atom({
  key: 'company',
  default: []
})
export const User = atom({
  key: 'loggedinuser',
  default: 0,
});
